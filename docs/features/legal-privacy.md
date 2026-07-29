---
id: legal-privacy
title: Legal and Privacy
status: implemented
created_at: 2026-07-27
last_modified: 2026-07-27
owner: Silvia Arellano
depends_on: [contact-inquiry]
acceptance_criteria:
  - The Legal route identifies the site as Silvia Arellano's personal site and names OBEXDATA OÜ as the entity contracting consulting engagements.
  - Provider information includes the company name, registry code, registered address, VAT number, and contact email.
  - The privacy notice explains which contact-form fields are processed, the delivery provider involved, and the inquiry-response purpose.
  - The notice states that inquiry data is not used for marketing lists or sold and is retained only as needed for the conversation.
  - Visitors are told how to request deletion of inquiry data.
  - The page discloses that the site itself sets no cookies and uses no analytics or advertising trackers.
  - GitHub Pages is identified as the hosting provider, with a link to GitHub's privacy statement and a notice about possible technical request logging.
  - The page summarizes access, correction, deletion, and supervisory-complaint rights under the GDPR.
  - Visitors can return directly to the main site.
non_goals:
  - Replace engagement-specific contracts, terms, statements of work, or professional legal advice.
  - Publish private shareholder, banking, identity-document, or internal company information.
  - Add a cookie-consent banner while the site sets no cookies or trackers.
  - Guarantee or control the privacy practices of EmailJS, GitHub, or other external providers.
  - Provide translated notices or jurisdiction-specific policies beyond the current EU and GDPR-oriented disclosure.
test_plan:
  - Visit the Legal route and verify all provider identity fields, privacy topics, and the return action are present.
  - Activate the provider email and GitHub privacy links and verify their intended destinations and browsing contexts.
  - Compare the listed contact-form fields and processors with the current inquiry and hosting behavior.
  - Inspect the deployed site for analytics, advertising trackers, or first-party cookies that would contradict the notice.
---

# Legal and Privacy

## Summary

The Legal page identifies the people and entity behind the site and explains how inquiry and hosting data are handled.

## Behavior

Visitors can identify Silvia Arellano as the owner of the personal site and OBEXDATA OÜ as the entity through which consulting engagements are contracted. The page provides the company's registry code, registered address, VAT number, and email contact.

The privacy notice identifies the information submitted through the inquiry form, EmailJS as the delivery provider, the limited response and engagement-follow-up purpose, retention expectations, and deletion route. It states that the site itself sets no cookies and uses no analytics or advertising trackers. It also identifies GitHub Pages as the host, links to GitHub's privacy statement, and notes possible technical request logging.

Visitors receive a concise summary of GDPR access, correction, deletion, and complaint rights and can return to the main site.

## Out of scope

The notice does not replace contracts or legal advice, expose private company or identity information, add unnecessary cookie consent, guarantee external-provider practices, or supply translations and jurisdiction-specific notices beyond its current EU and GDPR scope.

## Open questions

## Implementation notes

The provider identification, privacy notice, external disclosure, and return destination are implemented in `src/pages/Legal/Legal.jsx`.
