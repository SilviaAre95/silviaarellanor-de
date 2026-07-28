import assert from "node:assert/strict";
import { mkdtemp, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  assertRequiredTools,
  parseFontRows,
  parsePdfInfo,
  validateResumePdf,
} from "./validate-resume.mjs";
import { RESUME_VARIANTS } from "./config.mjs";

const validInfo = `Pages: 2
Page size: 612 x 792 pts (letter)
`;

const validFonts = `name type encoding emb sub uni object ID
AAAAAA+TeXGyreHeros CID TrueType Identity-H yes yes yes 12 0
`;

const validUrls = `Page  Type          URL
   1  Annotation    mailto:silvia.datadev@gmail.com
   1  Annotation    https://www.silviadata.dev
   1  Annotation    https://www.linkedin.com/in/silvia-arellano-de
   1  Annotation    tel:+529871174186
   1  Annotation    tel:+34603990662
`;

const visibleContacts = `linkedin.com/in/silvia-arellano-de
silvia.datadev@gmail.com
www.silviadata.dev
+52 987 117 4186
+34 603 990 662`;

function pdfRunner(extractedText) {
  return async (command, args) => {
    if (command === "pdfinfo" && args[0] === "-url") return validUrls;
    if (command === "pdfinfo") return validInfo;
    if (command === "pdffonts") return validFonts;
    if (command === "pdftotext") return extractedText;
    throw new Error(`Unexpected command: ${command}`);
  };
}

test("parses two-page US Letter metadata", () => {
  assert.deepEqual(parsePdfInfo(validInfo), {
    pages: 2,
    width: 612,
    height: 792,
  });
});

test("rejects a font without embedding or Unicode mapping", () => {
  const rows = parseFontRows(
    "AAAAAA+TeXGyreHeros CID TrueType Identity-H no no no 12 0",
  );
  assert.equal(rows[0].embedded, false);
  assert.equal(rows[0].unicode, false);
});

test("ignores the pdffonts table separator when parsing embedded fonts", () => {
  const rows = parseFontRows(`name type encoding emb sub uni object ID
------------------------------------ ----------------- ---------------- --- --- --- ---------
TeXGyreHeros CID Type 0C Identity-H yes yes yes 12 0
`);

  assert.deepEqual(rows, [
    { embedded: true, subset: true, unicode: true, object: "12", id: "0" },
  ]);
});

test("reports the variant when required extracted text is absent", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: ["Silvia Arellano Romero", "Required phrase"],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return "https://www.silviadata.dev";
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "Silvia Arellano Romero";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /senior-data-engineer.*Required phrase/,
  );
});

test("accepts required text whose PDF presentation is uppercase", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: ["Senior Data Engineer"] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("SENIOR DATA ENGINEER"),
    }),
  );
});

test("accepts required text across PDF line and spacing changes", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: ["Lead Data Engineer | Playtomic Oct 2025–Present"],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("LEAD   DATA ENGINEER | PLAYTOMIC\n\n\tOCT 2025–PRESENT"),
    }),
  );
});

test("rejects abbreviated visible contact destinations", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: [
          "linkedin.com/in/silvia-arellano-de",
          "www.silviadata.dev",
        ],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("LinkedIn\nsilviadata.dev"),
    }),
    /\[senior-data-engineer\].*linkedin\.com\/in\/silvia-arellano-de/,
  );
});

test("accepts complete visible contact destinations", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: [
          "linkedin.com/in/silvia-arellano-de",
          "silvia.datadev@gmail.com",
          "www.silviadata.dev",
          "+52 987 117 4186",
          "+34 603 990 662",
        ],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner(visibleContacts),
    }),
  );
});

test("rejects Senior skills extracted outside the approved row-major order", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: [],
        requiredTextOrder: [
          "SQL",
          "BigQuery",
          "Cloud Computing",
          "IaC/Terraform/Pulumi",
          "ETL/ELT",
          "Data Visualization",
          "Python",
          "Orchestration/Airflow/Prefect",
        ],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner(
        "SQL BigQuery Cloud Computing IaC/Terraform/Pulumi ETL/ELT Data Visualization Beam/Flink/Spark Orchestration/Airflow/Prefect Python",
      ),
    }),
    /\[senior-data-engineer\].*extraction order.*Orchestration\/Airflow\/Prefect/,
  );
});

test("checks grid order using layout-aware PDF extraction", async () => {
  const requiredTextOrder = [
    "SQL",
    "BigQuery",
    "Cloud Computing",
    "IaC/Terraform/Pulumi",
    "ETL/ELT",
    "Data Visualization",
    "Python",
    "Orchestration/Airflow/Prefect",
  ];
  const rawColumnOrder =
    "SQL ETL/ELT Data Warehousing BigQuery Data Visualization Beam/Flink/Spark Cloud Computing Python IaC/Terraform/Pulumi Orchestration/Airflow/Prefect";
  const visualRowOrder = requiredTextOrder.join(" ");

  await assert.doesNotReject(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: [],
        requiredTextOrder,
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return validUrls;
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext" && args[0] === "-layout") return visualRowOrder;
        if (command === "pdftotext") return rawColumnOrder;
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
  );
});

test("accepts the saved Senior wording instead of post-Canva evidence", async () => {
  const seniorVariant = RESUME_VARIANTS.find(({ id }) => id === "senior-data-engineer");
  const savedSeniorText = `Silvia Arellano Romero
linkedin.com/in/silvia-arellano-de
silvia.datadev@gmail.com
+52 987 117 4186
+34 603 990 662
www.silviadata.dev
Authorized to work in Mexico, Spain, the United States, and the EU
Open to remote roles
Senior Data Engineer & Architect
Playtomic October 2025–Present Lead Data Engineer
Playtomic April 2024–Oct 2025 Global Senior Data Engineer
Siftia Data Company Feb 2023–April 2024 Data Engineer / Data Product Developer
MMI Business Consulting Oct 2020–Dec 2023 Partner & Database Engineer
Worky Jun 2022–Feb 2023 Data Engineer/Analyst
MatchCraft Feb 2021–Jul 2022 Business Data Engineer
B-Metrics Sept 2019–Oct 2020 Biomechanical Data Engineer
Thomson Reuters Feb 2025–May 2026 Data Engineer (Contract)
Worky June 2024–Sept 2024 Data Product Developer (Contractor)
GRUPO HOMA Real Estate Developers Jan 2022–Jan 2023 Data Solutions Architect (Contractor)
University of Chihuahua
Master’s Degree in Open Source Software
2018–2020
Emeritus University of Puebla
B.Sc. in Physics
2013–2018
Google Cloud Professional Data Engineer
Big Data and Machine Learning Fundamentals
Modernizing Data Lakes and Data Warehouses with Google Cloud
English - Fluent
Spanish - Native
Skills
SQL BigQuery Cloud Computing IaC/Terraform/Pulumi
ETL/ELT Data Visualization Python Orchestration/Airflow/Prefect
Professional Experience
Consulting Projects
Education
Certifications
Languages
I'm a data engineer with deep experience architecting and building scalable data infrastructure in GCP.
Reduced pipeline development time from weeks to a few days through an internal Beam framework and templated CI/CD.
Built Playtomic’s first fully automated data ingestion system in GCP, replacing Hevo with scalable pipelines using Dataflow, Pub/Sub, BigQuery, and Apache Beam.
1. Most Recent Project - BigQuery Data Warehouse Refactoring:
2. Main Responsibilities:
Geolocation Data Integration and Hashing Process.
Development of Data Pipelines and ETL Processes.
Audited digital ads data in MySQL and authored SQL reporting that informed strategy.
Processed and analyzed biomechanical data for national sports teams using Python.
Built streaming and batch data infrastructure using Fivetran, Datastream, and Dataflow.
Developed a custom, end-to-end data product in Power BI.
I created an end-to-end, user-friendly data product`;

  await assert.doesNotReject(
    validateResumePdf({
      variant: seniorVariant,
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner(savedSeniorText),
    }),
  );
});

test("rejects a Senior PDF that drops saved MatchCraft evidence", async () => {
  const seniorVariant = RESUME_VARIANTS.find(({ id }) => id === "senior-data-engineer");
  const savedSeniorTextWithoutMatchCraft = `Silvia Arellano Romero
linkedin.com/in/silvia-arellano-de
silvia.datadev@gmail.com
+52 987 117 4186
+34 603 990 662
www.silviadata.dev
Authorized to work in Mexico, Spain, the United States, and the EU
Open to remote roles
Senior Data Engineer & Architect
Playtomic October 2025–Present Lead Data Engineer
Playtomic April 2024–Oct 2025 Global Senior Data Engineer
Siftia Data Company Feb 2023–April 2024 Data Engineer / Data Product Developer
MMI Business Consulting Oct 2020–Dec 2023 Partner & Database Engineer
Worky Jun 2022–Feb 2023 Data Engineer/Analyst
MatchCraft Feb 2021–Jul 2022 Business Data Engineer
B-Metrics Sept 2019–Oct 2020 Biomechanical Data Engineer
Thomson Reuters Feb 2025–May 2026 Data Engineer (Contract)
Worky June 2024–Sept 2024 Data Product Developer (Contractor)
GRUPO HOMA Real Estate Developers Jan 2022–Jan 2023 Data Solutions Architect (Contractor)
University of Chihuahua
Master’s Degree in Open Source Software
2018–2020
Emeritus University of Puebla
B.Sc. in Physics
2013–2018
Google Cloud Professional Data Engineer
Big Data and Machine Learning Fundamentals
Modernizing Data Lakes and Data Warehouses with Google Cloud
English - Fluent
Spanish - Native
Skills
Professional Experience
Consulting Projects
Education
Certifications
Languages
I'm a data engineer with deep experience architecting and building scalable data infrastructure in GCP.
Reduced pipeline development time from weeks to a few days through an internal Beam framework and templated CI/CD.
Built Playtomic’s first fully automated data ingestion system in GCP, replacing Hevo with scalable pipelines using Dataflow, Pub/Sub, BigQuery, and Apache Beam.
1. Most Recent Project - BigQuery Data Warehouse Refactoring:
2. Main Responsibilities:
Geolocation Data Integration and Hashing Process.
Development of Data Pipelines and ETL Processes.
Processed and analyzed biomechanical data for national sports teams using Python.
Built streaming and batch data infrastructure using Fivetran, Datastream, and Dataflow.
Developed a custom, end-to-end data product in Power BI.
I created an end-to-end, user-friendly data product`;

  await assert.rejects(
    validateResumePdf({
      variant: seniorVariant,
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner(savedSeniorTextWithoutMatchCraft),
    }),
    /\[senior-data-engineer\].*Audited digital ads data in MySQL/,
  );
});

test("accepts an ASCII language separator rendered as a typographic dash", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: ["English - Fluent", "Spanish - Native"],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("English – Fluent\nSpanish – Native"),
    }),
  );
});

test("requires section labels as their own normalized PDF lines", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "senior-data-engineer",
        requiredText: [],
        requiredSections: ["Summary"],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("This paragraph mentions a summary but omits the section label."),
    }),
    /\[senior-data-engineer\].*section label: Summary/,
  );
});

test("rejects forbidden management headcount language", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "data-leadership",
        requiredText: [],
        forbiddenText: [
          {
            label: "management headcount language",
            pattern: /\bmanaged\b.{0,60}\bteam of \d+\s+engineers\b/i,
          },
        ],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("Managed the platform team of 12 engineers."),
    }),
    /\[data-leadership\].*management headcount language/,
  );
});

test("rejects a plain team-size management headcount from the real variant contract", async () => {
  const leadershipVariant = RESUME_VARIANTS.find(({ id }) => id === "data-leadership");

  await assert.rejects(
    validateResumePdf({
      variant: {
        id: leadershipVariant.id,
        requiredText: [],
        forbiddenText: leadershipVariant.forbiddenText,
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner("Managed a team of 12."),
    }),
    /\[data-leadership\].*management headcount language/,
  );
});

test("rejects an FDE title occurrence beyond the target headline", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: {
        id: "forward-deployed-engineer",
        requiredText: ["Forward Deployed Engineer"],
        maxTextOccurrences: [{ text: "Forward Deployed Engineer", max: 1 }],
      },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: pdfRunner(
        "FORWARD DEPLOYED ENGINEER - DATA & AI SYSTEMS\nForward Deployed Engineer | Playtomic",
      ),
    }),
    /\[forward-deployed-engineer\].*Forward Deployed Engineer.*maximum is 1/,
  );
});

test("accepts the canonical LinkedIn URL embedded by the resume sources", async () => {
  await assert.doesNotReject(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return validUrls;
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
  );
});

test("rejects a resume without both linked phone numbers", async () => {
  const variant = { id: "senior-data-engineer", requiredText: [] };
  await assert.rejects(
    validateResumePdf({
      variant,
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return validUrls.replace("tel:+34603990662", "");
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /tel:\+34603990662/,
  );
});

test("rejects a longer phone URL containing the required Mexico number", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return validUrls.replace("tel:+529871174186", "tel:+5298711741860");
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /tel:\+529871174186/,
  );
});

test("rejects a phone URL with an added query suffix", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return validUrls.replace("tel:+34603990662", "tel:+34603990662?ext=1");
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /tel:\+34603990662/,
  );
});

test("rejects an unexpected sixth PDF link", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return `${validUrls}   2  Annotation    https://tracking.example/resume\n`;
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /unexpected URL.*tracking\.example/,
  );
});

test("rejects a duplicated PDF link record", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") {
          return `${validUrls}   2  Annotation    mailto:silvia.datadev@gmail.com\n`;
        }
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /exactly once.*mailto:silvia\.datadev@gmail\.com/,
  );
});

test("prefixes PDF-tool failures with the variant ID", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command) => {
        if (command === "pdfinfo") throw new Error("pdfinfo unavailable");
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    (error) => error.message.startsWith("[senior-data-engineer] pdfinfo unavailable"),
  );
});

test("rejects a missing PDF before invoking system tools", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "missing-resume-"));
  const pdfPath = join(directory, "resume.pdf");
  t.after(() => rm(directory, { recursive: true, force: true }));

  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath,
      logText: "",
    }),
    /\[senior-data-engineer\].*does not exist/,
  );
});

test("rejects a zero-byte PDF", async (t) => {
  const pdfPath = join(tmpdir(), `empty-resume-${process.pid}.pdf`);
  await writeFile(pdfPath, "");
  t.after(() => unlink(pdfPath));

  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: [] },
      pdfPath,
      logText: "",
    }),
    /\[senior-data-engineer\].*empty/,
  );
});

test("rejects a PDF with the wrong page count", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "data-leadership", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command) => {
        if (command === "pdfinfo") return "Pages: 1\nPage size: 612 x 792 pts (letter)\n";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /\[data-leadership\].*two US Letter pages/,
  );
});

test("rejects PDFs with unembedded fonts", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "data-leadership", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return "";
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") {
          return "name type encoding emb sub uni object ID\nBadFont Type 1 Custom no yes yes 12 0\n";
        }
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /\[data-leadership\].*not embedded/,
  );
});

test("rejects PDFs without all required hyperlinks", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "data-leadership", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return "https://www.silviadata.dev";
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return "";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /\[data-leadership\].*mailto:silvia\.datadev@gmail\.com/,
  );
});

test("rejects a text layer whose ligatures defeat ATS keyword search", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: ["repeatable and efficient"] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return validUrls;
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        // TeX Gyre Heros maps its ffi glyph to U+FB00, so "efficient"
        // extracts as "e" + U+FB00 + "icient".
        if (command === "pdftotext") return "making deployments repeatable and eﬀicient.";
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
    /\[senior-data-engineer\].*ligature that ATS keyword search cannot match/,
  );
});

test("accepts a text layer that spells ligature words as plain letters", async () => {
  const extracted = [
    "making deployments repeatable and efficient.",
    ...visibleContacts.split(/\r?\n/),
  ].join("\n");

  await assert.doesNotReject(
    validateResumePdf({
      variant: { id: "senior-data-engineer", requiredText: ["repeatable and efficient"] },
      pdfPath: "/tmp/resume.pdf",
      logText: "",
      run: async (command, args) => {
        if (command === "pdfinfo" && args[0] === "-url") return validUrls;
        if (command === "pdfinfo") return validInfo;
        if (command === "pdffonts") return validFonts;
        if (command === "pdftotext") return extracted;
        throw new Error(`Unexpected command: ${command}`);
      },
    }),
  );
});

test("rejects PDFs with an overfull TeX box warning", async () => {
  await assert.rejects(
    validateResumePdf({
      variant: { id: "data-leadership", requiredText: [] },
      pdfPath: "/tmp/resume.pdf",
      logText: "Overfull \\hbox (1.0pt too wide) in paragraph",
      run: async () => validInfo,
    }),
    /\[data-leadership\].*Overfull \\hbox/,
  );
});

test("requires the approved compiler and available Poppler commands", async () => {
  await assert.doesNotReject(
    assertRequiredTools(async (command) => {
      if (command === "tectonic") return "tectonic 0.16.9";
      if (["pdfinfo", "pdftotext", "pdffonts"].includes(command)) return "available";
      throw new Error(`Unexpected command: ${command}`);
    }),
  );

  await assert.doesNotReject(
    assertRequiredTools(async (command) => {
      if (command === "tectonic") return "Tectonic 0.16.9";
      if (["pdfinfo", "pdftotext", "pdffonts"].includes(command)) return "available";
      throw new Error(`Unexpected command: ${command}`);
    }),
  );

  await assert.rejects(
    assertRequiredTools(async (command) => {
      if (command === "tectonic") return "tectonic 0.16.8";
      return "available";
    }),
    /tectonic 0\.16\.9/,
  );
});
