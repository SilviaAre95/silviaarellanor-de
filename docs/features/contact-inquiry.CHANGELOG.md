# Changelog — contact-inquiry

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — rebuilt to the supplied composition

- **Changed**: the section is a sea band per Silvia's reference — a chrome rule, the two-line headline "Let's build / something useful.", and the scope line with the calls to action opposite it. The form and the working principles sit below on the same ground, the form on a foam panel.
- **Kept**: every field, the validation rules, the field-specific errors, the overall correction message, the success and failure states, the form reset on success, and the EmailJS delivery path with its environment-supplied identifiers. Behaviour is untouched; only the markup and styling changed.
- **Changed**: the invalid state no longer uses a coral border. The palette is closed and has no red, so an invalid field takes a heavier abyss border and keeps its message. Not depending on colour is the better cue anyway.
- **Added**: visible field labels (the form was placeholder-only), `aria-invalid` on invalid fields, `aria-describedby` pointing each field at its own error, and `role="status"` on the status line.
- **Removed**: a leftover `console.log` of the EmailJS result on every successful send.
- **Files touched**: src/pages/Contact/Contact.jsx, src/assets/css/index.css

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
- **Detail**: Contact block moves to the sea ground with abyss type throughout, per §3. The form sits on a foam card; invalid fields are marked with a 2px chrome rule and abyss error text, since the closed palette has no error red. No validation, delivery, or field behaviour changed.
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/pages/Contact/Contact.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
