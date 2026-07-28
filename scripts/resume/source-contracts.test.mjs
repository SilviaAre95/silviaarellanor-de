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
  assert.equal(
    source.match(/\\ResumeContactItem\{/g)?.length,
    5,
    "identity must define exactly five linked contact items",
  );
  for (const marker of [
    String.raw`\ResumeContactItem{\ResumeIconLinkedIn}{https://www.linkedin.com/in/silvia-arellano-de}{LinkedIn}`,
    String.raw`\ResumeContactItem{\ResumeIconEnvelope}{mailto:silvia.datadev@gmail.com}{silvia.datadev@gmail.com}`,
    String.raw`\ResumeContactItem{\ResumeIconGlobe}{https://www.silviadata.dev}{silviadata.dev}`,
    String.raw`\ResumeContactItem{\ResumeIconPhone}{tel:+529871174186}{+52 987 117 4186}`,
    String.raw`\ResumeContactItem{\ResumeIconPhone}{tel:+34603990662}{+34 603 990 662}`,
  ]) {
    assert.ok(source.includes(marker), `missing linked contact item: ${marker}`);
  }
  assert.equal(
    source.match(/\\href\{/g)?.length ?? 0,
    0,
    "identity must not retain a second legacy contact rendering path",
  );
});

test("all variants use the chronology-supported tenure claim", async () => {
  for (const id of variantIds) {
    const source = await variantSource(id);
    assert.match(source, /\b6\+ years\b/, `${id} must say 6+ years`);
    assert.doesNotMatch(source, /\b7\+ years\b/, `${id} must not say 7+ years`);
  }
});

test("education source preserves all credentials and languages", async () => {
  const source = await readFile(educationSourceUrl, "utf8");
  for (const marker of [
    String.raw`\ResumeEducation{University of Chihuahua}{2018--2020}{Master's Degree in Open Source Software}`,
    String.raw`\ResumeEducation{Emeritus University of Puebla}{2013--2018}{B.Sc. in Physics}`,
    String.raw`\ResumeCredential{Google Cloud Professional Data Engineer}{In progress}`,
    String.raw`\ResumeCredential{Big Data and Machine Learning Fundamentals}{Google, Oct 2023}`,
    String.raw`\ResumeCredential{Modernizing Data Lakes and Data Warehouses with Google Cloud}{Google, Oct 2023}`,
    String.raw`\ResumeLanguage{English}{Fluent}`,
    String.raw`\ResumeLanguage{Spanish}{Native}`,
  ]) {
    assert.ok(source.includes(marker), `missing credential or language: ${marker}`);
  }
});

test("canonical sources preserve the saved resume's important project detail", async () => {
  const experience = await readFile(experienceSourceUrl, "utf8");
  const consulting = await readFile(consultingSourceUrl, "utf8");

  const requiredEmploymentEvidence = [
    ["Playtomic", "first fully automated ingestion system"],
    ["Playtomic", "dimensional modeling and star schemas"],
    ["Playtomic", "Zendesk, CDPs, and marketing tools"],
    ["Siftia", "more than 80 scheduled BigQuery queries"],
    ["Siftia", "dynamic column unnesting"],
    ["Siftia", "post-migration synchronization and Firebase audits"],
    ["Worky", "Type 2 slowly changing dimensions and a galaxy schema"],
    ["Worky", "eight live Looker Studio reports"],
    ["MatchCraft", "ad-behavior prediction and budget-estimation tools"],
    ["MMI", "database health-check tool"],
    ["MMI", "marketing workflows with ETL packages and T-SQL"],
    ["B-Metrics", "national sports teams"],
  ];

  for (const [label, phrase] of requiredEmploymentEvidence) {
    assert.ok(experience.includes(phrase), `${label} evidence missing: ${phrase}`);
  }

  for (const phrase of [
    "Fivetran, Datastream, and Dataflow",
    "Power BI data product",
    "the client sold it as a new product",
    "construction progress, budget, and sales",
    "Cloud Functions, Workflows, Zapier, and Apps Script",
  ]) {
    assert.ok(consulting.includes(phrase), `consulting evidence missing: ${phrase}`);
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

test("Senior selects every canonical role, consulting engagement, and credential group", async () => {
  const source = await variantSource("senior-data-engineer");

  for (const macro of [
    "PlaytomicLeadRole",
    "PlaytomicSeniorRole",
    "SiftiaRole",
    "WorkyRole",
    "MatchCraftRole",
    "MmiRole",
    "BMetricsRole",
    "ThomsonReutersRole",
    "WorkyContractRole",
    "GrupoHomaRole",
    "SharedEducation",
    "SharedCertifications",
    "SharedLanguages",
  ]) {
    assert.match(source, new RegExp(`\\\\${macro}\\b`));
  }
});

test("FDE selects every canonical role, consulting engagement, and credential group", async () => {
  const source = await variantSource("forward-deployed-engineer");

  for (const macro of [
    "PlaytomicLeadRole",
    "PlaytomicSeniorRole",
    "SiftiaRole",
    "WorkyRole",
    "MatchCraftRole",
    "MmiRole",
    "BMetricsRole",
    "ThomsonReutersRole",
    "WorkyContractRole",
    "GrupoHomaRole",
    "SharedEducation",
    "SharedCertifications",
    "SharedLanguages",
  ]) {
    assert.equal(
      source.match(new RegExp(`\\\\${macro}\\b`, "g"))?.length,
      1,
      `FDE must select ${macro} exactly once`,
    );
  }
});

test("Leadership selects every canonical role, consulting engagement, and credential group", async () => {
  const source = await variantSource("data-leadership");

  for (const macro of [
    "PlaytomicLeadRole",
    "PlaytomicSeniorRole",
    "SiftiaRole",
    "WorkyRole",
    "MatchCraftRole",
    "MmiRole",
    "BMetricsRole",
    "ThomsonReutersRole",
    "WorkyContractRole",
    "GrupoHomaRole",
    "SharedEducation",
    "SharedCertifications",
    "SharedLanguages",
  ]) {
    assert.equal(
      source.match(new RegExp(`\\\\${macro}\\b`, "g"))?.length,
      1,
      `Leadership must select ${macro} exactly once`,
    );
  }
});

test("Leadership preserves management, architecture, adoption, and consulting depth", async () => {
  const source = await variantSource("data-leadership");

  for (const macro of [
    "PlaytomicLeadership",
    "PlaytomicIngestion",
    "PlaytomicBeamFramework",
    "PlaytomicTerraform",
    "PlaytomicObservability",
    "PlaytomicMcpSemanticLayer",
    "PlaytomicMcpAdoption",
    "PlaytomicAdkAgents",
    "SiftiaLeadership",
    "SiftiaRefreshTime",
    "MmiLeadership",
    "MmiStandards",
    "ThomsonReutersDelivery",
  ]) {
    assert.match(source, new RegExp(`\\\\${macro}\\b`));
  }
});

test("Leadership preserves platform scale and Siftia delivery depth", async () => {
  const source = await variantSource("data-leadership");

  for (const macro of [
    "PlaytomicStreamingImpact",
    "SiftiaQueryRefactor",
    "SiftiaReportingAndMigration",
  ]) {
    assert.equal(
      source.match(new RegExp(`\\\\${macro}\\b`, "g"))?.length,
      1,
      `Leadership must select ${macro} exactly once`,
    );
  }
});

test("FDE preserves earlier implementation and client-delivery depth", async () => {
  const source = await variantSource("forward-deployed-engineer");

  for (const macro of [
    "WorkyPipelines",
    "WorkyWarehouse",
    "WorkyReporting",
    "MmiGeolocation",
    "MmiHealthCheck",
    "MmiMarketingAutomation",
  ]) {
    assert.match(source, new RegExp(`\\\\${macro}\\b`));
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
    sectionBlock(leadershipSource, "Professional Experience"),
    /\\PlaytomicMcpAdoption\b/,
  );
});
