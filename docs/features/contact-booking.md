---
id: contact-booking
title: Contact Booking
status: implemented
created_at: 2026-07-27
last_modified: 2026-07-27
owner: Silvia Arellano
depends_on: [contact-inquiry]
acceptance_criteria:
  - The Contact section offers a clearly labeled Book an intro call action when a booking destination is configured.
  - The booking action is visually distinct from the inquiry form and includes a calendar cue.
  - Activating the action opens Silvia's Google Calendar appointment page separately without replacing the portfolio.
  - Available times, timezone presentation, visitor details, and appointment confirmation are handled by the external scheduling provider.
  - The inquiry form and displayed email remain available as alternatives to booking a call.
  - If no booking destination is configured, the booking action is omitted without breaking the rest of the Contact section.
non_goals:
  - Embed or recreate a scheduling calendar inside the portfolio.
  - Manage availability, rescheduling, cancellation, reminders, or meeting links directly in the site.
  - Route visitors among multiple calendars or team members.
  - Collect payment or require a paid consultation during booking.
  - Guarantee that a particular date, timezone, or appointment slot is available.
test_plan:
  - Visit the Contact section with a configured booking destination and verify the booking action is visible and distinct.
  - Activate the booking action and verify the configured Google Calendar page opens separately.
  - Remove the booking destination in a development checkout and verify the Contact section still renders with inquiry alternatives.
---

# Contact Booking

## Summary

The booking action gives prospective clients a direct path to schedule an introductory conversation while delegating calendar management to a dedicated provider.

## Behavior

When a booking destination is configured, visitors see a visually distinct Book an intro call action with a calendar cue in the Contact section. Activating it opens Silvia's Google Calendar appointment page separately, preserving the portfolio page.

Google Calendar controls available times, timezone handling, attendee details, and confirmation. Visitors who prefer not to schedule can still use the inquiry form or displayed email address. Omitting the booking destination removes only the booking action.

## Out of scope

The portfolio does not embed a scheduler, manage calendar operations or meeting logistics, route visitors across multiple calendars, collect consultation payments, or promise availability for a specific slot or timezone.

## Open questions

## Implementation notes

The conditional booking action and its configured Google Calendar destination are defined alongside the Contact experience in `src/pages/Contact/Contact.jsx`.
