---
id: profile-hero
title: Profile Hero
status: implemented
created_at: 2026-07-27
last_modified: 2026-07-27
owner: Silvia Arellano
depends_on: [site-navigation]
acceptance_criteria:
  - The Home page opens with Silvia's name and Data Platform Architect positioning.
  - The hero communicates current availability for consulting engagements.
  - A rotating role label highlights several areas of data-platform expertise.
  - The introduction summarizes Silvia's focus on GCP platforms, pipelines, warehouses, infrastructure, and AI-assisted development.
  - A primary call to action takes visitors to the Contact section.
  - A secondary call to action takes visitors to the Projects section.
  - The hero includes a professional photograph with meaningful alternative text.
  - The presentation adapts from a two-column desktop layout to a stacked mobile layout.
  - A visible cue encourages visitors to continue scrolling.
non_goals:
  - Present an exhaustive biography, career history, or education record.
  - Embed appointment scheduling directly in the hero.
  - Display a personal photo gallery or non-professional personal information.
  - Personalize the hero based on visitor identity or location.
  - Represent availability as a live staffing calendar or guaranteed start date.
test_plan:
  - Visit the Home page at desktop and mobile widths and verify the hero content, photograph, and responsive layout.
  - Observe the rotating role label long enough to verify that multiple specialties appear without overflowing its container.
  - Activate both calls to action and verify that they reach the Contact and Projects sections.
---

# Profile Hero

## Summary

The profile hero introduces Silvia's professional positioning, communicates consulting availability, and directs visitors toward the two highest-value next steps.

## Behavior

The Home page opens with Silvia's name, Data Platform Architect positioning, consulting availability, and a rotating set of related specialties. A concise introduction describes her focus on GCP data platforms, ETL pipelines, BigQuery warehouses, surrounding infrastructure, and open-source AI-assisted development.

Visitors can move directly to the Contact section through the primary call to action or review portfolio work through the Projects call to action. A professional photograph reinforces the introduction, and a scroll cue signals that more content follows. The content shifts from a side-by-side composition on larger screens to a stacked layout on smaller screens.

## Out of scope

The hero does not duplicate the full biography, career history, or education content. It does not embed appointment scheduling, publish personal photo collections or non-professional details, personalize content by visitor, or promise availability through a live staffing calendar.

## Open questions

## Implementation notes

The hero is rendered by `src/pages/Hero/Hero.jsx`, with rotating specialties provided by the shared FlipWords component.
