# Changelog — profile-skills

Append-only history of changes to this feature. Newest entries appear first.

---

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
