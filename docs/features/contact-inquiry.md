---
id: contact-inquiry
title: Contact Inquiry
status: implemented
created_at: 2026-07-27
last_modified: 2026-07-27
owner: Silvia Arellano
depends_on: []
acceptance_criteria:
  - The Contact section explains Silvia's consulting scope, expected response time, and working principles.
  - Visitors can see Silvia's professional email address and base location.
  - The inquiry form collects name, email, subject, and message.
  - All four fields are required, and email input must resemble a valid email address.
  - Invalid submissions remain on the page and show field-specific errors plus an overall correction message.
  - Valid submissions are sent through the configured email service.
  - Successful submission displays confirmation and clears the completed form and validation errors.
  - Failed submission displays an error while retaining the visitor's entered information.
  - Email-service identifiers are supplied through environment configuration rather than committed credentials.
non_goals:
  - Accept file attachments, resumes, or other uploaded documents.
  - Create visitor accounts or retain inquiries in a site-owned database.
  - Generate automated estimates, proposals, or contractual commitments.
  - Provide live chat, telephone support, or guaranteed immediate replies.
  - Implement a CRM, mailing list, CAPTCHA, or advanced spam-management system.
test_plan:
  - Submit the empty form and verify every required field displays an error with no delivery attempt.
  - Enter an invalid email with otherwise valid content and verify the email-specific error.
  - Submit valid content against a working email-service configuration and verify confirmation plus form reset.
  - Simulate a delivery failure and verify an error appears while the entered content remains available.
  - Inspect a production build and verify no non-public email-service secrets are committed into repository files.
---

# Contact Inquiry

## Summary

The inquiry flow lets prospective clients understand Silvia's consulting approach and send a structured project message without leaving the portfolio.

## Behavior

The Contact section describes the kinds of engagements Silvia accepts, communicates an expected response window, and explains her senior-only, documentation-first, and honest-scoping principles. Her professional email address and base location are visible as alternative contact context.

Visitors can submit their name, email, subject, and message. Empty fields and malformed email addresses produce inline errors and an overall correction message without attempting delivery. Valid content is sent through the configured email service. Success clears the form and confirms delivery; failure reports the problem while preserving the entered content.

## Out of scope

The form does not accept files, create accounts, store inquiries in a site-owned database, produce estimates or contracts, provide real-time support, guarantee immediate replies, or operate as a CRM, mailing list, CAPTCHA, or advanced spam-management system.

## Open questions

## Implementation notes

The section, client-side validation, status handling, and EmailJS delivery are implemented in `src/pages/Contact/Contact.jsx`. Public EmailJS identifiers are configured with Vite environment variables documented by `.env.example`.
