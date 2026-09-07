# Changelog — brand-identity

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — §5 amended: the wave may be a diagonal corner mark

- **Spec change (approved by Silvia)**: §5's blanket "MUST NOT rotate it" is amended. The wave may be set on the diagonal as a corner mark — rotated up to roughly 20°, anchored into a corner, masked at its trailing edge. Silvia asked for the corner wave on the Skills section to run diagonally; a straight crop "looks odd".
- **Unchanged**: no vertical flip, no mirroring, no centering as a standalone logo, and the full-cover and section-divider placements stay level horizons.
- **Files touched**: docs/brand/brand-specification.md (now v1.2), src/assets/css/index.css

## 2026-09-07 — site application reverted

- **Reverted**: `src/`, `tailwind.config.js` and `index.html` restored to their state on `main`. The whole-site application of the brand system was rejected on look.
- **Status**: implemented → in-progress. The criteria in the spec now describe a target, not the live page.
- **Kept**: the swallow mark (`public/brand/`), the generated raster icons, `og-image.jpg`, `site.webmanifest`, `scripts/brand/`, and the brand docs. None of those were the problem, and re-deriving them would be waste.
- **Re-applied on top of the revert**: the footer Gumroad `aria-label` fix (a real accessibility defect, unrelated to the visual design) and the `og:image:width`/`height` meta, which must match the 2400x1260 file that is still shipped. The SVG favicon link is kept for the same reason — the file exists and is the mark.
- **Nothing lost**: the revert is a forward commit, not a reset. Commits `ce68c14`..`1d3a324` remain in this branch's history and any piece can be cherry-picked back.
- **Next**: rebuild section by section, starting with the Hero, with review at each step.
- **Files touched**: src/*, tailwind.config.js, index.html, docs/features/*


## 2026-09-07 — lowercase treatment retired

- **Spec change**: brand specification §2's "Case — MUST be lowercase throughout" is retired at Silvia's direction. Copy now renders in the case it is authored in. Recorded as a dated amendment in `docs/brand/brand-specification.md` rather than by rewriting the original rule.
- **Removed**: `body { text-transform: lowercase }` and the companion rule that handed the transform back to form controls
- **Changed**: acceptance criterion "All visible copy renders lowercase" → "Copy renders in the case it is authored in; no global text transform is applied", plus an explicit criterion that nothing renders in all-caps (§4 still stands)
- **Added**: non-goal — reintroducing a global case transform
- **Changed**: the swallow SVGs' `<title>` and `aria-label` now read "Silvia Arellano"; these are accessible names, not styled text, so the transform never covered them
- **Changed**: `og-image.jpg` re-rendered — "Silvia Arellano", "Data Platform Architect — GCP / BigQuery / AI-assisted delivery", "Madrid"
- **Verified**: computed `text-transform` is `none` on every element of every route
- **Files touched**: src/assets/css/index.css, public/brand/*.svg, public/favicon.svg, public/og-image.jpg, scripts/brand/generate-og-image.mjs, docs/brand/brand-specification.md


## 2026-09-07 — raster icons and share card

- **Spec change (non-goal amended)**: "Regenerate the raster favicons, touch icons, or the OpenGraph share image" → "Hand-author the raster icons or the share card; both are generated from the mark by committed scripts." Silvia supplied a 1024px raster master, which removed the blocker.
- **Added**: three acceptance criteria covering the icon set, the share card's type placement, and the manifest
- **Changed**: `favicon.ico` (16/32/48), `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png` — all regenerated from the mark on a foam tile
- **Changed**: `og-image.jpg` is a new 2400x1260 share card — mark, caption, wordmark, role line, and the wave as a bottom horizon; `og:image:width`/`height` updated to match the rendered file
- **Changed**: `site.webmanifest` had empty `name`/`short_name` and `#ffffff` for both theme and background; pure white is forbidden by §3. Now carries the site name, abyss theme, foam background
- **Added**: `scripts/brand/` — `png.py`, `generate-icons.py`, `generate-og-image.mjs`, and the 1024px master, so the assets are reproducible
- **Verified**: every generated file decodes at its declared size in Chromium; the committed og script reproduces the shipped JPEG byte-for-byte
- **Files touched**: public/*.png, public/favicon.ico, public/og-image.jpg, public/site.webmanifest, index.html, scripts/brand/*


## 2026-09-07 — swallow mark

- **Spec change (non-goal amended)**: "Draw or ship the swallow mark; Silvia supplies that artwork separately" → "Draw, redraw, or alter the swallow mark; the artwork is Silvia's and ships as supplied." Silvia supplied the mark, so shipping it moved into scope; drawing it remains out.
- **Added**: four acceptance criteria covering the mark's variants, palette-exact fills, placement, and the sea-ground prohibition
- **Added**: `public/brand/logo-swallow.svg`, `-dark.svg`, `-mono.svg`, `-mono-foam.svg`, extracted from the supplied logo sheet with no path data changed
- **Changed**: `public/favicon.svg` is now the primary mark rather than the wave-crest crop from spec §5; §10 lists favicons and avatars as a mark use
- **Note**: the logo sheet supersedes spec §10 on the four-band ribbon, the compact file, and the small-size floor (32px, mono below)
- **Files touched**: public/brand/*.svg, public/favicon.svg, index.html


## 2026-09-07

- **Added**: new cross-cutting feature covering the site's visual system, scaffolded from the brand specification v1.0 and the landing-page design
- **Status**: implemented
- **Palette**: closed five-token system — abyss `#0E2019`, deep `#173A2C`, sea `#4FA97F`, chrome `#F2C13D`, foam `#F4F2E7`; the previous OBEX greys and the softBlue / mutedTeal / subtleYellow / gentleCoral accents are removed
- **Type**: Archivo 400/500/600/700 as the only family, with the specification's clamp scale and tracking rules; all copy lowercased through `body { text-transform: lowercase }` rather than by editing source text
- **Artwork**: added the drawn wave, the grain overlay, and the duotone photo treatment
- **Non-goals**: confirmed interactively with Silvia — resumes, raster icons, the OpenGraph image, the swallow mark, and dark mode are all out of scope for this pass
- **Deviations recorded**: the specification's "no icons" line is not applied, because `profile-skills`, `profile-industries`, and `site-footer-social` each require icons by acceptance criterion; icons inherit palette colour instead. The industries edge treatment uses a transparency mask rather than a decorative colour gradient
- **Known gap**: `public/favicon.ico`, the PNG touch icons, and `public/og-image.jpg` still carry the previous brand
