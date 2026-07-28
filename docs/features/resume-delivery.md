---
id: resume-delivery
title: Resume Delivery
status: implemented
created_at: 2026-07-27
last_modified: 2026-07-28
owner: Silvia Arellano
depends_on: []
acceptance_criteria:
  - The repository contains maintainable LaTeX sources for Senior Data Engineer, Forward Deployed Engineer, and Data Leadership resumes.
  - Shared identity, career history, education, skills, and verified achievements come from one canonical source so variants do not drift.
  - Each variant has role-specific positioning, skill emphasis, bullet selection, and ordering while remaining factually consistent.
  - Every variant includes all seven employment entries, the Thomson Reuters, Worky, and Grupo Homa consulting engagements, both education entries, all three certifications, and English and Spanish languages.
  - Contact details use linked vector icons for email, website, LinkedIn, and both phone numbers while keeping every destination visible as ATS-readable text.
  - Every variant closely follows the saved Canva resume's typography, spacing, black rules, centered section headings, and balanced two-page composition.
  - Contact icons are filled, consistently aligned, and followed by the complete visible destination; work authorization is followed by one divider rather than stacked rules.
  - Skills use the saved resume's compact four-column grid while remaining selectable and following a stable extraction order.
  - The Senior Data Engineer variant preserves the saved resume's body wording verbatim, except for Silvia's separately approved website, Spain phone, work-authorization, and remote-availability additions.
  - The Forward Deployed Engineer resume describes equivalent consulting work without claiming Silvia previously held that formal title.
  - The resumes include the approved Playtomic ingestion-platform, Beam framework, Terraform, monitoring, live-product, semantic-layer MCP, AI-dashboard adoption, and Google ADK agent evidence.
  - The career history restores Worky and MatchCraft experience rather than retaining the truncated source copy.
  - Leadership wording says Silvia managed the Playtomic data-engineering team, a client-facing Siftia data-engineering team, and a consultancy development team without publishing team headcounts.
  - Contact details include email, website, LinkedIn, Mexico and Spain phone numbers, work authorization across Mexico, Spain, the US, and the EU, and remote availability.
  - Every resume compiles into a two-page, text-selectable, ATS-readable PDF using the saved resume's restrained black editorial layout.
  - The site build compiles resumes before the web application is bundled and fails clearly if required resume data or compilation is invalid.
  - Only the Senior Data Engineer PDF is published at the site's stable CV URL.
  - Forward Deployed Engineer and Data Leadership PDFs are generated for local or manual applications but are not linked or deployed with the website.
  - Existing website CV actions directly download the newly generated Senior Data Engineer PDF.
non_goals:
  - Compile LaTeX in the visitor's browser or when the download action is selected.
  - Publish the Forward Deployed Engineer or Data Leadership variants on the website.
  - Invent experience, metrics, credentials, employers, or formal job titles.
  - Tailor automatically to an arbitrary job description.
  - Require pixel-level identity with the old Canva PDF or use photos, sidebars, skill charts, and decorative graphics that reduce ATS readability.
  - Submit applications, upload resumes to job boards, or email generated documents.
  - Commit one-off, job-specific generated resumes unless Silvia deliberately chooses to publish them.
test_plan:
  - Validate the canonical profile and all three variant definitions against the required resume-data contract.
  - Compile all three variants from a clean checkout using the same command exercised by the site build.
  - Verify every generated PDF contains exactly two pages, selectable text, expected contact details, and its role-specific title.
  - Extract PDF text and verify required career history and approved role-specific evidence without forbidden title or headcount claims.
  - Inspect all six rendered pages for clipping, overlap, illegible typography, incorrect links, or inconsistent branding.
  - Build the site and verify the stable public CV URL contains the Senior variant while the other variants are absent from deployed output.
  - Activate every website CV action and verify it directly downloads the generated Senior resume.
---

# Resume Delivery

## Summary

The resume system turns a single verified professional profile into three focused LaTeX resumes, publishing only the Senior Data Engineer variant while retaining the others for manual applications.

## Behavior

The repository maintains canonical identity, career, education, skills, and achievement content alongside targeted Senior Data Engineer, Forward Deployed Engineer, and Data Leadership variants. Each variant changes its positioning and evidence emphasis without changing the underlying facts. FDE-equivalent work is represented without inventing a past FDE title, and leadership language avoids publishing management headcounts.

All three resumes closely follow the saved Canva resume's restrained black editorial system: narrow margins, a serif display name, centered section headings, thin black rules, compact role/date alignment, filled vector contact icons with complete visible destinations, and a selectable four-column skills grid. Work authorization uses one divider. Each variant balances its complete content across exactly two selectable-text pages.

The Senior variant preserves the saved resume's body wording verbatim except for separately approved website, Spain-phone, work-authorization, and remote-availability additions. The Forward Deployed Engineer and Data Leadership variants retain their targeted positioning and verified evidence while inheriting the same visual system. Every variant includes complete employment and consulting history, both education entries, all certifications and languages, and approved contact and authorization details.

Resume compilation happens during the repository build rather than in the visitor's browser. Only the Senior Data Engineer PDF is copied to the stable public CV destination used by the website. The other two PDFs remain available as non-public build outputs for manual applications.

## Out of scope

The system does not compile documents in the browser, publish non-Senior variants, fabricate claims, tailor itself to arbitrary job descriptions, require pixel-level identity with the old Canva file, submit applications, or commit one-off application artifacts by default. Job-description tailoring belongs to a separate repository skill.

## Open questions

## Implementation notes

Implementation will use a shared canonical content layer, role-specific variant definitions, reusable LaTeX presentation, deterministic build validation, and build-time compilation.
