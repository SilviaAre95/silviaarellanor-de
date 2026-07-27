---
id: site-footer-social
title: Footer and Social Links
status: in-progress
created_at: 2026-07-27
last_modified: 2026-07-27
owner: Silvia Arellano
depends_on: [legal-privacy]
acceptance_criteria:
  - A fixed footer appears on every route except the standalone Products page.
  - The footer displays the current year, Silvia's name, the OBEXDATA OÜ consulting attribution, and current professional positioning.
  - A Legal and privacy destination opens the site's Legal page.
  - LinkedIn, GitHub, Medium, and Gumroad icons open their correct external profiles separately.
  - The email icon opens a new message addressed to Silvia's professional email.
  - Every icon-only destination has an accessible label matching its actual destination.
  - Footer content stacks on smaller screens and displays in a horizontal arrangement on wider screens.
  - Page content reserves enough lower space for the fixed footer.
non_goals:
  - Display follower counts, recent activity, or live social feeds.
  - Replace the primary header with a complete secondary sitemap.
  - Embed the contact form or booking calendar in the footer.
  - Process Gumroad purchases or display the product catalog directly in the footer.
  - Reproduce complete legal and privacy disclosures inside the footer.
test_plan:
  - Visit each route and verify the footer appears everywhere except Products without covering the final page content.
  - Activate Legal, LinkedIn, GitHub, Medium, Gumroad, and email destinations and verify each target and browsing context.
  - Inspect every icon-only action with accessibility tooling and verify its accessible name matches its destination.
  - Check the footer at narrow and wide viewport widths and verify the intended stacked and horizontal arrangements.
---

# Footer and Social Links

## Summary

The persistent footer provides compact legal, professional, social, and email destinations while reinforcing Silvia's current consulting identity.

## Behavior

Visitors see a fixed footer on all standard site routes, with the Products page retaining its standalone presentation. The footer displays the current year, Silvia's name, OBEXDATA OÜ consulting attribution, and Data Platform Architect positioning.

Visitors can open the Legal page, Silvia's LinkedIn, GitHub, Medium, and Gumroad profiles, or a new email addressed to her professional inbox. External profiles open separately. Icon-only actions expose destination-specific accessible names. The footer stacks its content on smaller screens and arranges it horizontally when space allows.

## Out of scope

The footer does not display live social data, replace primary navigation, embed inquiry or booking flows, process product purchases, show the product catalog, or reproduce the full legal disclosure.

## Open questions

- [ ] Correct the Gumroad action's accessible label, which currently identifies it as Medium.

## Implementation notes

The footer destinations and responsive presentation are implemented in `src/components/Footer.jsx`. Route-level visibility and reserved content space are coordinated by `src/App.jsx`.
