# Changelog — portfolio-projects

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — rebuilt on the brand system

- **Changed**: the section is restyled onto the brand layer — foam ground, abyss type, deep for secondary text and links, 6px card radius, no shadows. Replaces the white grid ground, the soft-blue accents and the shadcn card chrome.
- **Changed**: each card takes its accent as a 4px top edge, alternating sea and chrome, matching the Skills rectangles one step quieter — the screenshots already carry colour, so the cards are not filled.
- **Removed**: the dark gradient overlay on the project screenshots. §6 of the brand book has no decorative gradients; the images show as photographs.
- **Changed**: company and year move off the image (where contrast was uncontrolled) into a meta line above the title. Outcome figures are set in abyss with the accent as a rule beside them, since sea and chrome both fail as type on foam.
- **Layout**: footers are pinned to the bottom of the card so links and the proprietary label line up across a row.
- **Not changed**: all five projects, their copy, metrics, imagery, links and the proprietary labelling.
- **Files touched**: src/pages/Projects/Projects.jsx, src/assets/css/index.css

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
- **Detail**: Project cards sit on foam with a hairline rule, duotoned sea artwork under grain, foam and chrome pills for organisation and year, and the §4 numeral-and-caption pairing for outcome metrics. The trailing → on the proprietary-project action is removed per §7.
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/pages/Projects/Projects.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
