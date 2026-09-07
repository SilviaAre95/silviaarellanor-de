# Personal Website (silviadata.dev)

Silvia's personal site/portfolio — ventures, open-source work, consultancy, blog.

## Wayworks config
- **Stack**: Vite + React (JS, `jsconfig.json`), Tailwind + radix/shadcn-style components (`components.json`), framer-motion + Lenis for motion/scroll
- **Vault note**: `02-Projects/personal-website.md`
- **Linear project**: Personal Website
- **Verify**: `npm run lint && npm run build`
- **Deploy**: `npm run deploy` → gh-pages → GitHub Pages, CNAME **www.silviadata.dev**
- **MCPs used**: none

## Brand
- Visual system: `docs/brand/brand-specification.md` (v1.0). It is normative — MUST rules are non-negotiable.
- Feature spec: `docs/features/brand-identity.md`. Tokens live in `src/assets/css/index.css` and `tailwind.config.js`; the wave is `src/components/BrandWave.jsx`.
- Palette is **closed**: `abyss #0E2019`, `deep #173A2C`, `sea #4FA97F`, `chrome #F2C13D`, `foam #F4F2E7`. No sixth colour, no second font, no shadows, no decorative gradients.
- Text on `--sea` MUST be `--abyss`. `--sea` as text on `--foam` measures 2.56 and fails — links on light grounds are `--deep`.
- Copy is lowercased by `body { text-transform: lowercase }`, never by rewriting source text.
- The swallow mark ships in `public/brand/` (primary / dark / mono / mono-foam), extracted from Silvia's logo sheet. Never redraw or alter it. Never place it on `--sea`, never flip or rotate it, never add an outline or containing shape. Use mono below 32px.
- Icons and the share card are generated from the mark, not hand-made. Regenerate with the scripts noted in `docs/features/brand-identity.md` if the mark ever changes.

## Constraints
- The live domain is **silviadata.dev** — the repo name (`silviaarellanor-de`) is historical; `silviaarellanor.de` does not resolve. Never link or configure the old domain.
- Contact form uses EmailJS with env keys — keys stay in `.env` (see `.env.example`), never committed.
- This is a public personal site: no client names or private project details beyond what Silvia has already published.
