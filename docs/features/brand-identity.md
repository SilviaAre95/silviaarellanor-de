---
id: brand-identity
title: Brand Identity
status: in-progress
created_at: 2026-09-07
last_modified: 2026-09-07
owner: Silvia Arellano
depends_on: []
acceptance_criteria:
  - Every surface draws its colour from a closed five-token palette of abyss, deep, sea, chrome, and foam.
  - Archivo at weights 400, 500, 600, and 700 is the only typeface on the site.
  - Copy renders in the case it is authored in; no global text transform is applied.
  - No visible text renders in all-caps, per brand specification §4.
  - Display text carries negative letter tracking and small caption text carries positive letter tracking.
  - The Home page opens on a dark ground with the drawn wave anchored to the bottom edge of the hero.
  - The wave is drawn from stacked bezier bands that alternate chrome, sea, chrome, deep, and abyss from back to front.
  - Chrome yellow appears at least once on every section of every page.
  - Text placed on a sea ground is abyss, never foam or white.
  - Rounded shapes use only two radii: a full pill and a six-pixel card.
  - No surface carries a drop shadow, and gradients appear only as cover scrims and legibility masks.
  - Photographs of Silvia render as duotones in the palette rather than in full colour.
  - Large artwork areas carry a grain overlay so the system reads as print rather than vector.
  - Body text measures at most 64 characters per line and lead paragraphs at most 54.
  - The swallow mark ships in four variants: primary, dark ground, mono, and mono reversed.
  - Every mark fill is an exact palette token; the mark carries no outline, shadow, or containing shape.
  - The mark appears in the site header and as the browser tab icon, and is never flipped or rotated.
  - The mark is never placed on a sea ground, where the ribbon loses contrast.
  - The favicon, touch icon, Android icons, and share card all render the mark rather than the previous brand.
  - The share card sets every line of type on the abyss ground, never over the wave bands.
  - The web app manifest carries the site name and palette colours rather than empty strings and pure white.
non_goals:
  - Restyle the LaTeX resume sources or the generated resume PDFs.
  - Hand-author the raster icons or the share card; both are generated from the mark by committed scripts.
  - Draw, redraw, or alter the swallow mark; the artwork is Silvia's and ships as supplied.
  - Offer a dark-mode theme, a theme toggle, or any visitor-selectable appearance.
  - Introduce a sixth colour, a second typeface, decorative gradients, or drop shadows.
  - Change page structure, section order, routes, or the wording of any existing copy.
  - Reintroduce `body { text-transform: lowercase }` or any global case transform.
test_plan:
  - Load every route and verify each visible colour resolves to one of the five palette tokens.
  - Inspect computed styles on headings, body copy, and buttons and verify Archivo is the resolved family on each.
  - Read every route and verify computed `text-transform` is `none` on every element and that no text renders in all-caps.
  - Verify the hero wave sits on the bottom edge, is never flipped or rotated, and keeps its band order.
  - Sample each section of each route and confirm chrome yellow is present at least once.
  - Check every sea-coloured surface and verify its text is abyss.
  - Run the contrast script in the brand specification against the shipped token values and verify no text pairing falls below its required ratio.
---

# Brand Identity

> **Status note — 2026-09-07.** The first application of this system to the site
> was rejected on look and reverted. Only the durable assets remain shipped: the
> swallow mark, the generated icons, the share card, and the generator scripts.
> The site itself renders in the pre-brand styling. The visual system is being
> rebuilt one section at a time; the criteria below describe the target, not
> what is currently on the page.

## Summary

The site renders in one closed visual system built on waves — signal, frequency, continuous flow — drawn from Silvia's physics background and her streaming-data work. The system is cross-cutting: it owns colour, type, shape, and artwork for every other feature, and it changes none of their behaviour.

## Behavior

Pages sit on a warm off-white ground with deep-green type. Section grounds alternate between foam, chrome, abyss, and sea, and chrome yellow carries the signal on every one of them. A single typeface, Archivo, does all the work through scale and weight contrast. Copy renders in the case it is authored in: the brand book's original all-lowercase treatment was retired by Silvia on 2026-09-07, and the amendment is recorded in `docs/brand/brand-specification.md` §2.

The Home page opens on a dark hero: a duotoned portrait behind a drawn wave of stacked bezier bands, spray above the crest, foam flecks along it, and a grain overlay across the whole artwork. The same wave, cropped to its bottom edge, divides sections elsewhere.

Interactive shapes come in two radii only. Pills carry roster items, role tags, and buttons; six-pixel cards carry principles and content. Depth comes from layering colour, never from shadows. Hover feedback swaps fills instead of raising a surface.

## Out of scope

The system does not restyle the LaTeX resumes, whose own specification pins a restrained black editorial layout for ATS readability. The swallow mark is Silvia's own artwork: it is shipped as supplied and never redrawn or altered here, and the raster icons and share card are generated from it rather than drawn by hand. No dark mode is offered: the palette is a fixed light system that already contains its own dark sections.

The system changes no page structure, no section order, no route, and no wording.

## Open questions

## Implementation notes

Tokens live in the `:root` block of `src/assets/css/index.css` and are mirrored into Tailwind as the `abyss`, `deep`, `sea`, `chrome`, and `foam` colour scales in `tailwind.config.js`. Typography, pill, button, band, card, grain, and duotone primitives are utility classes in the same stylesheet. The wave is `src/components/BrandWave.jsx`, which implements the band, spray, fleck, and grain construction from the brand specification and takes a `variant` of `cover` or `divider`.

The brand specification's "no icons" guidance is deliberately not applied. Three features — `profile-skills`, `profile-industries`, and `site-footer-social` — carry acceptance criteria that require an icon beside every entry. Those icons stay and inherit palette colour through `currentColor` instead of their vendor colours, which keeps the palette closed without breaking a spec'd behaviour.

The edge treatment on the industries banner is a transparency mask rather than a colour gradient, so `profile-industries` keeps its required edge readability without introducing decorative gradient fill.

The swallow mark lives in `public/brand/` as four files — `logo-swallow.svg` (primary), `logo-swallow-dark.svg`, `logo-swallow-mono.svg`, and `logo-swallow-mono-foam.svg` — extracted verbatim from Silvia's logo sheet. Two adjustments were made to make them usable as assets rather than sheet previews: the dark variant's baked-in abyss backdrop rect was removed so the file is transparent, and each file gained a `<title>` and `role="img"`. No path data was touched. The sheet supersedes brand specification §10 in two places: it drops the four-band ribbon and the separate compact file, and it sets the small-size floor at 32px with mono below that.

The raster icons and the share card are generated, not hand-made, so they can be rebuilt if the mark changes. `scripts/brand/generate-icons.py` box-filters the 1024px master over premultiplied alpha down to the favicon, touch-icon, and Android sizes, composites each onto a foam tile so the mark stays legible against a dark browser tab, and writes a PNG-entry `favicon.ico` at 16/32/48. It has no third-party dependencies: `scripts/brand/png.py` is a minimal local PNG codec.

`scripts/brand/generate-og-image.mjs` renders the share card in headless Chromium at 1200x630 twice over, composing the mark, the §5 wave, and Archivo fetched and inlined at run time. Playwright is deliberately not a project dependency, so `npm ci` and CI are untouched; the script is run by hand. Every line of type sits on the abyss ground, because foam on chrome measures 1.50 and sea on chrome 1.71 — nothing may be set over the wave bands.
