import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { createServer } from "vite";

const approvedLongTermExperience = [
  ["Oct 2025 – Present", "Lead Data Engineer", "Playtomic"],
  ["Apr 2024 – Oct 2025", "Global Senior Data Engineer", "Playtomic"],
  ["Feb 2023 – Apr 2024", "Data Engineer / Data Product Developer", "Siftia Data Company"],
  ["Jun 2022 – Feb 2023", "Data Engineer / Analyst", "Worky"],
  ["Feb 2021 – Jul 2022", "Business Data Engineer", "MatchCraft"],
  ["Oct 2020 – Dec 2023", "Partner & Database Engineer", "MMI Business Consulting"],
  ["Sep 2019 – Oct 2020", "Biomechanical Data Engineer", "B-Metrics"],
];

const approvedContractExperience = [
  ["Feb 2025 – May 2026", "Data Engineer (Contract)", "Thomson Reuters"],
  ["Jun 2024 – Sep 2024", "Data Product Developer (Contract)", "Worky"],
  [
    "Jan 2022 – Jan 2023",
    "Data Solutions Architect (Contract)",
    "Grupo Homa Real Estate Developers",
  ],
];

function visibleText(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replace(/\s+/g, " ")
    .trim();
}

test("About and Experience render the exact approved chronology", async () => {
  const server = await createServer({
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true },
  });

  try {
    for (const page of ["About", "Experience"]) {
      const { default: Page } = await server.ssrLoadModule(
        `/src/pages/${page}/${page}.jsx`,
      );
      const text = visibleText(renderToStaticMarkup(Page()));

      for (const entry of [...approvedLongTermExperience, ...approvedContractExperience]) {
        assert.ok(text.includes(entry.join(" ")), `${page} must render ${entry.join(" | ")}`);
      }
    }
  } finally {
    await server.close();
  }
});

test("About and Experience both consume the shared experience data module", async () => {
  for (const page of ["About", "Experience"]) {
    const source = await readFile(
      new URL(`../../src/pages/${page}/${page}.jsx`, import.meta.url),
      "utf8",
    );
    const sharedImport = source.match(
      /import\s*\{([^}]*)\}\s*from\s*["']@\/data\/experience["']/,
    );

    assert.ok(sharedImport, `${page} must import the shared experience data`);
    assert.match(sharedImport[1], /\blongTermExperience\b/);
    assert.match(sharedImport[1], /\bcontractExperience\b/);
  }
});
