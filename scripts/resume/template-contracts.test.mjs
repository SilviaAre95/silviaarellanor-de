import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sourceUrl = new URL("../../resume/template/silvia-resume.cls", import.meta.url);

function macroBlock(source, macro) {
  const start = source.indexOf(`\\newcommand{\\${macro}}`);
  assert.notEqual(start, -1, `${macro} must exist`);
  const next = source.indexOf("\\newcommand{\\", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("template keeps the approved narrow canvas and readable body leading", async () => {
  const source = await readFile(sourceUrl, "utf8");

  assert.match(
    source,
    /left=0\.30in,right=0\.30in,top=0\.28in,bottom=0\.30in/,
  );
  assert.doesNotMatch(source, /\\RequirePackage\{fontawesome5\}/);
  assert.match(source, /\\RequirePackage\{tikz\}/);
  assert.match(source, /\\fontsize\{9\.6pt\}\{12pt\}\\selectfont/);
});

test("template renders links and editorial rules in black", async () => {
  const source = await readFile(sourceUrl, "utf8");
  const header = macroBlock(source, "ResumeHeader");
  const section = macroBlock(source, "ResumeSection");

  assert.match(source, /\\definecolor\{SilviaInk\}\{HTML\}\{000000\}/);
  assert.doesNotMatch(source, /SilviaTeal/);
  for (const color of ["linkcolor", "urlcolor", "citecolor"]) {
    assert.match(source, new RegExp(`${color}=SilviaInk`));
  }
  assert.match(header, /\\color\{SilviaInk\}\\rule\{\\linewidth\}/);
  assert.match(section, /\\color\{SilviaInk\}\\rule\{\\linewidth\}/);
});

test("template uses enlarged baseline-aligned filled vector contact marks", async () => {
  const source = await readFile(sourceUrl, "utf8");
  const vectorIcon = macroBlock(source, "ResumeVectorIcon");
  const geometry = vectorIcon.match(
    /x=([\d.]+)ex,y=([\d.]+)ex,baseline=(-[\d.]+)ex/,
  );

  assert.match(source, /\\newcommand\{\\ResumeVectorIcon\}\[1\]/);
  assert.ok(geometry, "the contact mark must expose explicit ex-based geometry");
  const [, rawXScale, rawYScale, rawBaseline] = geometry;
  const xScale = Number(rawXScale);
  const yScale = Number(rawYScale);
  const baseline = Number(rawBaseline);
  assert.ok(xScale >= 1.5 && xScale <= 1.7, "contact marks must be 1.5–1.7ex wide");
  assert.equal(yScale, xScale, "contact marks must use a uniform scale");
  assert.ok(
    baseline <= -0.3 && baseline >= -0.5,
    "the enlarged contact marks must be optically aligned to the text baseline",
  );
  assert.match(
    source,
    /\\path\[use as bounding box\] \(0,0\) rectangle \(1\.4,1\.2\);/,
  );
  for (const icon of ["Envelope", "Phone", "Globe", "LinkedIn"]) {
    const block = macroBlock(source, `ResumeIcon${icon}`);
    assert.match(block, /\\fill\b/, `${icon} must be a filled mark`);
    assert.doesNotMatch(block, /\\draw\b/, `${icon} must not regress to an outline mark`);
  }
});

test("template renders complete contacts in one aligned block", async () => {
  const source = await readFile(sourceUrl, "utf8");

  assert.match(source, /\\newcommand\{\\ResumeContactItem\}\[3\]/);
  assert.match(source, /\\providecommand\{\\ResumeContactLine\}\{\}/);
  assert.match(
    source,
    /\\providecommand\{\\ResumeContactBlock\}\{\{\\fontsize\{8pt\}\{9\.5pt\}\\selectfont\\ResumeContactLine\}\}/,
  );
  assert.match(source, /\\begin\{minipage\}\[t\]\{0\.60\\linewidth\}/);
  assert.match(source, /\\begin\{minipage\}\[t\]\{0\.38\\linewidth\}/);
});

test("header has exactly one divider after authorization", async () => {
  const source = await readFile(sourceUrl, "utf8");
  const header = macroBlock(source, "ResumeHeader");

  assert.equal(header.match(/\\rule\{\\linewidth\}/g)?.length, 1);
  assert.ok(
    header.indexOf("\\ResumeAuthorizationLine") < header.indexOf("\\rule{\\linewidth}"),
    "the single divider must follow authorization",
  );
});

test("section headings are centered above one black rule", async () => {
  const source = await readFile(sourceUrl, "utf8");
  const section = macroBlock(source, "ResumeSection");

  assert.equal(section.match(/\\rule\{\\linewidth\}/g)?.length, 1);
  assert.ok(
    section.indexOf("\\rule{\\linewidth}") < section.indexOf("\\MakeUppercase{#1}"),
    "the section rule must precede its heading",
  );
  assert.match(section, /\\centering/);
});

test("opening section headings reuse the single header divider", async () => {
  const source = await readFile(sourceUrl, "utf8");
  const openingSection = macroBlock(source, "ResumeOpeningSection");

  assert.match(openingSection, /\\centering/);
  assert.doesNotMatch(openingSection, /\\rule\{\\linewidth\}/);
});

test("template exposes a selectable four-column skill grid", async () => {
  const source = await readFile(sourceUrl, "utf8");
  const grid = macroBlock(source, "ResumeSkillGrid");

  assert.match(source, /\\newcommand\{\\ResumeSkillCell\}\[1\]/);
  assert.match(source, /\\newcommand\{\\ResumeSkillGridRow\}\[4\]/);
  assert.doesNotMatch(grid, /\\begin\{tabular\}/);
});

test("template retains saved project and language presentation hooks", async () => {
  const source = await readFile(sourceUrl, "utf8");

  assert.match(source, /\\newcommand\{\\ResumeProjectBullet\}\[2\]/);
  assert.match(source, /\\newcommand\{\\ResumeLanguage\}\[2\]/);
});
