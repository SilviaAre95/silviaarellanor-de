---
id: brand-identity
title: Brand Identity
status: implemented
created_at: 2026-09-07
last_modified: 2026-09-07
owner: Silvia Arellano
depends_on: []
acceptance_criteria:
  - Every surface draws its colour from a closed five-token palette of abyss, deep, sea, chrome, and foam.
  - Archivo at weights 400, 500, 600, and 700 is the only typeface on the site.
  - All visible copy renders lowercase, including headings, navigation, buttons, and proper nouns.
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
non_goals:
  - Restyle the LaTeX resume sources or the generated resume PDFs.
  - Regenerate the raster favicons, touch icons, or the OpenGraph share image.
  - Draw or ship the swallow mark; Silvia supplies that artwork separately.
  - Offer a dark-mode theme, a theme toggle, or any visitor-selectable appearance.
  - Introduce a sixth colour, a second typeface, decorative gradients, or drop shadows.
  - Change page structure, section order, routes, or the wording of any existing copy.
test_plan:
  - Load every route and verify each visible colour resolves to one of the five palette tokens.
  - Inspect computed styles on headings, body copy, and buttons and verify Archivo is the resolved family on each.
  - Read every route and verify no visible text renders with an uppercase letter.
  - Verify the hero wave sits on the bottom edge, is never flipped or rotated, and keeps its band order.
  - Sample each section of each route and confirm chrome yellow is present at least once.
  - Check every sea-coloured surface and verify its text is abyss.
  - Run the contrast script in the brand specification against the shipped token values and verify no text pairing falls below its required ratio.
---

# Brand Identity

## Summary

The site renders in one closed visual system built on waves — signal, frequency, continuous flow — drawn from Silvia's physics background and her streaming-data work. The system is cross-cutting: it owns colour, type, shape, and artwork for every other feature, and it changes none of their behaviour.

## Behavior

Pages sit on a warm off-white ground with deep-green type. Section grounds alternate between foam, chrome, abyss, and sea, and chrome yellow carries the signal on every one of them. A single typeface, Archivo, does all the work through scale and weight contrast, and all copy renders lowercase through a global text transform rather than by rewriting the source text.

The Home page opens on a dark hero: a duotoned portrait behind a drawn wave of stacked bezier bands, spray above the crest, foam flecks along it, and a grain overlay across the whole artwork. The same wave, cropped to its bottom edge, divides sections elsewhere.

Interactive shapes come in two radii only. Pills carry roster items, role tags, and buttons; six-pixel cards carry principles and content. Depth comes from layering colour, never from shadows. Hover feedback swaps fills instead of raising a surface.

## Out of scope

The system does not restyle the LaTeX resumes, whose own specification pins a restrained black editorial layout for ATS readability, and it does not regenerate the raster favicons, touch icons, or the OpenGraph image — those still carry the previous brand. The swallow mark described in the brand specification is not drawn here; Silvia supplies that artwork. No dark mode is offered: the palette is a fixed light system that already contains its own dark sections.

The system changes no page structure, no section order, no route, and no wording.

## Open questions

## Implementation notes

Tokens live in the `:root` block of `src/assets/css/index.css` and are mirrored into Tailwind as the `abyss`, `deep`, `sea`, `chrome`, and `foam` colour scales in `tailwind.config.js`. Typography, pill, button, band, card, grain, and duotone primitives are utility classes in the same stylesheet. The wave is `src/components/BrandWave.jsx`, which implements the band, spray, fleck, and grain construction from the brand specification and takes a `variant` of `cover` or `divider`.

The brand specification's "no icons" guidance is deliberately not applied. Three features — `profile-skills`, `profile-industries`, and `site-footer-social` — carry acceptance criteria that require an icon beside every entry. Those icons stay and inherit palette colour through `currentColor` instead of their vendor colours, which keeps the palette closed without breaking a spec'd behaviour.

The edge treatment on the industries banner is a transparency mask rather than a colour gradient, so `profile-industries` keeps its required edge readability without introducing decorative gradient fill.
