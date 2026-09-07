# Changelog — brand-identity

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07

- **Added**: new cross-cutting feature covering the site's visual system, scaffolded from the brand specification v1.0 and the landing-page design
- **Status**: implemented
- **Palette**: closed five-token system — abyss `#0E2019`, deep `#173A2C`, sea `#4FA97F`, chrome `#F2C13D`, foam `#F4F2E7`; the previous OBEX greys and the softBlue / mutedTeal / subtleYellow / gentleCoral accents are removed
- **Type**: Archivo 400/500/600/700 as the only family, with the specification's clamp scale and tracking rules; all copy lowercased through `body { text-transform: lowercase }` rather than by editing source text
- **Artwork**: added the drawn wave, the grain overlay, and the duotone photo treatment
- **Non-goals**: confirmed interactively with Silvia — resumes, raster icons, the OpenGraph image, the swallow mark, and dark mode are all out of scope for this pass
- **Deviations recorded**: the specification's "no icons" line is not applied, because `profile-skills`, `profile-industries`, and `site-footer-social` each require icons by acceptance criterion; icons inherit palette colour instead. The industries edge treatment uses a transparency mask rather than a decorative colour gradient
- **Known gap**: `public/favicon.ico`, the PNG touch icons, and `public/og-image.jpg` still carry the previous brand
