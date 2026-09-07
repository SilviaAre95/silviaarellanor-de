---
id: portfolio-projects
title: Portfolio Projects
status: implemented
created_at: 2026-07-27
last_modified: 2026-09-07
owner: Silvia Arellano
depends_on: [site-navigation, contact-inquiry, brand-identity]
acceptance_criteria:
  - The Home page presents a Projects section focused on recent work and business outcomes.
  - Each project card identifies the project, organization or open-source context, year, summary, and available outcome metrics.
  - Open-source projects can link visitors to their public source repositories.
  - Proprietary projects are clearly labeled when source code and demos cannot be shared.
  - Proprietary project cards direct interested visitors to the Contact section.
  - External repository links open separately without replacing the portfolio page.
  - Project cards adapt from one column on smaller screens to two columns on wider screens.
  - Cards remain useful when a project has no outcome metrics or external links.
non_goals:
  - Publish confidential source code, architecture details, or unpublished client information.
  - Fabricate public demos or repository links for proprietary work.
  - Provide project filtering, searching, sorting, or a content-management interface.
  - Function as an issue tracker, contribution portal, or project documentation site.
  - Present every engagement Silvia has completed.
test_plan:
  - Visit the Projects section at small and large viewport widths and verify the responsive card layout.
  - Verify that every card displays its available context, description, metrics, and destination actions.
  - Open each public repository link and verify it uses a separate browsing context.
  - Activate each proprietary-project contact action and verify it reaches the Contact section.
---

# Portfolio Projects

## Summary

The project portfolio presents selected technical work through concise case studies that emphasize business results while respecting the boundaries of proprietary engagements.

## Behavior

Visitors can scan a curated collection of projects. Each card supplies a title, organization or open-source context, year, concise explanation, and outcome metrics when available. Public work can link to its source repository in a separate browsing context.

When work is proprietary and has no public code or demo, the card says so and offers a route to the Contact section for further discussion. The card grid uses a single column on smaller screens and two columns when space allows. Projects without metrics or links still present their available context and summary.

## Out of scope

The portfolio does not disclose confidential code, unpublished architecture or client information, invent public destinations for private projects, offer project search or content management, serve as a contribution portal, or enumerate every engagement Silvia has completed.

## Open questions

## Implementation notes

The project catalog and card behavior are implemented in `src/pages/Projects/Projects.jsx`, styled by the brand layer of `src/assets/css/index.css` (`.work`, `.pcard`). Cards are solid rectangles cycling sea / chrome / abyss, per the composition Silvia supplied. Each sets `--ink` and `--ink-soft` as tokens, so the dark ground inverts the whole card through one modifier rather than per-element overrides; the meta line goes chrome on abyss (10.06). The screenshots sit inset at the top so the card's colour frames them, and are decorative (`alt=""`) — the meta line and title carry the meaning. Outcome figures lead with the label beside them. Footers are pinned to the card bottom so they line up across a row. The section heading reads "Selected work"; the nav item and anchor remain `Projects` / `#projects`.
