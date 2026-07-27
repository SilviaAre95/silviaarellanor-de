# Changelog — resume-delivery

Append-only history of changes to this feature. Newest entries appear first.

---

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
