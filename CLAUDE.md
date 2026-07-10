# Personal Website (silviadata.dev)

Silvia's personal site/portfolio — ventures, open-source work, consultancy, blog.

## Wayworks config
- **Stack**: Vite + React (JS, `jsconfig.json`), Tailwind + radix/shadcn-style components (`components.json`), framer-motion + Lenis for motion/scroll
- **Vault note**: `02-Projects/personal-website.md`
- **Linear project**: Personal Website
- **Verify**: `npm run lint && npm run build`
- **Deploy**: `npm run deploy` → gh-pages → GitHub Pages, CNAME **www.silviadata.dev**
- **MCPs used**: none

## Constraints
- The live domain is **silviadata.dev** — the repo name (`silviaarellanor-de`) is historical; `silviaarellanor.de` does not resolve. Never link or configure the old domain.
- Contact form uses EmailJS with env keys — keys stay in `.env` (see `.env.example`), never committed.
- This is a public personal site: no client names or private project details beyond what Silvia has already published.
