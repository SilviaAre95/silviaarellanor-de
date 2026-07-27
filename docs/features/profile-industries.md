---
id: profile-industries
title: Profile Industries
status: implemented
created_at: 2026-07-27
last_modified: 2026-07-27
owner: Silvia Arellano
depends_on: []
acceptance_criteria:
  - The Home page displays a clearly labeled Industries I've Worked In banner between the Projects and Blog sections.
  - The banner lists Real Estate, Enterprise, Marketing, Sports Analytics, Tax, Healthcare, E-commerce, HR Tech, and SaaS.
  - Each industry is represented by both a readable label and a supporting icon.
  - Industry items move continuously across the page in a seamless visual loop.
  - Edge treatments keep entries visually readable as they enter and leave the banner.
  - Industry labels remain on a single line and preserve their shape across viewport sizes.
non_goals:
  - Claim domain certification or deep subject-matter expertise in every listed industry.
  - Replace project case studies with detailed industry-specific engagement descriptions.
  - Make industries clickable destinations or filtering controls.
  - Load industry history from an external service or content-management system.
  - Provide manual carousel navigation or personalized industry ordering.
test_plan:
  - Visit the Home page and verify the banner appears between Projects and Blog with all nine industry labels.
  - Observe a complete animation cycle and verify that the sequence loops without a visible content gap.
  - Check the banner at narrow and wide viewport widths and verify that labels remain intact and edge treatments remain visible.
---

# Profile Industries

## Summary

The industries banner gives visitors a compact view of the business contexts represented in Silvia's experience without repeating the project portfolio.

## Behavior

Visitors see a labeled horizontal banner between Projects and Blog. It presents nine industries—Real Estate, Enterprise, Marketing, Sports Analytics, Tax, Healthcare, E-commerce, HR Tech, and SaaS—using both text labels and visual icons.

The items move continuously in a seamless loop. Labels keep their shape instead of wrapping, and visual fades at either edge soften their entry and exit from the visible area.

## Out of scope

The banner does not claim certification or equivalent domain depth, replace detailed project case studies, provide clickable industry destinations or filters, retrieve its content externally, offer manual carousel controls, or personalize the sequence.

## Open questions

## Implementation notes

The industry inventory, loop duplication, and banner presentation are defined in `src/components/IndustryBanner.jsx`.
