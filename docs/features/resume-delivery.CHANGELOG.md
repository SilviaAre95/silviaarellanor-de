# Changelog — resume-delivery

Append-only history of changes to this feature. Newest entries appear first.

---

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
