---
id: profile-about-experience
title: About and Experience
status: implemented
created_at: 2026-07-27
last_modified: 2026-09-07
owner: Silvia Arellano
depends_on: [site-navigation, resume-delivery, contact-inquiry, brand-identity]
acceptance_criteria:
  - The About route presents Silvia's professional biography with a portrait and senior data-engineering positioning.
  - The biography covers experience breadth, core GCP stack, representative quantified outcomes, delivery philosophy, knowledge sharing, and limited personal interests.
  - Experience is separated into Long-term Engagements and Contracts and Advisory.
  - Every timeline entry displays its date range, role, and organization.
  - The timelines shift from two columns on wider screens to one column on smaller screens.
  - A Download Senior Data Engineer résumé action directly downloads the public Senior resume.
  - A Get in Touch action returns visitors to the Home page's Contact section.
  - The page provides career context without requiring interactive controls.
non_goals:
  - Reproduce every responsibility, achievement, skill, or education entry from the resume.
  - Publish management headcounts, references, salary expectations, or sensitive employment details.
  - Duplicate complete project case studies already covered by portfolio-projects.
  - Add timeline filtering, expandable job descriptions, or employer-specific subpages.
  - Turn personal interests into a separate lifestyle profile or photo gallery.
test_plan:
  - Visit the About route at narrow and wide viewport widths and verify the biography, portrait, actions, and timeline layout.
  - Verify every long-term and contract timeline entry displays its date range, role, and organization.
  - Activate Download Senior Data Engineer résumé and verify the public Senior resume downloads directly.
  - Activate Get in Touch and verify the Home page opens at the Contact section.
---

# About and Experience

## Summary

The About page adds professional depth to the portfolio through a narrative biography and concise experience timelines without reproducing the full resume.

## Behavior

Visitors can read Silvia's senior data-engineering biography alongside a professional portrait. The narrative covers her experience across several industries, GCP-focused toolkit, a representative cost-reduction result, preference for durable and maintainable delivery, knowledge-sharing approach, and a small amount of personal context.

Career history is divided into Long-term Engagements and Contracts and Advisory. Each entry shows a date range, role, and organization. The two timelines appear side by side when space permits and stack on smaller screens. Visitors can directly download the public Senior Data Engineer résumé or return to the Contact section.

## Out of scope

The page does not replicate the complete resume, publish detailed education or sensitive employment information, repeat project case studies, add interactive timeline controls or employer subpages, or expand the limited personal context into a lifestyle profile.

## Open questions

## Implementation notes

The page is `src/pages/About/About.jsx`, styled by the brand layer of `src/assets/css/index.css` (`.bio`, `.cv`). The biography sits on a chrome band with the swallow mark above it — everything on chrome is abyss, 10.06 — and the portrait beside it. The timelines sit on the page ground below: a hairline spine per column with a sea marker per entry, the date range as a sea pill with abyss type, then the role and the organization.

The mark is the full-colour primary at roughly 128px, well clear of §7's 64px compact threshold. It carries no shadow, outline or containing shape, and chrome is a permitted ground — the one forbidden ground is sea, where the abyss bird loses contrast.
