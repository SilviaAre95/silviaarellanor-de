# Changelog — profile-skills

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`)
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
