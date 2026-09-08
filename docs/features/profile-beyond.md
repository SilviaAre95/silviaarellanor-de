---
id: profile-beyond
title: Beyond the Code
status: implemented
created_at: 2026-09-08
last_modified: 2026-09-08
owner: Silvia Arellano
depends_on: [profile-about-experience, brand-identity]
acceptance_criteria:
  - The About route ends with a "Beyond the code" section placed after the experience timelines.
  - The section opens with a short first-person introduction in Silvia's own words: Cozumel, the athlete years, and her current hobbies.
  - The section presents one card per personal pursuit, each with a title and a one- or two-sentence first-person note.
  - A pursuit with a photo shows it inset at the top of its card in full colour, a stated exception to the brand book's §6; a pursuit without a photo renders as a text card.
  - Card grounds cycle chrome, sea, deep, and text on every ground meets the brand contrast table.
  - Pursuits are defined in a data file; adding, removing, or reordering one requires no component change.
  - The grid shows three columns from 1060px, two from 700px, and one below.
  - Photos ship as WebP no wider than 900px on the long side.
non_goals:
  - Publish a dated log or feed of activities in this version.
  - Add a dedicated route, a navigation entry, or a photo gallery with lightbox.
  - Add captions, dates, or locations to photos.
  - Publish other people's faces without their consent.
  - Invent facts, numbers, or anecdotes about the pursuits; the copy states only what Silvia has said.
test_plan:
  - Visit /about at 400px, 800px, and 1200px widths and verify the section sits after both timelines with one, two, and three columns.
  - Verify each card shows its title and note, that cards with a photo show it tinted and cards without show text only.
  - Remove a pursuit from src/data/beyond.js in dev and verify the grid recomposes without errors.
---

# Beyond the Code

## Summary

A closing section on the About page that shows what Silvia does outside data work: padel, track and field, freediving, home barista, science, and the dogs. It gives the biography a human ending without diluting the home page, which stays the professional pitch.

## Behavior

After the experience timelines, visitors reach "Beyond the code": Silvia's own three-paragraph introduction. Below sits a grid of pursuit cards. Each card has a title and a short first-person note; most carry a full-colour photo at the top. The grid recomposes from three columns to one as the viewport narrows.

## Out of scope

No dated log, feed, or route in this version; if Silvia posts regularly the section lifts into its own page by moving one import and adding a nav link. No photo captions or locations. Photos are full colour by Silvia's decision; §6 of the brand book is read as covering portraits of her. No faces other than Silvia's without the person's consent; the friend in the padel photo is covered with an emoji. No invented copy.

## Open questions

None. Follow-ups: a Freediving card returns when a photo is added to the album; the biography's outside-work paragraph overlaps this section and is Silvia's call.

## Implementation notes

`src/pages/About/Beyond.jsx` renders `pursuits` from `src/data/beyond.js`; photos live in `src/assets/images/beyond/`. Styles are the `.beyond` and `.bcard` blocks in `src/assets/css/index.css`. Photos are shown as exported, resized to WebP.
