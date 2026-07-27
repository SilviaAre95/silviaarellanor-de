# Changelog — resume-delivery

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-07-27

- **Fixed**: aligned the feature-bank index status with the implemented Resume Delivery feature
- **Files touched**: docs/features/INDEX.md

## 2026-07-27

- **Fixed**: removed the empty Worky contract role from the Forward Deployed Engineer consulting history while retaining its approved product evidence in Selected Forward-Deployed Impact
- **Verified**: the rebuilt FDE PDF has no empty role, remains two pages, and passes repeated rendered-page and ATS extraction review
- **Files touched**: resume/variants/forward-deployed-engineer.tex, scripts/resume/forward-deployed-engineer.test.mjs

## 2026-07-27

- **Implemented**: CI installs pinned Tectonic and Poppler before resume tests; both website actions directly download the Senior PDF; README documents the compatible local toolchain
- **Verified**: 26 resume tests, lint (zero errors), production build, Senior-only deployed artifact boundary, byte-for-byte publication copies, six-page render review, and ATS extraction
- **Files touched**: .github/workflows/ci.yml, src/pages/About/About.jsx, src/pages/Experience/Experience.jsx, README.md, scripts/resume/website-resume-links.test.mjs

## 2026-07-27

- **Changed**: specified that website CV actions directly download the generated Senior Data Engineer PDF
- **Files touched**: docs/features/resume-delivery.md
- **Approved via**: user-approved feature-bank correction

## 2026-07-27

- **Fixed**: selected only one copy of the Worky contract product for FDE and partitioned Leadership technical outcomes between employment history and selected impact, preserving every approved fact without repeated claims
- **Verified**: pinned Tectonic PDFs remain two balanced US Letter pages with one extracted-text occurrence for each affected fact, clean 150-DPI renders, no overfull or underfull boxes, and 14/14 resume tests passing
- **Files touched**: resume/variants/forward-deployed-engineer.tex, resume/variants/data-leadership.tex, docs/features/resume-delivery.CHANGELOG.md

## 2026-07-27

- **Added**: private Forward Deployed Engineer and Data Leadership variants with role-specific summaries, section ordering, skills, and approved canonical evidence
- **Verified**: both PDFs are exactly two US Letter pages at 11pt body and 10pt supporting text, with balanced clean renders, linear ATS extraction, embedded Unicode fonts, five live contact links, no overfull boxes, no invented FDE employment title, and no leadership management headcount
- **Files touched**: resume/variants/forward-deployed-engineer.tex, resume/variants/data-leadership.tex, docs/features/resume-delivery.CHANGELOG.md

## 2026-07-27

- **Fixed**: increased the Senior variant's body size and leading so both pages use the Letter canvas without conspicuous empty lower thirds
- **Verified**: final text reaches 81.4% and 75.6% of pages 1 and 2; both 150-DPI renders remain clean, exactly two pages, ATS-linear, fully linked, and free of overfull boxes
- **Files touched**: resume/variants/senior-data-engineer.tex, docs/features/resume-delivery.CHANGELOG.md

## 2026-07-27

- **Added**: public Senior Data Engineer variant with the approved summary, technical evidence priority, complete earlier career history, selected consulting, education, and certification
- **Verified**: pinned Tectonic output is exactly two US Letter pages with linear ATS extraction, 10pt body and 9.75pt supporting text, embedded Unicode fonts, five live contact links, no overfull boxes, and clean 150-DPI renders
- **Files touched**: resume/variants/senior-data-engineer.tex, docs/features/resume-delivery.CHANGELOG.md

## 2026-07-27

- **Added**: canonical atomic employment and consulting role and achievement macros for all approved career history
- **Verified**: required role dates appear once in employment role macros; forbidden copy, unpublished titles, and management-headcount claims are absent
- **Files touched**: resume/content/experience.tex, resume/content/consulting.tex

## 2026-07-27

- **Fixed**: committed `resume/variants/template` and `resume/variants/content` relative symlinks preserve the planned shared-source imports under Tectonic
- **Verified**: pinned Tectonic 0.16.9 compiles a variant using `template/silvia-resume` and `content/*` without an untracked path workaround
- **Files touched**: resume/variants/template, resume/variants/content

## 2026-07-27

- **Added**: reusable editorial-technical LaTeX class with canonical identity, skills, education, and credential content
- **Verified**: pinned Tectonic smoke PDF has linear text, embedded Unicode fonts, clickable contact links, and no overfull boxes
- **Files touched**: resume/template/silvia-resume.cls, resume/content/identity.tex, resume/content/skills.tex, resume/content/education.tex

## 2026-07-27

- **Fixed**: generated non-public resume outputs are ignored and PDF-tool validation failures identify the resume variant
- **Files touched**: .gitignore, scripts/resume/validate-resume.mjs, scripts/resume/validate-resume.test.mjs

## 2026-07-27

- **Added**: pinned resume-variant manifest and deterministic PDF validation primitives
- **Files touched**: scripts/resume/config.mjs, scripts/resume/validate-resume.mjs, package.json

## 2026-07-27

- **Created**: feature scaffolded through the feature-bank workflow
- **Status**: proposed
- **Acceptance criteria**: confirmed interactively with the user
- **Non-goals**: confirmed interactively with the user
- **Files touched**: none yet
- **Approved via**: initial scaffold
