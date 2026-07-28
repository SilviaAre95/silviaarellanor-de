export const TECTONIC_VERSION = "0.16.9";
export const PUBLIC_RESUME_PATH = "public/silvia-arellano-cv.pdf";

export const SHARED_ROLE_DATE_TEXT = [
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
];

const sharedEducationText = [
  "University of Chihuahua",
  "Master’s Degree in Open Source Software",
  "2018–2020",
  "Emeritus University of Puebla",
  "B.Sc. in Physics",
  "2013–2018",
];

const sharedCredentialAndLanguageText = [
  "Google Cloud Professional Data Engineer",
  "Big Data and Machine Learning Fundamentals",
  "Modernizing Data Lakes and Data Warehouses with Google Cloud",
  "English - Fluent",
  "Spanish - Native",
];

const commonRequiredText = [
  "Silvia Arellano Romero",
  "6+ years",
  "silvia.datadev@gmail.com",
  "+52 987 117 4186",
  "+34 603 990 662",
  "www.silviadata.dev",
  "linkedin.com/in/silvia-arellano-de",
  "Authorized to work in Mexico, Spain, the United States, and the EU",
  "Open to remote roles",
  ...SHARED_ROLE_DATE_TEXT,
  ...sharedEducationText,
  ...sharedCredentialAndLanguageText,
];

const seniorCurrentRequiredText = [
  "Silvia Arellano Romero", "silvia.datadev@gmail.com", "+52 987 117 4186", "+34 603 990 662", "www.silviadata.dev", "linkedin.com/in/silvia-arellano-de",
  "Authorized to work in Mexico, Spain, the United States, and the EU", "Open to remote roles", "Senior Data Engineer & Architect",
  "Playtomic October 2025–Present Lead Data Engineer", "Playtomic April 2024–Oct 2025 Global Senior Data Engineer",
  "Siftia Data Company Feb 2023–April 2024 Data Engineer / Data Product Developer", "MMI Business Consulting Oct 2020–Dec 2023 Partner & Database Engineer",
  "Worky Jun 2022–Feb 2023 Data Engineer/Analyst", "MatchCraft Feb 2021–Jul 2022 Business Data Engineer", "B-Metrics Sept 2019–Oct 2020 Biomechanical Data Engineer",
  "Thomson Reuters Feb 2025–May 2026 Data Engineer (Contract)", "Worky June 2024–Sept 2024 Data Product Developer (Contractor)",
  "GRUPO HOMA Real Estate Developers Jan 2022–Jan 2023 Data Solutions Architect (Contractor)", "University of Chihuahua", "Master’s Degree in Open Source Software",
  "2018–2020", "Emeritus University of Puebla", "B.Sc. in Physics", "2013–2018", "Google Cloud Professional Data Engineer",
  "Big Data and Machine Learning Fundamentals", "Modernizing Data Lakes and Data Warehouses with Google Cloud", "English - Fluent", "Spanish - Native",
];

const spelledCount = String.raw`(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|(?:twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(?:[- ](?:one|two|three|four|five|six|seven|eight|nine))?)`;
// Bare magnitude words ("a dozen engineers", "hundreds of reports") state a
// headcount just as plainly as a numeral does.
const magnitudeCount = String.raw`(?:(?:a|several|many|multiple|few)[- ]+)?(?:couple|dozens?|hundreds?|thousands?)`;
const count = String.raw`(?:\d+\+?|${spelledCount}|${magnitudeCount})`;
const countedGroup = String.raw`(?:engineers?|developers?|analysts?|people|persons?|members?|staff|headcount|(?:direct[- ]+)?reports?)`;
// Gaps are bounded by sentence punctuation: a bare `.` lets "led" in one
// sentence pair with a headcount in the next, which blocks valid content.
const within = (n) => String.raw`[^.;]{0,${n}}`;
const managementVerb = String.raw`\b(?:managed|led|oversaw|supervised|directed)\b`;

export const MANAGEMENT_HEADCOUNT_RULES = [
  {
    label: "management headcount language",
    pattern: new RegExp(
      String.raw`${managementVerb}${within(80)}\bteam(?:\s+|-)+of(?:\s+|-)+${count}\b`,
      "i",
    ),
  },
  {
    label: "management headcount language",
    pattern: new RegExp(
      String.raw`${managementVerb}${within(40)}\b${count}\s+(?:of\s+)?${countedGroup}\b`,
      "i",
    ),
  },
  {
    label: "management headcount language",
    pattern: new RegExp(
      String.raw`${managementVerb}${within(60)}\b${count}-(?:person|engineer|developer|analyst|member|staff|report|strong)\s+(?:team|org|group|function)\b`,
      "i",
    ),
  },
  {
    // Count after the noun: "managed engineers (12)", "led staff of 30".
    label: "management headcount language",
    pattern: new RegExp(
      String.raw`${managementVerb}${within(40)}\b${countedGroup}\b(?:\s+(?:of|numbering|totalling|totaling))?[^.;a-z]{0,12}${count}\b`,
      "i",
    ),
  },
];

// requiredText uses substring matching, so a document claiming "16+ years"
// satisfies the required "6+ years". Only the supported claim may appear.
export const TENURE_RULES = [
  {
    label: "unsupported tenure claim",
    pattern: /\b(?!6\+\s*years\b)\d+\+?\s*years\b(?=\s+of\s+experience)/i,
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
  requiredTextOrder = [],
  requiredBaseText = commonRequiredText,
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
      ...requiredBaseText,
      ...requiredSections,
      ...requiredEvidence,
      headline,
    ],
    forbiddenText: [...MANAGEMENT_HEADCOUNT_RULES, ...TENURE_RULES],
    maxTextOccurrences,
    requiredTextOrder,
  };
}

export const RESUME_VARIANTS = [
  variantContract({
    id: "senior-data-engineer",
    source: "variants/senior-data-engineer.tex",
    output: "resume/build/silvia-arellano-senior-data-engineer.pdf",
    headline: "Senior Data Engineer & Architect",
    publish: true,
    requiredBaseText: seniorCurrentRequiredText,
    requiredSections: [
      "Skills",
      "Professional Experience",
      "Consulting Projects",
      "Education",
      "Certifications",
      "Languages",
    ],
    requiredEvidence: [
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
      "Google Cloud Professional Data Engineer",
      "English - Fluent",
      "Spanish - Native",
    ],
    // Every cell of the grid, in visible row-major order. Covering only the
    // first rows let later rows be deleted without failing a single test.
    requiredTextOrder: [
      "SQL",
      "BigQuery",
      "Cloud Computing",
      "IaC/Terraform/Pulumi",
      "ETL/ELT",
      "Data Visualization",
      "Python",
      "Orchestration/Airflow/Prefect",
      "Data Warehousing",
      "Beam/Flink/Spark",
      "Firestore",
      "SQLX/Dataform/DBT",
      "SQL/NoSQL Management",
      "Git",
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
    requiredTextOrder: [
      "MCP",
      "semantic layers",
      "Cube Core",
      "Google Agent Development Kit",
      "Claude",
      "ChatGPT",
      "Cursor",
      "Discovery",
      "scoping",
      "solution design",
      "enablement",
      "production support",
      "pre-sales",
      "GCP",
      "BigQuery",
      "Dataflow",
      "Pub/Sub",
      "Python",
      "SQL",
      "Node.js",
      "APIs",
      "GraphQL",
      "reverse ETL",
      "Looker",
      "Looker Studio",
      "Power BI",
      "data modeling",
      "system integrations",
    ],
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
      "Consulting",
      "Education",
      "Certifications",
      "Languages",
    ],
    requiredEvidence: [
      "Managed the data engineering team at Playtomic",
      "Managed a client-facing data engineering team",
      "Led the development team within the consultancy",
      "Reusable data-product framework",
      "Infrastructure as code",
      "Sustained engineering agents",
      "50+ people across six teams",
      "Streaming and batch platform",
    ],
    requiredTextOrder: [
      "Engineering management",
      "mentoring",
      "platform strategy",
      "architecture",
      "stakeholder communication",
      "Delivery frameworks",
      "technical standards",
      "observability",
      "incident triage",
      "data quality",
      "GCP",
      "BigQuery",
      "Dataflow",
      "Apache Beam",
      "infrastructure as code",
      "CI/CD",
      "cost optimization",
    ],
  }),
];

export function createApplicationResumeContract({
  id,
  baseId,
  headline,
  requiredSections = [],
  requiredEvidence = [],
}) {
  const base = RESUME_VARIANTS.find((variant) => variant.id === baseId);
  if (!base) {
    throw new Error(`Unknown resume base variant: ${baseId}`);
  }
  if (typeof id !== "string" || id.length === 0) {
    throw new Error("Application resume contract requires an id");
  }
  if (typeof headline !== "string" || headline.length === 0) {
    throw new Error("Application resume contract requires a headline");
  }

  const fdeHeadlineOccurrences = headline.match(/\bForward Deployed Engineer\b/gi)?.length ?? 0;
  return {
    id,
    baseId,
    headline,
    requiredSections: [...requiredSections],
    requiredEvidence: [...requiredEvidence],
    requiredText: [
      ...commonRequiredText,
      ...requiredSections,
      ...requiredEvidence,
      headline,
    ],
    forbiddenText: [...MANAGEMENT_HEADCOUNT_RULES, ...TENURE_RULES],
    maxTextOccurrences: [
      {
        text: "Forward Deployed Engineer",
        max: Math.min(fdeHeadlineOccurrences, 1),
      },
    ],
  };
}
