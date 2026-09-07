# Changelog — content-blog

Append-only history of changes to this feature. Newest entries appear first.

---

## 2026-09-07 — rebuilt to the supplied composition

- **Changed**: articles are hairline-divided rows instead of a two-column card grid, per Silvia's reference — date and reading time, title, excerpt, and the action at the far end. Foam ground, abyss type, deep for secondary text, no shadows.
- **Kept**: every entry, straight from the Medium snapshot. The reference showed invented article titles; these are the real six.
- **Kept**: the heading "Blog" and the lede "Notes from real projects, mostly data engineering and AI tooling" — Silvia asked to keep our copy. The reference's headline was "notes from the work."
- **Kept against the reference**: date, reading time and the excerpt. The reference rows carry a title only; three acceptance criteria require all three on every entry, so they are folded into the row rather than dropped.
- **Changed**: each row is one anchor over the whole area, replacing a small "Read More" link. One destination, one announcement, a much larger hit area.
- **Files touched**: src/pages/Blog/Blog.jsx, src/assets/css/index.css

## 2026-09-07

- **Changed**: restyled onto the new brand system (see `brand-identity`) — **reverted the same day**, see the brand-identity changelog
- **Detail**: Blog takes the abyss ground with deep article cards, chrome read-time and links, and a chrome Medium action.
- **Behaviour**: unchanged — no structure, copy, route, or interaction was altered
- **Acceptance criteria**: all re-verified against the restyled surface; none amended
- **Files touched**: src/pages/Blog/Blog.jsx

## 2026-07-27

- **Backfilled from existing code** as part of the V0 feature bank
- **Status**: implemented (inferred from code presence)
- **Acceptance criteria**: extracted behaviorally from code
- **Non-goals**: confirmed interactively with the user
- **Source commit**: `7c03f8a`
