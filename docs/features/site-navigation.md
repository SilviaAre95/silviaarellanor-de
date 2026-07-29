---
id: site-navigation
title: Site Navigation
status: implemented
created_at: 2026-07-27
last_modified: 2026-07-27
owner: Silvia Arellano
depends_on: []
acceptance_criteria:
  - A fixed responsive header is available on the Home, About, and Legal pages.
  - Desktop navigation exposes Home, Skills, Projects, Blog, Contact, and About destinations.
  - Mobile navigation collapses behind a menu button and closes after a destination is selected.
  - Home-section links scroll smoothly to their corresponding sections without hiding content behind the fixed header.
  - Selecting a home section from another route navigates to that section on the Home page.
  - The active home-section link updates as the visitor scrolls through the Home page.
  - About uses a dedicated route and receives an active visual state when visited.
  - Route changes without a section destination reset the page to the top.
  - The Products route uses its own presentation without the global header.
non_goals:
  - Expose Products in the primary navigation while its launch is paused.
  - Synchronize the URL hash continuously as the visitor scrolls.
  - Add authentication, user-specific navigation, breadcrumbs, or search.
  - Define footer or social navigation behavior.
  - Change the current route structure or add a custom not-found page during the V0 backfill.
test_plan:
  - Visit the Home page at desktop and mobile widths and verify every visible navigation destination.
  - Select each Home section from both the Home and About pages and verify the resulting scroll position.
  - Scroll through the Home page and verify that the active navigation state follows the visible section.
  - Visit About, Legal, and Products directly and verify route position and global-header visibility.
---

# Site Navigation

## Summary

The site navigation gives visitors a consistent way to move between dedicated pages and the main portfolio sections while preserving a compact responsive presentation.

## Behavior

Visitors see a fixed navigation header on the Home, About, and Legal pages. On larger screens, its destinations are displayed inline. On smaller screens, the destinations are contained in a collapsible menu that closes after a selection.

Home, Skills, Projects, Blog, and Contact navigate to sections on the Home page using smooth scrolling with space reserved for the fixed header. These destinations work from both the Home page and dedicated routes. The active Home-page destination follows the visitor's scroll position. About opens as a dedicated page and displays its own active state.

Dedicated route changes start at the top unless the destination includes a Home-page section. The Products page deliberately omits the global header and uses its own presentation.

## Out of scope

Products remains absent from primary navigation until its launch is resumed. The navigation does not rewrite the URL hash as visitors scroll, personalize itself for authenticated users, provide breadcrumbs or search, define footer links, restructure routes, or provide a custom not-found experience.

## Open questions

## Implementation notes

Routing and route-level scroll behavior are coordinated by `src/App.jsx`. The responsive header and section-aware navigation live in `src/pages/Header/Header.jsx`.
