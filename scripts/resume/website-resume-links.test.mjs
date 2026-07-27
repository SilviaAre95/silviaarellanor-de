import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const seniorResumeHref = 'href="/silvia-arellano-cv.pdf"';
const seniorResumeDownload = 'download="silvia-arellano-senior-data-engineer.pdf"';
const seniorResumeText = "Download Senior Data Engineer résumé";

async function resumeLinkSource(page) {
  const source = await readFile(new URL(`../../src/pages/${page}/${page}.jsx`, import.meta.url), "utf8");
  return source.match(/<a[\s\S]*?href="\/silvia-arellano-cv\.pdf"[\s\S]*?<\/a>/)?.[0] ?? "";
}

for (const page of ["About", "Experience"]) {
  test(`${page} directly downloads the public Senior Data Engineer resume`, async () => {
    const link = await resumeLinkSource(page);

    assert.match(link, new RegExp(seniorResumeHref));
    assert.match(link, new RegExp(seniorResumeDownload));
    assert.match(link, new RegExp(seniorResumeText));
    assert.doesNotMatch(link, /target=|rel=/);
  });
}
