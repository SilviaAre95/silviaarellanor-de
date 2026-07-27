import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { createServer } from "vite";

const seniorResumeText = "Download Senior Data Engineer résumé";

async function renderPage(page) {
  const server = await createServer({
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true },
  });

  try {
    const { default: Page } = await server.ssrLoadModule(`/src/pages/${page}/${page}.jsx`);
    return renderToStaticMarkup(Page());
  } finally {
    await server.close();
  }
}

for (const page of ["About", "Experience"]) {
  test(`${page} directly downloads the public Senior Data Engineer resume`, async () => {
    const html = await renderPage(page);
    const resumeAnchors = (html.match(/<a\b[^>]*>/g) ?? []).filter((anchor) => (
      /\bhref="\/silvia-arellano-cv\.pdf"/.test(anchor)
    ));

    assert.equal(resumeAnchors.length, 1);
    assert.match(
      resumeAnchors[0],
      /\bdownload="silvia-arellano-senior-data-engineer\.pdf"/,
    );
    assert.doesNotMatch(resumeAnchors[0], /\b(?:target|rel)=/);
    assert.ok(html.includes(seniorResumeText));
  });
}
