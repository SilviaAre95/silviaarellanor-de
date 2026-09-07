# Changelog — site-footer-social

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — footer clearance fixed on narrow viewports

- **Fixed**: the footer is fixed to the bottom of the viewport and the page reserved a flat 5rem for it. The footer stacks below Tailwind's `md` breakpoint and grows from 53px to 145px there, so it was covering the last 65px of every page on a phone. Clearance is now 5rem on wide viewports and 11rem below 768px, and it lives on the closing crest rather than on `main`.
- **Verified**: measured at 1280x900 and 390x844 — the page's last element clears the footer by 27px and 31px respectively.
- **Files touched**: src/App.jsx, src/assets/css/index.css

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
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
