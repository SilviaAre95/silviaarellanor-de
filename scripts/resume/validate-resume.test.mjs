import assert from "node:assert/strict";
import { mkdtemp, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  assertRequiredTools,
  parseFontRows,
  parsePdfInfo,
  validateResumePdf,
} from "./validate-resume.mjs";
import { RESUME_VARIANTS } from "./config.mjs";

const validInfo = `Pages: 2
Page size: 612 x 792 pts (letter)
`;

const validFonts = `name type encoding emb sub uni object ID
AAAAAA+TeXGyreHeros CID TrueType Identity-H yes yes yes 12 0
`;

const validUrls = `Page  Type          URL
   1  Annotation    mailto:silvia.datadev@gmail.com
   1  Annotation    https://www.silviadata.dev
   1  Annotation    https://www.linkedin.com/in/silvia-arellano-de
   1  Annotation    tel:+529871174186
   1  Annotation    tel:+34603990662
`;

function pdfRunner(extractedText) {
  return async (command, args) => {
    if (command === "pdfinfo" && args[0] === "-url") return validUrls;
    if (command === "pdfinfo") return validInfo;
    if (command === "pdffonts") return validFonts;
    if (command === "pdftotext") return extractedText;
    throw new Error(`Unexpected command: ${command}`);
  };
}

test("parses two-page US Letter metadata", () => {
  assert.deepEqual(parsePdfInfo(validInfo), {
    pages: 2,
    width: 612,
    height: 792,
  });
});

test("rejects a font without embedding or Unicode mapping", () => {
  const rows = parseFontRows(
    "AAAAAA+TeXGyreHeros CID TrueType Identity-H no no no 12 0",
  );
  assert.equal(rows[0].embedded, false);
  assert.equal(rows[0].unicode, false);
});

test("ignores the pdffonts table separator when parsing embedded fonts", () => {
  const rows = parseFontRows(`name type encoding emb sub uni object ID
------------------------------------ ----------------- ---------------- --- --- --- ---------
TeXGyreHeros CID Type 0C Identity-H yes yes yes 12 0
`);

  assert.deepEqual(rows, [
    { embedded: true, subset: true, unicode: true, object: "12", id: "0" },
  ]);
});

test("reports the variant when required extracted text is absent", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: ["Silvia Arellano Romero", "Required phrase"],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return "https://www.silviadata.dev";
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "Silvia Arellano Romero";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /senior-data-engineer.*Required phrase/,
  );
});

test("accepts required text whose PDF presentation is uppercase", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: ["Senior Data Engineer"] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("SENIOR DATA ENGINEER"),
    }),
  );
});

test("accepts required text across PDF line and spacing changes", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: ["Lead Data Engineer | Playtomic Oct 2025–Present"],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("LEAD   DATA ENGINEER | PLAYTOMIC\n\n\tOCT 2025–PRESENT"),
    }),
  );
});

test("accepts an ASCII language separator rendered as a typographic dash", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: ["English - Fluent", "Spanish - Native"],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("English – Fluent\nSpanish – Native"),
    }),
  );
});

test("requires section labels as their own normalized PDF lines", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: [],
        requiredSections: ["Summary"],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("This paragraph mentions a summary but omits the section label."),
    }),
    /\[senior-data-engineer\].*section label: Summary/,
  );
});

test("rejects forbidden management headcount language", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "data-leadership",
        requiredText: [],
        forbiddenText: [
          {
            label: "management headcount language",
            pattern: /\bmanaged\b.{0,60}\bteam of \d+\s+engineers\b/i,
          },
        ],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("Managed the platform team of 12 engineers."),
    }),
    /\[data-leadership\].*management headcount language/,
  );
});

test("rejects a plain team-size management headcount from the real variant contract", async () => {
  const leadershipVariant = RESUME_VARIANTS.find(({ id }) => id === "data-leadership");

  await assert.rejects(
    validateResumePdf({
      variant: {
        id: leadershipVariant.id,
        requiredText: [],
        forbiddenText: leadershipVariant.forbiddenText,
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("Managed a team of 12."),
    }),
    /\[data-leadership\].*management headcount language/,
  );
});

test("rejects an FDE title occurrence beyond the target headline", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "forward-deployed-engineer",
        requiredText: ["Forward Deployed Engineer"],
        maxTextOccurrences: [{ text: "Forward Deployed Engineer", max: 1 }],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner(
        "FORWARD DEPLOYED ENGINEER - DATA & AI SYSTEMS\nForward Deployed Engineer | Playtomic",
      ),
    }),
    /\[forward-deployed-engineer\].*Forward Deployed Engineer.*maximum is 1/,
  );
});

test("accepts the canonical LinkedIn URL embedded by the resume sources", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return validUrls;
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
  );
});

test("rejects a resume without both linked phone numbers", async () => {
  const variant = { id: "senior-data-engineer", requiredText: [] };
  await assert.rejects(
    validateResumePdf({
      variant,
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return validUrls.replace("tel:+34603990662", "");
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /tel:\+34603990662/,
  );
});

test("rejects a longer phone URL containing the required Mexico number", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return validUrls.replace("tel:+529871174186", "tel:+5298711741860");
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /tel:\+529871174186/,
  );
});

test("rejects a phone URL with an added query suffix", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return validUrls.replace("tel:+34603990662", "tel:+34603990662?ext=1");
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /tel:\+34603990662/,
  );
});

test("rejects an unexpected sixth PDF link", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return `${validUrls}   2  Annotation    https://tracking.example/resume\n`;
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /unexpected URL.*tracking\.example/,
  );
});

test("rejects a duplicated PDF link record", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return `${validUrls}   2  Annotation    mailto:silvia.datadev@gmail.com\n`;
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /exactly once.*mailto:silvia\.datadev@gmail\.com/,
  );
});

test("prefixes PDF-tool failures with the variant ID", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command) => {
        if (command === "pdfinfo") throw new Error("pdfinfo unavailable");
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    (error) => error.message.startsWith("[senior-data-engineer] pdfinfo unavailable"),
  );
});

test("rejects a missing PDF before invoking system tools", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "missing-resume-"));
  const pdfPath = join(directory, "resume.pdf");
  t.after(() => rm(directory, { recursive: true, force: true }));

  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath,
      logText: "",
    }),
    /\[senior-data-engineer\].*does not exist/,
  );
});

test("rejects a zero-byte PDF", async (t) => {
  const pdfPath = join(tmpdir(), `empty-resume-${process.pid}.pdf`);
  await writeFile(pdfPath, "");
  t.after(() => unlink(pdfPath));

  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath,
      logText: "",
    }),
    /\[senior-data-engineer\].*empty/,
  );
});

test("rejects a PDF with the wrong page count", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "data-leadership", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command) => {
        if (command === "pdfinfo") return "Pages: 1\nPage size: 612 x 792 pts (letter)\n";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /\[data-leadership\].*two US Letter pages/,
  );
});

test("rejects PDFs with unembedded fonts", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "data-leadership", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return "";
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") {
          return "name type encoding emb sub uni object ID\nBadFont Type 1 Custom no yes yes 12 0\n";
        }
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /\[data-leadership\].*not embedded/,
  );
});

test("rejects PDFs without all required hyperlinks", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "data-leadership", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return "https://www.silviadata.dev";
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /\[data-leadership\].*mailto:silvia\.datadev@gmail\.com/,
  );
});

test("rejects PDFs with an overfull TeX box warning", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "data-leadership", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "Overfull \\hbox (1.0pt too wide) in paragraph",
      run: async () => validInfo,
    }),
    /\[data-leadership\].*Overfull \\hbox/,
  );
});

test("requires the approved compiler and available Poppler commands", async () => {
  await assert.doesNotReject(
    assertRequiredTools(async (command) => {
      if (command === "tectonic") return "tectonic 0.16.9";
      if (["pdfinfo", "pdftotext", "pdffonts"].includes(command)) return "available";
      throw new Error(`Unexpected command: ${command}`);
    }),
  );

  await assert.doesNotReject(
    assertRequiredTools(async (command) => {
      if (command === "tectonic") return "Tectonic 0.16.9";
      if (["pdfinfo", "pdftotext", "pdffonts"].includes(command)) return "available";
      throw new Error(`Unexpected command: ${command}`);
    }),
  );

  await assert.rejects(
    assertRequiredTools(async (command) => {
      if (command === "tectonic") return "tectonic 0.16.8";
      return "available";
    }),
    /tectonic 0\.16\.9/,
  );
});
