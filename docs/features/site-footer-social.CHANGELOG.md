# Changelog — site-footer-social

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`)
- **Detail**: Footer becomes an abyss bar with a chrome top rule, foam social icons that go chrome on hover, and a chrome positioning line. Also corrects the Gumroad link's accessible name, which read "Medium" and contradicted this feature's matching-label criterion.
- **Status**: in-progress → implemented; the incorrect Gumroad accessible label was the only outstanding item
- **Behaviour**: unchanged apart from that accessible name — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/components/Footer.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: in-progress because the Gumroad action has an incorrect accessible label
- **Acceptance criteria**: extracted behaviorally from code and intended destination semantics
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
