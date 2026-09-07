# Changelog — profile-skills

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — solid rectangles, contoured chips, diagonal wave

- **Changed**: the rectangles are filled with their accent — sea and chrome alternating — instead of carrying it as a hairline. Chips are contoured on that colour: abyss outline and abyss type over sea or chrome, so the card's colour reads through them. This is what Silvia meant by the reference; the earlier restrained version read as too quiet.
- **Contrast**: everything inside a card is abyss. 5.90 on sea, 10.06 on chrome — both clear AA. Chip hover deepens the outline and adds a 7% abyss wash.
- **Changed**: the corner wave now runs on the diagonal rather than level. This required amending §5 of the brand specification, which forbade rotating the wave — recorded there and in the brand-identity changelog.
- **Files touched**: src/assets/css/index.css, docs/brand/brand-specification.md

## 2026-09-07 — light ground, corner wave, alternating accents

- **Changed**: the section drops the dark abyss band and sits on the same foam ground as the hero.
- **Added**: the brand wave as a corner mark in the top-right, at the artwork's own 1200:520 ratio so nothing is stretched, with a transparency mask carrying its left edge out. Decorative and `aria-hidden`; the section reads the same without it.
- **Changed**: the two accents now alternate by rectangle — sea, chrome, sea, … — as the heading rule and the card's hairline edge, so no two neighbours repeat on the 3-up grid.
- **Detail**: cards take a 3% abyss wash, since foam is now the page ground and a foam card would have no body of its own. Chips are abyss text on an abyss hairline.
- **Files touched**: src/pages/Skills/Skills.jsx, src/assets/css/index.css

## 2026-09-07 — chip colour pulled back

- **Changed**: chips are outlined instead of filled — foam text on a foam hairline, on the deep card. Sea now appears only as a 2rem rule above each category heading and on chip hover.
- **Why**: forty chips in chrome, sea and foam at equal weight put the accents at the same volume as the page, and once the reference's daily/worked-with legend was dropped the colour carried no meaning. Silvia read it as off-brand; the brand book is explicit that chrome and sea are accents and foam and abyss carry the page.
- **Contrast**: chip hover changes the border only — sea as text on deep measures 4.36 and misses AA at this size.
- **Files touched**: src/pages/Skills/Skills.jsx, src/assets/css/index.css

## 2026-09-07 — rebuilt on the brand system

- **Changed**: the section now sits on the abyss ground with each of the six categories in its own rectangle, following the reference composition Silvia supplied. Replaces the white grid-pattern ground, the shimmer animation and the shadcn Card/Badge chrome.
- **Added**: a lede under the heading — "These are the tools I've used to create data products. I've worked with all cloud environments and many on-premise engagements."
- **Changed**: skill icons now inherit the chip's colour instead of carrying vendor brand hexes, which sat outside the closed palette. Every skill keeps its icon and its name.
- **Not changed**: the six categories and the full skill inventory are exactly as they were. The reference mockup used a different taxonomy; Silvia asked to keep the skills she actually has.
- **Deliberately omitted from the reference**: the "What I work in daily / Worked with, not where I'm deepest" legend and its two-tier chip treatment.
- **Files touched**: src/pages/Skills/Skills.jsx, src/assets/css/index.css

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
- **Detail**: Category cards cycle chrome → sea → deep with contrast-safe badge fills. Vendor brand colours on the tech icons are replaced by inherited palette colour so the palette stays closed; every skill keeps its icon and name. Hover feedback is a lift rather than a shadow; the shimmer sweep and grid backdrop are removed.
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/pages/Skills/Skills.jsx, src/components/ui/card.jsx, src/components/ui/badge.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
