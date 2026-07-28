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

const canonicalCareerText = [
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
      ...canonicalCareerText,
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
    requiredSections: [
      "Summary",
      "Technical Skills",
      "Professional Experience",
      "Professional Experience (continued)",
      "Selected Consulting",
      "Education",
      "Certification",
    ],
    requiredEvidence: [
      "complete data-ingestion infrastructure",
      "reusable Beam frameworks",
      "Codified the data platform in Terraform",
      "observability layers",
      "live data products inside the application",
      "MCP server over a Cube Core semantic layer",
      "Agent Development Kit",
    ],
  }),
  variantContract({
    id: "forward-deployed-engineer",
    source: "variants/forward-deployed-engineer.tex",
    output: "resume/build/silvia-arellano-forward-deployed-engineer.pdf",
    headline: "Forward Deployed Engineer - Data & AI Systems",
    publish: false,
    requiredSections: [
      "Summary",
      "Data & AI Capabilities",
      "Selected Forward-Deployed Impact",
      "Professional Experience",
      "Professional Experience (continued)",
      "Consulting Engagements",
      "Education",
    ],
    requiredEvidence: [
      "MCP server over a Cube Core semantic layer",
      "50+ people across six teams",
      "all new dashboards independently",
      "Agent Development Kit",
      "Owned consulting engagements from discovery and scoping",
      "Power BI data product end to end",
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
      "complete data-ingestion infrastructure",
      "Codified the data platform in Terraform",
      "reusable Beam frameworks",
      "observability layers",
      "50+ people across six teams",
    ],
  }),
];
