# Changelog — site-navigation

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — Header rebuilt to the reference composition

- **Changed (spec change)**: `fixed` → `sticky`. The reference has the bar sitting inside the crest at rest; sticky keeps that composition while still following the reader down the page, so the destination remains reachable.
- **Added**: the swallow mark and wordmark as a lockup on the left, linking to the top of Home
- **Removed**: the per-link icons and the animated gradient border. Links are now plain text with a chrome underline on hover and sea for the active section.
- **Unchanged**: all six destinations — Home, Skills, Projects, Blog, Contact, About. The reference used a different set (Work, Consulting, wayworks, Writing, Contact); that is an information-architecture change, not a visual one, so the site's own destinations were kept.
- **Files touched**: src/pages/Header/Header.jsx, src/assets/css/index.css


## 2026-09-07 — brand mark in the header

- **Added**: acceptance criterion — the header carries the swallow mark, which returns to the top of Home
- **Detail**: the mark sits left of the desktop nav links inside the existing abyss pill, and beside the section label on mobile. Placing it inside the pill avoids adding a containing shape, which the mark's rules forbid, and keeps it off any sea ground. Never stacked above the wordmark.
- **Behaviour**: no navigation destination, route, or scroll behaviour changed
- **Files touched**: src/pages/Header/Header.jsx


## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
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
