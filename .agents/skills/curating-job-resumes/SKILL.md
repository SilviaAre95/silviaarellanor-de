---
name: curating-job-resumes
description: Use when tailoring Silvia's repository LaTeX resume to a pasted job description, a local job-description file, or a user-provided job URL.
---

# Curating Job Resumes

Create a local, truthful application artifact. Optimize selection and ordering of verified evidence, never invent a keyword or change the published resume as a side effect.

## Required inputs and workspace

1. Read the full job description. For a URL, retrieve its visible job-description content; if retrieval fails, report that fact rather than guessing.
2. Derive a lowercase `<job-slug>` from employer and role. Work only in `resume/applications/<job-slug>/`, which is local and ignored.
3. Save the supplied or retrieved description verbatim as `job-description.md` in that directory.
4. Read `docs/features/resume-delivery.md`, `scripts/resume/config.mjs`, all `resume/content/*.tex`, the shared template, and the three files in `resume/variants/` before writing.
5. Before creating artifacts, record `shasum -a 256` hashes for `public/silvia-arellano-cv.pdf`, the three committed base variants, and `resume/content/*.tex`. Repeat the same hash command after validation. If any protected hash changes, stop: do not claim success or repair it without explicit user authority.

## Evidence gate

Extract must-haves, responsibilities, domain signals, and preferred keywords. Create `evidence-matrix.md` before `resume.tex`, with this table:

| Job requirement | Canonical evidence (file/macro) | Status | Resume treatment |
| --- | --- | --- | --- |

Use `Supported`, `Partial`, or `Gap` for Status. Cite a canonical macro for every supported claim. A requirement with no direct canonical support is a `Gap`: omit it from skills, summary, and bullets. Do not turn a gap into an ATS keyword, inferred experience, adjacent-tool claim, title, metric, client domain, certification, or ownership claim.

Select the closest base: Senior Data Engineer for platform engineering, Forward Deployed Engineer for client lifecycle/data-and-AI delivery, or Data Leadership for management/strategy. Reorder and select its canonical macros; write no new factual achievement. A target headline may name the desired role, but preserve each canonical employment title and date exactly.

## Build the application artifact

Create `resume/applications/<job-slug>/resume.tex` using the shared class, identity, canonical content, and selected variant structure through relative paths. Keep the document linear, single-column, two US Letter pages, and ATS-extractable. Preserve shared branding, contact links, work authorization, and canonical accomplishments. Keep `resume.tex`, `resume.pdf`, `job-description.md`, `evidence-matrix.md`, renders, and validation notes local to that application directory.

Never modify `public/silvia-arellano-cv.pdf`, `resume/variants/{senior-data-engineer,forward-deployed-engineer,data-leadership}.tex`, or `resume/content/` unless the user separately asks for a source update. Never submit an application, contact anyone, or upload a file.

## Validate before reporting

From `resume/`, resolve `TECTONIC_BIN=${TECTONIC_BIN:-tectonic}`. Require `$TECTONIC_BIN --version` to report exactly `Tectonic 0.16.9` before compiling with `$TECTONIC_BIN` into the application directory and retaining its log. If the exact binary is unavailable or cannot compile, report validation as blocked; never compile, deliver, or call an alternate Tectonic version a layout check. Then verify:

1. `pdfinfo` reports exactly two pages and US Letter (612 x 792 pts).
2. `pdffonts` reports embedded fonts with Unicode mappings; `pdfinfo -url` includes the canonical email, website, and LinkedIn links.
3. `pdftotext` is readable, linear, contains the target headline and canonical contact details, and contains no unsupported matrix requirement.
4. Render both pages with `pdftoppm -png -r 150`, inspect every rendered page at full resolution, and fix real clipping, overlap, unreadable text, broken links, or branding defects before continuing.
5. Repeat the protected-file hashes and record before/after values plus command output in `validation.md`.

Return the absolute PDF path, selected base, concise supported-match summary, explicit gaps, matrix path, and validation result. State that the application was not submitted.

## Red flags

Stop and correct the artifact if you are about to write an unsupported tool such as Kubernetes because it appears in the job description, place a tailored source in `resume/variants/`, skip the matrix, or report a PDF without compile, Poppler, render, link/font, and protected-hash evidence.
