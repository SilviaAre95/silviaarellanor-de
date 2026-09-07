---
id: profile-skills
title: Profile Skills
status: implemented
created_at: 2026-07-27
last_modified: 2026-09-07
owner: Silvia Arellano
depends_on: [site-navigation, brand-identity]
acceptance_criteria:
  - The Home page presents a dedicated Skills section describing Silvia's day-to-day toolkit.
  - Skills are organized into Programming and Development, Data Engineering and ETL, Databases and Warehouses, Cloud and Infrastructure, Analytics and BI Tools, and AI and Agents.
  - Every listed technology is presented with a readable name and a supporting visual icon.
  - Category cards provide visible hover feedback without hiding their content.
  - The section adapts from one column on small screens to two and then three columns on wider screens.
  - The complete skill inventory remains readable without requiring filtering or interaction.
non_goals:
  - Assign proficiency percentages, star ratings, or years of experience to individual skills.
  - Claim certifications or independently verify professional competency.
  - Provide skill search, filtering, sorting, or visitor personalization.
  - Import endorsements or skill data from LinkedIn or other external services.
  - Duplicate the resume's complete ATS keyword inventory or role-specific skill ordering.
test_plan:
  - Visit the Skills section at small, medium, and large viewport widths and verify the responsive category layout.
  - Verify that all six categories and every named skill are visible and readable without interaction.
  - Hover category cards and individual skill labels to verify feedback without content loss.
---

# Profile Skills

## Summary

The Skills section gives visitors a quickly scannable view of Silvia's working toolkit across software, data, cloud, analytics, and AI disciplines.

## Behavior

Visitors can review Silvia's skills in six labeled categories: Programming and Development, Data Engineering and ETL, Databases and Warehouses, Cloud and Infrastructure, Analytics and BI Tools, and AI and Agents. Each technology appears as a named item with an accompanying icon.

The category cards provide decorative hover feedback while keeping all information visible. Their layout responds to available space, progressing from one column on small screens to two and then three columns on wider screens.

## Out of scope

The section does not score proficiency, assert certifications, verify competencies, support search or filters, personalize the list, import third-party endorsements, or reproduce every role-specific keyword used in tailored resumes.

## Open questions

## Implementation notes

The categories and skill cards are defined in `src/pages/Skills/Skills.jsx`. The section renders on the abyss ground with each category in its own deep rectangle. Chips are outlined rather than filled — foam text on a foam hairline — and sea appears only as a short rule above each category heading and on chip hover. Filling forty chips with chrome and sea made the palette the design; foam and abyss carry the page. Styling lives in the brand layer of `src/assets/css/index.css` (`.stack`, `.stackcard`, `.chip`) rather than in the shadcn card and badge components. Skill icons come from `react-icons` and `lucide-react` and inherit the chip's colour — vendor brand colours are outside the closed palette.
