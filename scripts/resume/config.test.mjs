import assert from "node:assert/strict";
import test from "node:test";
import * as resumeConfig from "./config.mjs";

const {
  createApplicationResumeContract,
  PUBLIC_RESUME_PATH,
  RESUME_VARIANTS,
  SHARED_ROLE_DATE_TEXT,
  TECTONIC_VERSION,
} = resumeConfig;

test("pins the approved compiler and declares three unique variants", () => {
  assert.equal(TECTONIC_VERSION, "0.16.9");
  assert.equal(RESUME_VARIANTS.length, 3);
  assert.equal(new Set(RESUME_VARIANTS.map(({ id }) => id)).size, 3);
});

test("publishes only the Senior Data Engineer variant", () => {
  const publicVariants = RESUME_VARIANTS.filter(({ publish }) => publish);
  assert.deepEqual(publicVariants.map(({ id }) => id), ["senior-data-engineer"]);
  assert.equal(PUBLIC_RESUME_PATH, "public/silvia-arellano-cv.pdf");
});

test("requires target-specific headlines and common identity markers", () => {
  for (const variant of RESUME_VARIANTS) {
    assert.ok(variant.headline.length > 10);
    assert.ok(variant.requiredText.includes("Silvia Arellano Romero"));
    assert.ok(variant.requiredText.includes("LinkedIn"));
    assert.ok(variant.requiredText.includes("silvia.datadev@gmail.com"));
    assert.ok(variant.requiredText.includes("+52 987 117 4186"));
    assert.ok(variant.requiredText.includes("+34 603 990 662"));
  }
});

test("requires the chronology-supported 6+ years claim in tailored variants", () => {
  for (const variant of RESUME_VARIANTS.filter(({ id }) => id !== "senior-data-engineer")) {
    assert.ok(
      variant.requiredText.includes("6+ years"),
      `${variant.id} must require the verified tenure claim`,
    );
    assert.equal(
      variant.requiredText.some((text) => text.includes("7+ years")),
      false,
      `${variant.id} must not require the unsupported tenure claim`,
    );
  }
});

test("requires every shared career, education, credential, and language marker in tailored variants", () => {
  const sharedMarkers = [
    "Playtomic Oct 2025–Present Lead Data Engineer",
    "Playtomic Apr 2024–Oct 2025 Global Senior Data Engineer",
    "Siftia Data Company Feb 2023–Apr 2024 Data Engineer / Data Product Developer",
    "Worky Jun 2022–Feb 2023 Data Engineer / Analyst",
    "MatchCraft Feb 2021–Jul 2022 Business Data Engineer",
    "MMI Business Consulting",
    "Oct 2020–Dec 2023",
    "Partner & Database Engineer",
    "B-Metrics Sep 2019–Oct 2020 Biomechanical Data Engineer",
    "Thomson Reuters Feb 2025–May 2026 Data Engineer (Contract)",
    "Worky Jun 2024–Sep 2024 Data Product Developer (Contract)",
    "Grupo Homa Real Estate Developers Jan 2022–Jan 2023 Data Solutions Architect (Contract)",
    "University of Chihuahua",
    "Master’s Degree in Open Source Software",
    "2018–2020",
    "Emeritus University of Puebla",
    "B.Sc. in Physics",
    "2013–2018",
    "Google Cloud Professional Data Engineer",
    "Big Data and Machine Learning Fundamentals",
    "Modernizing Data Lakes and Data Warehouses with Google Cloud",
    "English - Fluent",
    "Spanish - Native",
    "Authorized to work in Mexico, Spain, the United States, and the EU",
    "Open to remote roles",
  ];

  for (const variant of RESUME_VARIANTS.filter(({ id }) => id !== "senior-data-engineer")) {
    for (const requiredText of sharedMarkers) {
      assert.ok(
        variant.requiredText.includes(requiredText),
        `${variant.id} must require ${requiredText}`,
      );
    }
  }
});

test("defines section and approved-evidence contracts per variant", () => {
  const expectedContracts = {
    "senior-data-engineer": {
      sections: [
        "Skills",
        "Professional Experience",
        "Consulting Projects",
        "Education",
        "Certifications",
        "Languages",
      ],
      evidence: [
        "data engineer with deep experience architecting and building scalable data infrastructure in GCP.",
        "Reduced pipeline development time from weeks to a few days",
        "Built Playtomic’s first fully automated data ingestion system in GCP",
        "1. Most Recent Project - BigQuery Data Warehouse Refactoring:",
        "2. Main Responsibilities:",
        "Geolocation Data Integration and Hashing Process.",
        "Development of Data Pipelines and ETL Processes.",
        "Audited digital ads data in MySQL",
        "Processed and analyzed biomechanical data for national sports teams",
        "Built streaming and batch data infrastructure using Fivetran, Datastream, and Dataflow",
        "Developed a custom, end-to-end data product in Power BI.",
        "I created an end-to-end, user-friendly data product",
        "University of Chihuahua",
        "On-Course Professional Data Engineer Certification by Google",
        "English - Fluent",
        "Spanish - Native",
      ],
    },
    "forward-deployed-engineer": {
      sections: [
        "Summary",
        "Data & AI Capabilities",
        "Selected Forward-Deployed Impact",
        "Professional Experience",
        "Professional Experience (continued)",
        "Consulting Engagements",
        "Education",
        "Certifications",
        "Languages",
      ],
      evidence: [
        "discovery and scoping",
        "MCP server over Cube Core",
        "50+ people across six teams",
        "all new dashboards independently",
        "Agent Development Kit",
        "client reporting and migration",
        "Productized Power BI delivery",
        "Business automation and warehousing",
      ],
    },
    "data-leadership": {
      sections: [
        "Leadership Summary",
        "Leadership & Architecture Strengths",
        "Professional Experience",
        "Professional Experience (continued)",
        "Consulting",
        "Education",
        "Certifications",
        "Languages",
      ],
      evidence: [
        "Managed the data engineering team at Playtomic",
        "Managed a client-facing data engineering team",
        "Led the development team within the consultancy",
        "Reusable data-product framework",
        "Infrastructure as code",
        "Sustained engineering agents",
        "50+ people across six teams",
        "Streaming and batch platform",
      ],
    },
  };

  for (const variant of RESUME_VARIANTS) {
    const expected = expectedContracts[variant.id];
    assert.deepEqual(variant.requiredSections, expected.sections);
    assert.deepEqual(variant.requiredEvidence, expected.evidence);
    for (const marker of [...expected.sections, ...expected.evidence]) {
      assert.ok(variant.requiredText.includes(marker));
    }
  }
});

test("forbids management headcounts without rejecting the approved adoption metric", () => {
  for (const variant of RESUME_VARIANTS) {
    assert.ok(Array.isArray(variant.forbiddenText), `${variant.id} needs forbidden rules`);
    const rejects = (text) => variant.forbiddenText.some(({ pattern }) => {
      pattern.lastIndex = 0;
      return pattern.test(text);
    });

    for (const prohibited of [
      "Managed the data engineering team of 12 engineers.",
      "Managed a team of four.",
      "Led 4 developers in the consultancy.",
      "Oversaw twelve engineers.",
      "Managed twenty-one people.",
      "Led a four-developer team.",
      "Oversaw a 12-person team.",
      "Managed five members.",
      "Led three staff.",
      "Oversaw six direct reports.",
    ]) {
      assert.equal(rejects(prohibited), true, `must reject: ${prohibited}`);
    }
    assert.equal(
      rejects("Enabled 50+ people across six teams—and growing—to use the workflow."),
      false,
    );
  }
});

test("derives application contracts from shared role dates and truthfulness guards", () => {
  assert.equal(
    typeof createApplicationResumeContract,
    "function",
    "config must expose the shared application-contract derivation",
  );
  assert.ok(Array.isArray(SHARED_ROLE_DATE_TEXT));

  const fdeContract = createApplicationResumeContract({
    id: "application-acme-fde",
    baseId: "forward-deployed-engineer",
    headline: "Senior Forward Deployed Engineer",
    requiredSections: ["Summary", "Professional Experience"],
    requiredEvidence: ["MCP server over Cube Core"],
  });

  for (const roleDate of SHARED_ROLE_DATE_TEXT) {
    assert.ok(fdeContract.requiredText.includes(roleDate), `missing role/date: ${roleDate}`);
  }
  assert.ok(fdeContract.requiredText.includes("Senior Forward Deployed Engineer"));
  assert.ok(fdeContract.requiredText.includes("MCP server over Cube Core"));
  assert.deepEqual(fdeContract.maxTextOccurrences, [
    { text: "Forward Deployed Engineer", max: 1 },
  ]);
  assert.equal(
    fdeContract.forbiddenText.some(({ pattern }) => {
      pattern.lastIndex = 0;
      return pattern.test("Led four developers.");
    }),
    true,
  );

  const seniorContract = createApplicationResumeContract({
    id: "application-acme-data",
    baseId: "senior-data-engineer",
    headline: "Senior Data Engineer",
    requiredSections: ["Summary"],
  });
  assert.deepEqual(seniorContract.maxTextOccurrences, [
    { text: "Forward Deployed Engineer", max: 0 },
  ]);
});

test("limits the FDE target title to the headline occurrence", () => {
  const fdeVariant = RESUME_VARIANTS.find(({ id }) => id === "forward-deployed-engineer");
  assert.deepEqual(fdeVariant.maxTextOccurrences, [
    { text: "Forward Deployed Engineer", max: 1 },
  ]);
});
