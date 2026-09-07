---
id: content-blog
title: Content Blog
status: implemented
created_at: 2026-07-27
last_modified: 2026-09-07
owner: Silvia Arellano
depends_on: [brand-identity]
acceptance_criteria:
  - The Home page presents article cards sourced from Silvia's Medium publication feed.
  - Each card displays the article title, publication date, estimated reading time, and a concise plain-text excerpt.
  - Article links open the original publication in a separate browsing context.
  - Visitors can open Silvia's full Medium profile from the section.
  - The production build refreshes the article snapshot from Medium before compiling the site.
  - Feed markup is converted into readable text, with decorative media and repeated title text removed from excerpts.
  - A failed, unreachable, or empty Medium response does not fail the site build.
  - When the feed cannot be refreshed, the site retains and displays the last committed article snapshot.
  - The deployed site does not need to contact Medium in the visitor's browser to render the section.
non_goals:
  - Host complete article bodies or recreate Medium's reading experience.
  - Provide comments, reactions, subscriptions, search, tags, or article filtering.
  - Offer an editorial content-management interface inside the portfolio.
  - Guarantee real-time publication updates between site builds.
  - Mirror article images, embedded media, or third-party publication styling.
test_plan:
  - Build the site with Medium reachable and verify the generated snapshot contains feed articles with readable metadata and excerpts.
  - Build with the feed unavailable and verify the command succeeds without changing the committed snapshot.
  - Visit the Blog section and verify every article card and the Medium-profile action open their intended external destinations.
  - Load the built site with browser network access disabled and verify the article cards still render.
---

# Content Blog

## Summary

The Blog section surfaces Silvia's published writing through lightweight article summaries while insulating the deployed portfolio from Medium availability.

## Behavior

Visitors see article cards containing a title, publication date, estimated reading time, and concise text excerpt. Each card links to the original publication, and a separate action opens Silvia's complete Medium profile. External destinations open without replacing the portfolio page.

Before a production build, the site attempts to refresh a local article snapshot from Silvia's Medium feed. Feed markup is reduced to readable text for the excerpts. If the feed is unavailable, invalid, or contains no articles, the build continues and preserves the previously committed snapshot. Consequently, visitors do not need a live browser connection to Medium for the section to render.

## Out of scope

The portfolio does not host complete articles, reproduce Medium's full experience, add social or discovery features, supply an editorial CMS, guarantee updates between builds, or mirror article media and publication styling.

## Open questions

## Implementation notes

Rendering lives in `src/pages/Blog/Blog.jsx`, styled by the brand layer of `src/assets/css/index.css` (`.notes`, `.post`). Articles are a list of hairline-divided rows rather than cards, per the composition Silvia supplied: date and reading time, then the title, then the excerpt clamped to two lines, with the action at the far end of the row. Each row is a single anchor, so there is one destination and one target for assistive technology across the whole hit area.

The article data still comes from `src/data/articles.json`, generated at build time by `scripts/fetch-blog.mjs` and committed as the fallback when the feed is unreachable.
