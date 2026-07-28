import assert from "node:assert/strict";
import test from "node:test";
import {
  PUBLIC_RESUME_PATH,
  RESUME_VARIANTS,
  TECTONIC_VERSION,
} from "./config.mjs";

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

test("requires the canonical career and contact contract in every variant", () => {
  const seniorCareer = [
    "Playtomic Oct 2025–Present Lead Data Engineer",
    "Playtomic Apr 2024–Oct 2025 Global Senior Data Engineer",
    "Siftia Data Company Feb 2023–Apr 2024 Data Engineer / Data Product Developer",
    "Worky Jun 2022–Feb 2023 Data Engineer / Analyst",
    "MatchCraft Feb 2021–Jul 2022 Business Data Engineer",
    "MMI Business Consulting Oct 2020–Dec 2023 Partner & Database Engineer",
    "B-Metrics Sep 2019–Oct 2020 Biomechanical Data Engineer",
    "Thomson Reuters Feb 2025–May 2026 Data Engineer (Contract)",
  ];
  const fdeCareer = [
    ...seniorCareer,
    "Worky Jun 2024–Sep 2024 Data Product Developer (Contract)",
    "Grupo Homa Real Estate Developers Jan 2022–Jan 2023 Data Solutions Architect (Contract)",
  ];
  const leadershipCareer = [
    "Playtomic Oct 2025–Present Lead Data Engineer",
    "Playtomic Apr 2024–Oct 2025 Global Senior Data Engineer",
    "Siftia Data Company Feb 2023–Apr 2024 Data Engineer / Data Product Developer",
    "Worky Jun 2022–Feb 2023 Data Engineer / Analyst",
    "MatchCraft Feb 2021–Jul 2022 Business Data Engineer",
    "MMI Business Consulting",
    "Partner & Database Engineer",
    "Oct 2020–Dec 2023",
    "B-Metrics Sep 2019–Oct 2020 Biomechanical Data Engineer",
    "Thomson Reuters Feb 2025–May 2026 Data Engineer (Contract)",
    "Worky Jun 2024–Sep 2024 Data Product Developer (Contract)",
    "Grupo Homa Real Estate Developers Jan 2022–Jan 2023 Data Solutions Architect (Contract)",
  ];
  const careerByVariant = {
    "senior-data-engineer": seniorCareer,
    "forward-deployed-engineer": fdeCareer,
    "data-leadership": leadershipCareer,
  };

  for (const variant of RESUME_VARIANTS) {
    const requiredCareer = careerByVariant[variant.id];
    for (const requiredText of [
      ...requiredCareer,
      "Authorized to work in Mexico, Spain, the United States, and the EU",
      "Open to remote roles",
      "Professional Experience",
      "Professional Experience (continued)",
      "Education",
    ]) {
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
        "Summary",
        "Technical Skills",
        "Professional Experience",
        "Professional Experience (continued)",
        "Consulting Projects",
        "Education",
        "Certifications",
        "Languages",
      ],
      evidence: [
        "first fully automated ingestion system",
        "Created Beam frameworks",
        "Codified Dataflow jobs, BigQuery resources, monitoring, and deployment infrastructure in Terraform",
        "dimensional modeling and star schemas",
        "integrations with Zendesk, CDPs, and marketing tools",
        "observability layers",
        "streaming latency below one second",
        "pipeline costs by up to 60%",
        "MCP server over Cube Core",
        "Agent Development Kit",
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

    assert.equal(rejects("Managed the data engineering team of 12 engineers."), true);
    assert.equal(rejects("Managed a team of 12."), true);
    assert.equal(rejects("Led 8 direct reports in the consultancy."), true);
    assert.equal(
      rejects("Enabled 50+ people across six teams—and growing—to use the workflow."),
      false,
    );
  }
});

test("limits the FDE target title to the headline occurrence", () => {
  const fdeVariant = RESUME_VARIANTS.find(({ id }) => id === "forward-deployed-engineer");
  assert.deepEqual(fdeVariant.maxTextOccurrences, [
    { text: "Forward Deployed Engineer", max: 1 },
  ]);
});
