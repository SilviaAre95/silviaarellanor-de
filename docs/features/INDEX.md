# Feature Bank — Index

Source of truth for what this product **does** and **does not** do. Every code change affecting `/src`, `/app`, `/lib`, `/api`, `/components`, `/pages`, or equivalent must preflight against this bank.

## How to use

- Agents: read this file first. Load the relevant feature file(s) before editing code.
- Humans: add new features via the `feature-bank` skill scaffolder, not by hand-editing.
- Spec changes require the diff-first escape hatch described by the feature-bank skill.

## Features

| ID | Title | Status | Summary | Top non-goals |
|----|-------|--------|---------|---------------|
| `site-navigation` | Site Navigation | implemented | Responsive navigation connects routes and home-page sections. | Products in primary navigation; URL hash synchronization while scrolling |
| `profile-hero` | Profile Hero | implemented | Hero introduces Silvia's positioning, availability, and primary visitor actions. | Exhaustive biography; embedded scheduling |
| `profile-skills` | Profile Skills | implemented | Categorized cards present Silvia's day-to-day technical toolkit. | Proficiency ratings; skill search or filtering |
| `portfolio-projects` | Portfolio Projects | implemented | Curated project cards connect technical work to business outcomes. | Confidential project details; project filtering |
| `profile-industries` | Profile Industries | implemented | Animated banner summarizes industries represented in Silvia's experience. | Domain certification claims; interactive industry filtering |
| `content-blog` | Content Blog | implemented | Build-time Medium content presents resilient, externally linked article summaries. | Full article hosting; real-time visitor-side updates |
| `contact-inquiry` | Contact Inquiry | implemented | Validated inquiry form sends consulting messages through configured email delivery. | File uploads; CRM or account storage |
| `contact-booking` | Contact Booking | implemented | External calendar action lets prospective clients schedule an introductory call. | Embedded scheduling; payment collection |
| `profile-about-experience` | About and Experience | implemented | Biography and timelines provide concise professional and personal context. | Full resume duplication; sensitive employment details |
| `resume-delivery` | Resume Delivery | in-progress | Build-time LaTeX produces three truthful, role-targeted, ATS-readable resumes. | Browser compilation; publishing non-Senior variants |
| `site-footer-social` | Footer and Social Links | in-progress | Persistent footer connects legal, professional, social, and email destinations. | Live social feeds; embedded contact or commerce |
| `legal-privacy` | Legal and Privacy | implemented | Provider and privacy disclosures explain site ownership and data handling. | Contract replacement; external-provider guarantees |
| `products-catalog` | Products Catalog | in-progress | Standalone catalog previews Gumroad products pending launch confirmation. | On-site commerce; pre-launch navigation promotion |

<!-- Append new rows above this comment. Keep the summary column ≤ 15 words. -->

## Deprecated

| ID | Title | Deprecated on | Replaced by |
|----|-------|---------------|-------------|
| | | | |

## Conventions

- **Feature IDs**: kebab-case, domain-prefixed (`auth-login`, `billing-invoice`, `search-filters`).
- **Status values**: `proposed` → `in-progress` → `implemented` → `deprecated`.
- **Non-goals**: if empty, the feature has no boundaries. Fix that.
