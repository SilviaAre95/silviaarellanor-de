export const TECTONIC_VERSION = "0.16.9";
export const PUBLIC_RESUME_PATH = "public/silvia-arellano-cv.pdf";

const commonRequiredText = [
  "Silvia Arellano Romero",
  "silvia.datadev@gmail.com",
  "+52 987 117 4186",
  "+34 603 990 662",
  "silviadata.dev",
  "linkedin.com/in/silvia-arellano-de",
  "Authorized to work in Mexico, Spain, the United States, and the EU",
];

export const RESUME_VARIANTS = [
  {
    id: "senior-data-engineer",
    source: "variants/senior-data-engineer.tex",
    output: "resume/build/silvia-arellano-senior-data-engineer.pdf",
    headline: "Senior Data Engineer & GCP Data Architect",
    publish: true,
    requiredText: [...commonRequiredText, "Senior Data Engineer & GCP Data Architect"],
  },
  {
    id: "forward-deployed-engineer",
    source: "variants/forward-deployed-engineer.tex",
    output: "resume/build/silvia-arellano-forward-deployed-engineer.pdf",
    headline: "Forward Deployed Engineer - Data & AI Systems",
    publish: false,
    requiredText: [...commonRequiredText, "Forward Deployed Engineer - Data & AI Systems"],
  },
  {
    id: "data-leadership",
    source: "variants/data-leadership.tex",
    output: "resume/build/silvia-arellano-data-leadership.pdf",
    headline: "Data Engineering Leader & Architect",
    publish: false,
    requiredText: [...commonRequiredText, "Data Engineering Leader & Architect"],
  },
];
