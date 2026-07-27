import { execFile } from "node:child_process";
import { stat } from "node:fs/promises";

const REQUIRED_URLS = [
  "mailto:silvia.datadev@gmail.com",
  "https://www.silviadata.dev",
  "https://linkedin.com/in/silvia-arellano-de",
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
    .filter((line) => line && !line.startsWith("name"))
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

  const info = parsePdfInfo(await runner("pdfinfo", [pdfPath]));
  if (info.pages !== 2 || info.width !== 612 || info.height !== 792) {
    throw validationError(variant, "PDF must contain two US Letter pages (612 x 792 pts)");
  }

  const fonts = parseFontRows(await runner("pdffonts", [pdfPath]));
  if (fonts.length === 0) {
    throw validationError(variant, "PDF contains no readable font rows");
  }

  if (fonts.some((font) => !font.embedded)) {
    throw validationError(variant, "PDF contains fonts that are not embedded");
  }

  if (fonts.some((font) => !font.unicode)) {
    throw validationError(variant, "PDF contains fonts without Unicode mappings");
  }

  const extractedText = await runner("pdftotext", [pdfPath, "-"]);
  const missingText = variant.requiredText.find((requiredText) => !extractedText.includes(requiredText));
  if (missingText) {
    throw validationError(variant, `PDF is missing required text: ${missingText}`);
  }

  const urls = await runner("pdfinfo", ["-url", pdfPath]);
  const missingUrl = REQUIRED_URLS.find((url) => !urls.includes(url));
  if (missingUrl) {
    throw validationError(variant, `PDF is missing required URL: ${missingUrl}`);
  }
}

export async function assertRequiredTools(run = execFileRun) {
  const tectonicVersion = await run("tectonic", ["--version"]);
  if (!/^tectonic 0\.16\.9(?:\s|$)/m.test(tectonicVersion)) {
    throw new Error("Required compiler version is tectonic 0.16.9");
  }

  await Promise.all(
    ["pdfinfo", "pdftotext", "pdffonts"].map((command) => run(command, ["-v"])),
  );
}
