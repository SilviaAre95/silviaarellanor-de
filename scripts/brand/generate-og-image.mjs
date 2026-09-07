import { chromium } from 'playwright-core';
import fs from 'fs';

// Regenerates public/og-image.jpg from the mark, the §5 wave and Archivo.
//
// Usage: npm i --no-save playwright-core && node scripts/brand/generate-og-image.mjs
// Not part of the build: playwright is deliberately not a project dependency,
// so `npm ci` and CI are unaffected. Run it by hand when the mark changes.
//
// Archivo is fetched and inlined as a data URI at run time, so the render never
// depends on a live font CDN mid-screenshot and the font binary stays out of
// the repo. Set ARCHIVO_CSS to a local @font-face file to work offline.
import path from 'path';
import { fileURLToPath } from 'url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.join(HERE, '..', '..', 'public');

async function archivoFace() {
  if (process.env.ARCHIVO_CSS) return fs.readFileSync(process.env.ARCHIVO_CSS, 'utf8');
  const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36';
  const css = await (await fetch(
    'https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&display=swap',
    { headers: { 'User-Agent': UA } })).text();
  // Archivo ships as a variable font, so one latin file covers 100-900.
  const block = [...css.matchAll(/\/\* (\S+) \*\/\s*@font-face \{(.*?)\}/gs)]
    .find((m) => m[1] === 'latin');
  if (!block) throw new Error('no latin subset in the Archivo css');
  const url = block[2].match(/url\((https:\/\/[^)]+)\)/)[1];
  const woff2 = Buffer.from(await (await fetch(url)).arrayBuffer());
  return `@font-face{font-family:'Archivo';font-style:normal;font-weight:100 900;`
    + `src:url(data:font/woff2;base64,${woff2.toString('base64')}) format('woff2')}`;
}

const fontCss = await archivoFace();
const mark = fs.readFileSync(`${PUB}/brand/logo-swallow-dark.svg`, 'utf8')
  .replace('<svg ', '<svg style="width:100%;height:100%;display:block" ');

// The wave, verbatim from brand spec §5.
const wave = `<svg viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice"
   style="position:absolute;left:0;right:0;bottom:0;width:100%;height:34%;display:block">
  <defs>
    <filter id="g" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <filter id="s"><feGaussianBlur stdDeviation="1.2"/></filter>
  </defs>
  <g fill="#F2C13D">
    <circle cx="250" cy="72" r="4"/><circle cx="336" cy="34" r="2.5"/>
    <circle cx="410" cy="96" r="5"/><circle cx="472" cy="46" r="3"/>
    <circle cx="198" cy="128" r="3"/><circle cx="548" cy="96" r="2.5"/>
    <circle cx="296" cy="156" r="6"/><circle cx="130" cy="94" r="2.5"/>
    <circle cx="616" cy="136" r="3.5"/><circle cx="376" cy="192" r="3"/>
    <circle cx="700" cy="108" r="2.5"/><circle cx="90" cy="168" r="4"/>
  </g>
  <path d="M0,190 C210,60 402,20 588,68 C790,120 940,252 1200,204 L1200,520 L0,520 Z" fill="#F2C13D" filter="url(#s)"/>
  <path d="M96,202 C238,66 428,34 596,94 C700,130 772,196 812,250 C744,180 636,128 520,124 C374,118 214,150 96,202 Z" fill="#0E2019" opacity=".5"/>
  <path d="M0,268 C232,154 434,116 620,170 C824,228 968,338 1200,292 L1200,520 L0,520 Z" fill="#4FA97F"/>
  <path d="M0,346 C252,250 462,212 650,268 C856,328 996,414 1200,374 L1200,520 L0,520 Z" fill="#F2C13D" opacity=".93"/>
  <path d="M0,424 C272,348 490,310 682,364 C888,420 1020,486 1200,452 L1200,520 L0,520 Z" fill="#173A2C"/>
  <path d="M0,478 C296,422 512,392 706,428 C902,464 1032,502 1200,486 L1200,520 L0,520 Z" fill="#0E2019"/>
  <g fill="#F4F2E7" opacity=".7">
    <circle cx="704" cy="206" r="3"/><circle cx="776" cy="240" r="2"/>
    <circle cx="456" cy="152" r="2.5"/><circle cx="884" cy="288" r="2.5"/>
    <circle cx="304" cy="188" r="2"/>
  </g>
  <rect width="1200" height="520" filter="url(#g)" opacity=".4" style="mix-blend-mode:overlay"/>
</svg>`;

const html = `<style>
${fontCss}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1200px;height:630px;overflow:hidden;background:#0E2019;color:#F4F2E7;
  font-family:"Archivo",Helvetica,Arial,sans-serif;position:relative}
.pad{position:absolute;left:0;right:0;top:0;height:66%;padding:58px 72px 0;display:flex;flex-direction:column;justify-content:space-between;z-index:2}
.top{display:flex;align-items:center;gap:20px}
.top .m{width:76px;height:76px;flex:none}
/* §4 caption: positive tracking, hairline weight */
.cap{font-size:19px;font-weight:400;letter-spacing:.06em;color:#F2C13D}
/* §4 wordmark: negative tracking, tight leading */
.wm{font-size:104px;font-weight:700;letter-spacing:-.05em;line-height:.86}
.role{font-size:25px;font-weight:600;letter-spacing:.03em;color:#F2C13D;margin-top:16px}
.rule{width:96px;height:4px;background:#F2C13D;margin-top:22px;margin-bottom:34px}
</style>
${wave}
<div class="pad">
  <div class="top"><div class="m">${mark}</div><div class="cap">Madrid &middot; available for consulting engagements</div></div>
  <div>
    <div class="wm">Silvia Arellano</div>
    <div class="role">Data Platform Architect &mdash; GCP / BigQuery / AI-assisted delivery</div>
    <div class="rule"></div>
  </div>
</div>`;

const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--force-device-scale-factor=2'],
});
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await p.setContent(html);
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(600);

const family = await p.evaluate(() => {
  const el = document.querySelector('.wm');
  return { resolved: getComputedStyle(el).fontFamily, loaded: document.fonts.check('700 112px Archivo') };
});
console.log('font:', JSON.stringify(family));

await p.screenshot({ path: `${PUB}/og-image.jpg`, type: 'jpeg', quality: 90 });
await b.close();
console.log('og-image.jpg', fs.statSync(`${PUB}/og-image.jpg`).size, 'bytes');
