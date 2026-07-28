import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sourceUrl = new URL("../../resume/template/silvia-resume.cls", import.meta.url);

test("template uses the approved original-inspired visual system", async () => {
  const source = await readFile(sourceUrl, "utf8");

  assert.match(
    source,
    /left=0\.30in,right=0\.30in,top=0\.28in,bottom=0\.30in/,
  );
  assert.doesNotMatch(source, /\\RequirePackage\{fontawesome5\}/);
  assert.match(source, /\\RequirePackage\{tikz\}/);
  assert.match(source, /\\newcommand\{\\ResumeVectorIcon\}\[1\]/);
  assert.match(source, /baseline=-0\.55ex/);
  assert.match(
    source,
    /\\path\[use as bounding box\] \(0,0\) rectangle \(1\.4,1\.2\);/,
  );
  for (const icon of ["Envelope", "Phone", "Globe", "LinkedIn"]) {
    assert.match(source, new RegExp(String.raw`\\newcommand\{\\ResumeIcon${icon}\}`));
  }
  assert.match(source, /\\newcommand\{\\ResumeContactItem\}\[3\]/);
  assert.match(source, /\\providecommand\{\\ResumeContactLine\}\{\}/);
  assert.match(
    source,
    /\\providecommand\{\\ResumeContactBlock\}\{\{\\fontsize\{8pt\}\{9\.5pt\}\\selectfont\\ResumeContactLine\}\}/,
  );
  assert.match(source, /\\begin\{minipage\}\[t\]\{0\.60\\linewidth\}/);
  assert.match(source, /\\begin\{minipage\}\[t\]\{0\.38\\linewidth\}/);
  assert.match(source, /\\newcommand\{\\ResumeProjectBullet\}\[2\]/);
  assert.match(source, /\\newcommand\{\\ResumeLanguage\}\[2\]/);
  assert.match(source, /\\fontsize\{9\.6pt\}\{12pt\}\\selectfont/);
});
