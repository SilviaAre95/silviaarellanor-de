import assert from "node:assert/strict";
import { unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  assertRequiredTools,
  parseFontRows,
  parsePdfInfo,
  validateResumePdf,
} from "./validate-resume.mjs";

const validInfo = `Pages: 2
Page size: 612 x 792 pts (letter)
`;

const validFonts = `name type encoding emb sub uni object ID
AAAAAA+TeXGyreHeros CID TrueType Identity-H yes yes yes 12 0
`;

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

test("rejects a missing PDF before invoking system tools", async () => {
  const pdfPath = join(tmpdir(), "missing-resume.pdf");

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

  await assert.rejects(
    assertRequiredTools(async (command) => {
      if (command === "tectonic") return "tectonic 0.16.8";
      return "available";
    }),
    /tectonic 0\.16\.9/,
  );
});
