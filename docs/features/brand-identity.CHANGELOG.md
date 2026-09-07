# Changelog — brand-identity

Append-only history of changes to this feature. Newest entries appear first.

---

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
