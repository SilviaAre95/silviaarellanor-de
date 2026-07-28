import { execFile } from "node:child_process";
import { stat } from "node:fs/promises";

export const REQUIRED_RESUME_URLS = [
  "mailto:silvia.datadev@gmail.com",
  "https://www.silviadata.dev",
  "https://www.linkedin.com/in/silvia-arellano-de",
  "tel:+529871174186",
  "tel:+34603990662",
];

function execFileRun(command, args) {
  return new Promise((resolve, reject) => {
    execFile(command, args, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(`${stdout}${stderr}`);
    });
  });
}

function validationError(variant, message) {
  return new Error(`[${variant.id}] ${message}`);
}

function normalizePdfText(text) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‐‑‒–—―]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function countTextOccurrences(text, searchText) {
  if (!searchText) return 0;

  let count = 0;
  let offset = 0;
  while ((offset = text.indexOf(searchText, offset)) !== -1) {
    count += 1;
    offset += searchText.length;
  }
  return count;
}

function parsePdfUrls(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*\d+\s+\S+\s+(\S+)\s*$/)?.[1])
    .filter(Boolean);
}

async function runValidationCommand(variant, runner, command, args) {
  try {
    return await runner(command, args);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("[")) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    throw validationError(variant, message);
  }
}

export function parsePdfInfo(text) {
  const pages = text.match(/^Pages:\s+(\d+)\s*$/m);
  const pageSize = text.match(/^Page size:\s+([\d.]+)\s+x\s+([\d.]+)\s+pts/m);

  return {
    pages: pages ? Number(pages[1]) : undefined,
    width: pageSize ? Number(pageSize[1]) : undefined,
    height: pageSize ? Number(pageSize[2]) : undefined,
  };
}

export function parseFontRows(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("name") && !/^[-\s]+$/.test(line))
    .map((line) => {
      const [embedded, subset, unicode, object, id] = line.split(/\s+/).slice(-5);
      return {
        embedded: embedded === "yes",
        unicode: unicode === "yes",
        subset: subset === "yes",
        object,
        id,
      };
    });
}

async function assertPdfFile(pdfPath, variant) {
  let details;
  try {
    details = await stat(pdfPath);
  } catch {
    throw validationError(variant, `PDF does not exist: ${pdfPath}`);
  }

  if (!details.isFile()) {
    throw validationError(variant, `PDF is not a file: ${pdfPath}`);
  }

  if (details.size === 0) {
    throw validationError(variant, `PDF is empty: ${pdfPath}`);
  }
}

export async function validateResumePdf({ variant, pdfPath, logText, run }) {
  const runner = run ?? execFileRun;

  if (!run) {
    await assertPdfFile(pdfPath, variant);
  }

  const overfull = logText.match(/Overfull \\[hv]box[^\n]*/);
  if (overfull) {
    throw validationError(variant, overfull[0]);
  }

  const info = parsePdfInfo(await runValidationCommand(variant, runner, "pdfinfo", [pdfPath]));
  if (info.pages !== 2 || info.width !== 612 || info.height !== 792) {
    throw validationError(variant, "PDF must contain two US Letter pages (612 x 792 pts)");
  }

  const fonts = parseFontRows(await runValidationCommand(variant, runner, "pdffonts", [pdfPath]));
  if (fonts.length === 0) {
    throw validationError(variant, "PDF contains no readable font rows");
  }

  if (fonts.some((font) => !font.embedded)) {
    throw validationError(variant, "PDF contains fonts that are not embedded");
  }

  if (fonts.some((font) => !font.unicode)) {
    throw validationError(variant, "PDF contains fonts without Unicode mappings");
  }

  const extractedText = await runValidationCommand(variant, runner, "pdftotext", [pdfPath, "-"]);
  const normalizedExtractedText = normalizePdfText(extractedText);
  const normalizedLines = extractedText
    .split(/\r?\n/)
    .map(normalizePdfText)
    .filter(Boolean);
  const missingText = (variant.requiredText ?? []).find(
    (requiredText) => !normalizedExtractedText.includes(normalizePdfText(requiredText)),
  );
  if (missingText) {
    throw validationError(variant, `PDF is missing required text: ${missingText}`);
  }

  const missingSection = (variant.requiredSections ?? []).find(
    (section) => !normalizedLines.includes(normalizePdfText(section)),
  );
  if (missingSection) {
    throw validationError(variant, `PDF is missing required section label: ${missingSection}`);
  }

  for (const { label, pattern } of variant.forbiddenText ?? []) {
    pattern.lastIndex = 0;
    if (pattern.test(normalizedExtractedText)) {
      throw validationError(variant, `PDF contains forbidden text: ${label}`);
    }
  }

  for (const { text, max } of variant.maxTextOccurrences ?? []) {
    const occurrences = countTextOccurrences(
      normalizedExtractedText,
      normalizePdfText(text),
    );
    if (occurrences > max) {
      throw validationError(
        variant,
        `PDF contains ${text} ${occurrences} times; maximum is ${max}`,
      );
    }
  }

  const urlRecords = parsePdfUrls(
    await runValidationCommand(variant, runner, "pdfinfo", ["-url", pdfPath]),
  );
  const missingUrl = REQUIRED_RESUME_URLS.find((url) => !urlRecords.includes(url));
  if (missingUrl) {
    throw validationError(variant, `PDF is missing required URL: ${missingUrl}`);
  }

  const unexpectedUrl = urlRecords.find((url) => !REQUIRED_RESUME_URLS.includes(url));
  if (unexpectedUrl) {
    throw validationError(variant, `PDF contains unexpected URL: ${unexpectedUrl}`);
  }

  const repeatedUrl = REQUIRED_RESUME_URLS.find(
    (requiredUrl) => urlRecords.filter((url) => url === requiredUrl).length !== 1,
  );
  if (repeatedUrl) {
    throw validationError(
      variant,
      `PDF must contain each required URL exactly once: ${repeatedUrl}`,
    );
  }
}

export async function assertRequiredTools(run = execFileRun) {
  const tectonicVersion = await run("tectonic", ["--version"]);
  if (!/^tectonic 0\.16\.9(?:\s|$)/im.test(tectonicVersion)) {
    throw new Error("Required compiler version is tectonic 0.16.9");
  }

  await Promise.all(
    ["pdfinfo", "pdftotext", "pdffonts"].map((command) => run(command, ["-v"])),
  );
}
