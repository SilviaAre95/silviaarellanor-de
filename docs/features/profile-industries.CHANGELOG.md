# Changelog — profile-industries

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — rebuilt on the brand system

- **Changed**: the band is now abyss with foam rectangles, at Silvia's direction. Replaces the light grey ground, the soft-blue icons, the card shadows and the left/right colour-fade overlays.
- **Changed**: the edge treatment is a transparency mask instead of two gradient overlays fading to the ground colour. §6 has no decorative gradients, and the band is one flat abyss.
- **Fixed**: chip spacing moved from a flex gap to a right margin. The track scrolls `-50%` of its own width, which is only seamless if both runs measure identically including trailing space; a gap between the runs put the loop off by that gap.
- **Added**: the duplicate run carries `aria-hidden`, so the nine industries are announced once rather than eighteen times. The loop also honours `prefers-reduced-motion` — the criteria call for continuous movement, which stays the default; this only stills it for visitors who have asked the OS for that.
- **Not changed**: the nine industries, their icons, the label, the seamless loop and the single-line labels.
- **Files touched**: src/components/IndustryBanner.jsx, src/assets/css/index.css

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
- **Detail**: Banner moves to the chrome roster ground with abyss pills. The edge treatment is now a transparency mask rather than a colour gradient, keeping edge readability without decorative gradient fill. Adds a prefers-reduced-motion stop.
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/components/IndustryBanner.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
