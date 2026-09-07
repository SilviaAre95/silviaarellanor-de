# Changelog — profile-about-experience

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — role line replaces the motto

- **Removed**: "Signal, frequency, flow." and "Physicist. Data engineer. Builder." — Silvia's call; the motto read as cheese on the page even though it came from the brand book.
- **Added**: one line under the mark, "Data engineer, builder and coffee lover."
- **Files touched**: src/pages/About/About.jsx, src/assets/css/index.css

## 2026-09-07 — rebuilt to the supplied composition

- **Built from a reference**: Silvia supplied a composition for this page. The biography now sits on a chrome band opening with the swallow mark, the motto "Signal, frequency, flow." and "Physicist. Data engineer. Builder."; the timelines follow on the page ground.
- **Added**: the swallow mark, at Silvia's request. Full-colour primary at ~128px, above §7's 64px compact threshold, no shadow or containing shape. Chrome is a permitted ground; sea is the one that is not.
- **Copy**: the biography is unchanged, as asked. The two lines under the mark are new to the page but not invented — both come from §1 of the brand book ("waves — signal, frequency, continuous flow" and "Silvia trained as a physicist").
- **Kept**: the portrait, now beside the biography rather than above it, and with the dark gradient overlay removed — §6 has no decorative gradients.
- **Kept**: both timeline groups and all ten entries with their date range, role and organization; two columns from 960px, one below; the résumé download and the contact action.
- **Files touched**: src/pages/About/About.jsx, src/assets/css/index.css

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
- **Detail**: Portrait is duotoned with a cover scrim, timeline entries become foam cards with abyss pills and chrome markers, and the all-caps About eyebrow is lowercased per §4. Both resume and contact actions become pill buttons without appended icons.
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/pages/About/About.jsx, src/pages/Experience/Experience.jsx

## 2026-07-27

- **Fixed**: About and Experience now consume one concise shared chronology with the approved Playtomic promotion, canonical earlier roles, and Thomson Reuters contract
- **Verified**: rendered-surface regression tests require every approved role, organization, and date on both timelines
- **Files touched**: src/data/experience.js, src/pages/About/About.jsx, src/pages/Experience/Experience.jsx, scripts/resume/site-experience.test.mjs

## 2026-07-27

- **Verified**: About's Senior résumé action directly downloads the stable public PDF with the selected filename and consistent action text
- **Files touched**: src/pages/About/About.jsx, scripts/resume/website-resume-links.test.mjs

## 2026-07-27

- **Changed**: specified that the public Senior Data Engineer résumé action downloads directly instead of opening separately
- **Files touched**: docs/features/profile-about-experience.md
- **Approved via**: user-approved feature-bank correction

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
