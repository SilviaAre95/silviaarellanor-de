# Changelog — profile-about-experience

Append-only history of changes to this feature. Newest entries appear first.

---

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
