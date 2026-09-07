# Changelog — contact-booking

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — restyled with the Contact section

- **Changed**: the booking action moves into the calls-to-action row at the top of the sea band, set plainly beside the solid "Get in touch" pill. It stays visually distinct from both that pill and the form below, keeps its calendar cue, and still opens the Google Calendar page in a separate context.
- **Unchanged**: the destination, the `BOOKING_URL` guard that omits the action when no destination is configured, and the form and displayed email as alternatives.
- **Files touched**: src/pages/Contact/Contact.jsx, src/assets/css/index.css

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
- **Detail**: The booking action is restyled as the abyss pill button and keeps its calendar cue, remaining visually distinct from the foam-card inquiry form on the sea ground.
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/pages/Contact/Contact.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
