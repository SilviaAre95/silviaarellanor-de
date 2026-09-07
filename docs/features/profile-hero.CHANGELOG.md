# Changelog — profile-hero

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — new headline, original lead restored

- **Changed**: the headline is now "I build your data platform. / You get the insights.", set as two deliberate lines with the payoff line in sea
- **Removed (spec change)**: the "Available for consulting — Madrid" tagline, and with it the acceptance criterion "The hero communicates current availability for consulting engagements". Availability is no longer stated in the hero.
- **Restored**: the lead paragraph is Silvia's original site copy again, replacing the reference mockup's. This also removes the "Fifteen years of physics habits" claim, which sat awkwardly beside About's "over the last 6+ years".
- **Layout**: dropped `max-width` and `text-wrap: balance` on the headline — balance re-breaks lines that are deliberate — and sized the type so line one holds on a single line. Verified two lines with no overflow at 1600, 1440, 1280, 1024, 860, 700 and 390px.
- **Files touched**: src/pages/Hero/Hero.jsx, src/assets/css/index.css


## 2026-09-07 — Hero rebuilt to Silvia's reference composition

- **Built from a supplied reference**: Silvia provided a complete HTML mockup of the crest, hero and roster strip. This implements it rather than my interpretation of the brand book.
- **Removed (spec change)**: the rotating specialty label and the scroll cue. Neither appears in the reference composition; both acceptance criteria are deleted rather than left failing. `FlipWords` is now unused by the hero.
- **Changed (spec change)**: the opening criterion no longer requires Silvia's name in the hero itself — the positioning statement leads, and her name sits in the header lockup with the role on the portrait tag.
- **Added**: a roster strip below the hero on a chrome ground, listing the six services, with pills cycling abyss → foam → sea.
- **Copy**: the hero now carries Silvia's own headline and lead from the reference and her landing design, replacing the previous name-and-role opening.
- **Photograph**: circular, inside a three-quarter sea arc, with an abyss role tag. Presented as an unmodified photograph — the reference applies no duotone.
- **Files touched**: src/pages/Hero/Hero.jsx, src/components/BrandWave.jsx, src/assets/css/index.css


## 2026-09-07 — Hero rebuilt (brand, attempt 2)

- **Changed**: Hero restyled on the brand palette, first section of the section-by-section rebuild
- **Approach**: foam ground with abyss type carries the composition; chrome appears twice only — the availability dot and one short rule. The first attempt applied §9's alternating saturated section grounds literally and the result was rejected.
- **Photograph**: not a full duotone. A luminosity blend washes skin out — yellow over chrome, mint over deep — so the photo stays a photograph with a light desaturation and a 14% deep tint over it.
- **Preserved**: every acceptance criterion — name and positioning, availability, the rotating specialty label, the intro, both calls to action, the photograph's alternative text, the two-column to stacked collapse, and the scroll cue
- **Foundation added** (global, additive): Archivo, and the five brand colours alongside the existing OBEX palette so unrebuilt sections keep rendering as they are
- **Files touched**: src/pages/Hero/Hero.jsx, src/assets/css/index.css, tailwind.config.js, index.html


## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
- **Detail**: Hero moves onto the abyss ground with the drawn wave as a bottom-anchored horizon in flow, a chrome availability pill, an abyss/sea headline, and the portrait duotoned per §6. The unloaded Font Awesome arrow and chevron glyphs are dropped; the scroll cue is now a caption plus a chrome rule.
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/pages/Hero/Hero.jsx, src/components/BrandWave.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
