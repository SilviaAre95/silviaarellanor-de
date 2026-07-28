export const TECTONIC_VERSION = "0.16.9";
export const PUBLIC_RESUME_PATH = "public/silvia-arellano-cv.pdf";

const commonRequiredText = [
  "Silvia Arellano Romero",
  "silvia.datadev@gmail.com",
  "+52 987 117 4186",
  "+34 603 990 662",
  "silviadata.dev",
  "LinkedIn",
  "Authorized to work in Mexico, Spain, the United States, and the EU",
  "Open to remote roles",
];

const seniorCareerText = [
  "Playtomic Oct 2025–Present Lead Data Engineer",
  "Playtomic Apr 2024–Oct 2025 Global Senior Data Engineer",
  "Siftia Data Company Feb 2023–Apr 2024 Data Engineer / Data Product Developer",
  "Worky Jun 2022–Feb 2023 Data Engineer / Analyst",
  "MatchCraft Feb 2021–Jul 2022 Business Data Engineer",
  "MMI Business Consulting Oct 2020–Dec 2023 Partner & Database Engineer",
  "B-Metrics Sep 2019–Oct 2020 Biomechanical Data Engineer",
  "Thomson Reuters Feb 2025–May 2026 Data Engineer (Contract)",
];

const fdeCareerText = [
  ...seniorCareerText,
  "Worky Jun 2024–Sep 2024 Data Product Developer (Contract)",
  "Grupo Homa Real Estate Developers Jan 2022–Jan 2023 Data Solutions Architect (Contract)",
];

// The untouched private variants use larger leading, which makes pdftotext
// extract each role before its right-aligned date. Task 6 owns migrating the
// remaining Leadership composition and validation order.
const privateVariantCareerText = [
  "Playtomic Lead Data Engineer Oct 2025–Present",
  "Playtomic Global Senior Data Engineer Apr 2024–Oct 2025",
  "Siftia Data Company Data Engineer / Data Product Developer Feb 2023–Apr 2024",
  "Worky Data Engineer / Analyst Jun 2022–Feb 2023",
  "MatchCraft Business Data Engineer Feb 2021–Jul 2022",
  "MMI Business Consulting Partner & Database Engineer Oct 2020–Dec 2023",
  "B-Metrics Biomechanical Data Engineer Sep 2019–Oct 2020",
  "Thomson Reuters Data Engineer (Contract) Feb 2025–May 2026",
];

const managementHeadcountRules = [
  {
    label: "management headcount language",
    pattern: /\b(?:managed|led|oversaw)\b.{0,80}\bteam of \d+\+?\b/i,
  },
  {
    label: "management headcount language",
    pattern: /\b(?:managed|led|oversaw)\s+\d+\+?\s+(?:engineers?|people|members?|direct reports?)\b/i,
  },
  {
    label: "management headcount language",
    pattern: /\b(?:managed|led|oversaw)\b.{0,60}\b\d+\+?-(?:person|engineer|member)\s+team\b/i,
  },
];

function variantContract({
  id,
  source,
  output,
  headline,
  publish,
  requiredSections,
  requiredEvidence,
  careerText = privateVariantCareerText,
  maxTextOccurrences = [],
}) {
  return {
    id,
    source,
    output,
    headline,
    publish,
    requiredSections,
    requiredEvidence,
    requiredText: [
      ...commonRequiredText,
      ...careerText,
      ...requiredSections,
      ...requiredEvidence,
      headline,
    ],
    forbiddenText: managementHeadcountRules,
    maxTextOccurrences,
  };
}

export const RESUME_VARIANTS = [
  variantContract({
    id: "senior-data-engineer",
    source: "variants/senior-data-engineer.tex",
    output: "resume/build/silvia-arellano-senior-data-engineer.pdf",
    headline: "Senior Data Engineer & GCP Data Architect",
    publish: true,
    careerText: seniorCareerText,
    requiredSections: [
      "Summary",
      "Technical Skills",
      "Professional Experience",
      "Professional Experience (continued)",
      "Consulting Projects",
      "Education",
      "Certifications",
      "Languages",
    ],
    requiredEvidence: [
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
  }),
  variantContract({
    id: "forward-deployed-engineer",
    source: "variants/forward-deployed-engineer.tex",
    output: "resume/build/silvia-arellano-forward-deployed-engineer.pdf",
    headline: "Forward Deployed Engineer - Data & AI Systems",
    publish: false,
    careerText: fdeCareerText,
    requiredSections: [
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
    requiredEvidence: [
      "discovery and scoping",
      "MCP server over Cube Core",
      "50+ people across six teams",
      "all new dashboards independently",
      "Agent Development Kit",
      "client reporting and migration",
      "Productized Power BI delivery",
      "Business automation and warehousing",
    ],
    maxTextOccurrences: [{ text: "Forward Deployed Engineer", max: 1 }],
  }),
  variantContract({
    id: "data-leadership",
    source: "variants/data-leadership.tex",
    output: "resume/build/silvia-arellano-data-leadership.pdf",
    headline: "Data Engineering Leader & Architect",
    publish: false,
    requiredSections: [
      "Leadership Summary",
      "Leadership & Architecture Strengths",
      "Professional Experience",
      "Professional Experience (continued)",
      "Selected Technical & Organizational Impact",
      "Consulting",
      "Education",
    ],
    requiredEvidence: [
      "Managed the data engineering team at Playtomic",
      "Managed a client-facing data engineering team",
      "Led the development team within the consultancy",
      "first fully automated ingestion system",
      "Codified Dataflow jobs, BigQuery resources, monitoring, and deployment infrastructure in Terraform",
      "Created Beam frameworks",
      "observability layers",
      "50+ people across six teams",
    ],
  }),
];
