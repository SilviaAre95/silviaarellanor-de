# Changelog — site-navigation

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — brand mark in the header

- **Added**: acceptance criterion — the header carries the swallow mark, which returns to the top of Home
- **Detail**: the mark sits left of the desktop nav links inside the existing abyss pill, and beside the section label on mobile. Placing it inside the pill avoids adding a containing shape, which the mark's rules forbid, and keeps it off any sea ground. Never stacked above the wordmark.
- **Behaviour**: no navigation destination, route, or scroll behaviour changed
- **Files touched**: src/pages/Header/Header.jsx


## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`)
- **Detail**: Header bar becomes an abyss pill with foam links and a chrome active state. The animated gradient border and its keyframes are removed (§3 forbids decorative gradients, §7 forbids shadows).
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/pages/Header/Header.jsx, src/App.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
