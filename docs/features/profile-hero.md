---
id: profile-hero
title: Profile Hero
status: implemented
created_at: 2026-07-27
last_modified: 2026-09-07
owner: Silvia Arellano
depends_on: [site-navigation, brand-identity]
acceptance_criteria:
  - The Home page opens with Silvia's positioning statement, and her name and role are present in the header lockup and the portrait tag.
  - The introduction summarizes Silvia's focus on GCP platforms, pipelines, warehouses, infrastructure, and AI-assisted development.
  - A primary call to action takes visitors to the Contact section.
  - A roster strip immediately below the hero lists the services Silvia is brought in for.
  - A secondary call to action takes visitors to the Projects section.
  - The hero includes a professional photograph with meaningful alternative text, presented as a circle inside a partial accent arc.
  - The presentation adapts from a two-column desktop layout to a stacked mobile layout.
non_goals:
  - Present an exhaustive biography, career history, or education record.
  - Embed appointment scheduling directly in the hero.
  - Display a personal photo gallery or non-professional personal information.
  - Personalize the hero based on visitor identity or location.
  - Represent availability as a live staffing calendar or guaranteed start date.
test_plan:
  - Visit the Home page at desktop and mobile widths and verify the hero content, photograph, and responsive layout.
  - Activate both calls to action and verify that they reach the Contact and Projects sections.
---

# Profile Hero

## Summary

The profile hero states what Silvia does and what the client gets from it, and directs visitors toward the two highest-value next steps.

## Behavior

The Home page opens with a two-line positioning statement: what Silvia builds, then what the client gets, with the second line carrying the accent colour. A concise introduction describes her focus on GCP data platforms, ETL pipelines, BigQuery warehouses, surrounding infrastructure, and open-source AI-assisted development. Her name and role appear in the header lockup and on the portrait tag.

Visitors can move directly to the Contact section through the primary call to action or review portfolio work through the Projects call to action. A professional photograph reinforces the introduction, and a scroll cue signals that more content follows. The content shifts from a side-by-side composition on larger screens to a stacked layout on smaller screens.

## Out of scope

The hero does not duplicate the full biography, career history, or education content. It does not embed appointment scheduling, publish personal photo collections or non-professional details, personalize content by visitor, or promise availability through a live staffing calendar.

## Open questions

## Implementation notes

The hero is rendered by `src/pages/Hero/Hero.jsx`, with rotating specialties provided by the shared FlipWords component.
