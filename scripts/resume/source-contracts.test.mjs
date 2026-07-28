import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const experienceSourceUrl = new URL("../../resume/content/experience.tex", import.meta.url);
const consultingSourceUrl = new URL("../../resume/content/consulting.tex", import.meta.url);
const identitySourceUrl = new URL("../../resume/content/identity.tex", import.meta.url);
const educationSourceUrl = new URL("../../resume/content/education.tex", import.meta.url);
const variantIds = [
  "senior-data-engineer",
  "forward-deployed-engineer",
  "data-leadership",
];

async function variantSource(id) {
  return readFile(new URL(`../../resume/variants/${id}.tex`, import.meta.url), "utf8");
}

function macroBlock(source, macro) {
  const start = source.indexOf(`\\newcommand{\\${macro}}`);
  assert.notEqual(start, -1, `${macro} must exist`);
  const next = source.indexOf("\\newcommand{\\", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

function sectionBlock(source, label) {
  const start = source.indexOf(`\\ResumeSection{${label}}`);
  assert.notEqual(start, -1, `${label} section must exist`);
  const next = source.indexOf("\\ResumeSection{", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("canonical employment macros preserve approved roles and dates", async () => {
  const source = await readFile(experienceSourceUrl, "utf8");
  const consultingSource = await readFile(consultingSourceUrl, "utf8");
  const requiredRoleDefinitions = [
    String.raw`\ResumeRole{Lead Data Engineer}{Playtomic}{Oct 2025}{Present}`,
    String.raw`\ResumeRole{Global Senior Data Engineer}{Playtomic}{Apr 2024}{Oct 2025}`,
    String.raw`\ResumeRole{Data Engineer / Data Product Developer}{Siftia Data Company}{Feb 2023}{Apr 2024}`,
    String.raw`\ResumeRole{Data Engineer / Analyst}{Worky}{Jun 2022}{Feb 2023}`,
    String.raw`\ResumeRole{Business Data Engineer}{MatchCraft}{Feb 2021}{Jul 2022}`,
    String.raw`\ResumeRole{Partner \& Database Engineer}{MMI Business Consulting}{Oct 2020}{Dec 2023}`,
    String.raw`\ResumeRole{Biomechanical Data Engineer}{B-Metrics}{Sep 2019}{Oct 2020}`,
  ];

  for (const definition of requiredRoleDefinitions) {
    assert.ok(source.includes(definition), `missing canonical role: ${definition}`);
  }
  assert.ok(
    consultingSource.includes(
      String.raw`\ResumeRole{Data Engineer (Contract)}{Thomson Reuters}{Feb 2025}{May 2026}`,
    ),
    "missing canonical Thomson Reuters contract role",
  );
});

test("identity defines five visible linked contact items", async () => {
  const source = await readFile(identitySourceUrl, "utf8");
  for (const marker of [
    String.raw`\ResumeContactItem{\ResumeIconLinkedIn}{https://www.linkedin.com/in/silvia-arellano-de}{LinkedIn}`,
    String.raw`\ResumeContactItem{\ResumeIconEnvelope}{mailto:silvia.datadev@gmail.com}{silvia.datadev@gmail.com}`,
    String.raw`\ResumeContactItem{\ResumeIconGlobe}{https://www.silviadata.dev}{silviadata.dev}`,
    String.raw`\ResumeContactItem{\ResumeIconPhone}{tel:+529871174186}{+52 987 117 4186}`,
    String.raw`\ResumeContactItem{\ResumeIconPhone}{tel:+34603990662}{+34 603 990 662}`,
  ]) {
    assert.ok(source.includes(marker), `missing linked contact item: ${marker}`);
  }
});

test("education source preserves all credentials and languages", async () => {
  const source = await readFile(educationSourceUrl, "utf8");
  for (const marker of [
    "Google Cloud Professional Data Engineer",
    "Big Data and Machine Learning Fundamentals",
    "Modernizing Data Lakes and Data Warehouses with Google Cloud",
    String.raw`\ResumeLanguage{English}{Fluent}`,
    String.raw`\ResumeLanguage{Spanish}{Native}`,
  ]) {
    assert.ok(source.includes(marker), `missing credential or language: ${marker}`);
  }
});

test("every variant selects Worky, MatchCraft, and Thomson Reuters canonical roles", async () => {
  for (const id of variantIds) {
    const source = await variantSource(id);
    assert.match(source, /\\WorkyRole\b/);
    assert.match(source, /\\MatchCraftRole\b/);
    assert.match(source, /\\ThomsonReutersRole\b/);
  }
});

test("the FDE target title appears once in source and never as an employment macro", async () => {
  const source = await variantSource("forward-deployed-engineer");
  assert.equal(source.match(/Forward Deployed Engineer/g)?.length, 1);
  assert.match(
    source,
    /\\ResumeHeader\{Forward Deployed Engineer - Data \\& AI Systems\}/,
  );
  assert.doesNotMatch(
    source,
    /\\ResumeRole\{Forward Deployed Engineer\}/,
  );
  assert.doesNotMatch(source, /\\(?:ForwardDeployed|Fde)Role\b/i);
});

test("50+ across six teams is selected only as adoption evidence", async () => {
  const experienceSource = await readFile(experienceSourceUrl, "utf8");
  const quantifiedPeopleClaims = experienceSource.match(/\b\d+\+?\s+(?:people|engineers?|members?|reports?)\b/gi);

  assert.deepEqual(quantifiedPeopleClaims, ["50+ people"]);
  assert.match(
    macroBlock(experienceSource, "PlaytomicMcpAdoption"),
    /Enabled 50\+ people across six teams/,
  );
  for (const managementMacro of [
    "PlaytomicLeadership",
    "SiftiaLeadership",
    "MmiLeadership",
  ]) {
    assert.doesNotMatch(
      macroBlock(experienceSource, managementMacro),
      /\b(?:team of \d+\+?|\d+\+?\s+(?:people|engineers?|members?|reports?))\b/i,
    );
  }

  const fdeSource = await variantSource("forward-deployed-engineer");
  assert.match(
    sectionBlock(fdeSource, "Selected Forward-Deployed Impact"),
    /\\PlaytomicMcpAdoption\b/,
  );

  const leadershipSource = await variantSource("data-leadership");
  assert.match(
    sectionBlock(leadershipSource, "Selected Technical \\& Organizational Impact"),
    /\\PlaytomicMcpAdoption\b/,
  );
});
