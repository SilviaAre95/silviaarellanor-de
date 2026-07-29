import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

function sectionBlock(source, label) {
  const start = source.indexOf(`\\ResumeSection{${label}}`);
  assert.notEqual(start, -1, `${label} section must exist`);
  const next = source.indexOf("\\ResumeSection{", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("Forward Deployed Engineer renders the complete Worky contract in Consulting", async () => {
  const source = await readFile(
    new URL("../../resume/variants/forward-deployed-engineer.tex", import.meta.url),
    "utf8",
  );
  const consulting = sectionBlock(source, "Consulting Engagements");

  assert.match(consulting, /\\WorkyContractRole\b/);
  assert.match(consulting, /\\WorkyContractProduct\b/);
  assert.ok(
    consulting.indexOf("\\WorkyContractRole") < consulting.indexOf("\\WorkyContractProduct"),
    "the Worky contract role must precede its product evidence",
  );
  assert.equal(source.match(/\\WorkyContractRole\b/g)?.length, 1);
  assert.equal(source.match(/\\WorkyContractProduct\b/g)?.length, 1);
});

test("FDE does not duplicate project macros between selected impact and consulting", async () => {
  const source = await readFile(
    new URL("../../resume/variants/forward-deployed-engineer.tex", import.meta.url),
    "utf8",
  );
  const selectedImpact = sectionBlock(source, "Selected Forward-Deployed Impact");
  const consulting = sectionBlock(source, "Consulting Engagements");
  const selectedMacros = new Set(
    [...selectedImpact.matchAll(/\\([A-Z][A-Za-z]+)\b/g)].map(([, macro]) => macro),
  );
  const consultingMacros = new Set(
    [...consulting.matchAll(/\\([A-Z][A-Za-z]+)\b/g)].map(([, macro]) => macro),
  );
  const duplicateProjectMacros = [...selectedMacros].filter((macro) => (
    consultingMacros.has(macro) && macro !== "ResumeSection"
  ));

  assert.deepEqual(duplicateProjectMacros, []);
});
