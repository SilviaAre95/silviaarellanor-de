---
id: products-catalog
title: Products Catalog
status: in-progress
created_at: 2026-07-27
last_modified: 2026-07-27
owner: Silvia Arellano
depends_on: []
acceptance_criteria:
  - The Products route presents a standalone Digital Products page without the portfolio's global header or footer.
  - A sticky page header identifies the catalog and provides a route back to the portfolio.
  - The catalog presents four data-engineering products with a title, price, description, included features, and category icon.
  - Product cards adapt from one column on smaller screens to two columns on wider screens.
  - Each purchase action opens its corresponding Gumroad destination separately.
  - The page communicates the currently stated 30-day money-back guarantee.
  - The route remains directly accessible for review while its primary-navigation entry is intentionally hidden.
  - Public navigation is enabled only after the listed products, pricing, Gumroad destinations, and guarantee are confirmed ready.
non_goals:
  - Process payments, fulfill orders, or manage refunds within the portfolio.
  - Create customer accounts, order history, subscriptions, licenses, or download storage.
  - Synchronize product data, pricing, or availability from Gumroad in real time.
  - Promote the Products route through primary navigation before launch approval.
  - Provide free previews, reviews, ratings, coupons, bundles, or personalized recommendations.
test_plan:
  - Visit the Products route directly and verify the standalone header, all four product cards, the guarantee, and the portfolio return action.
  - Check the catalog at narrow and wide viewport widths and verify one-column and two-column layouts.
  - Activate each Gumroad action and verify the configured product destination opens separately.
  - Verify the primary site navigation does not expose Products before launch approval.
  - Before launch, confirm every product description, price, destination, and guarantee against the live Gumroad catalog.
---

# Products Catalog

## Summary

The Products page previews a standalone catalog of paid data-engineering resources while launch readiness and external listings are being finalized.

## Behavior

Visitors who open the route directly see a dedicated Digital Products presentation with a sticky header and route back to the main portfolio. Four product cards present their titles, prices, descriptions, included features, and category icons. Cards use one column on smaller screens and two columns when space allows.

Each purchase action opens the configured Gumroad destination separately. The page also displays the current 30-day money-back guarantee. Until the catalog content and external destinations receive launch approval, the Products destination remains absent from primary navigation.

## Out of scope

The portfolio does not process commerce or fulfillment, manage customer accounts or purchases, synchronize Gumroad data, promote the catalog before launch approval, or provide discovery and promotional features such as previews, reviews, coupons, bundles, or recommendations.

## Open questions

- [ ] Confirm every product, price, Gumroad destination, and guarantee before exposing Products in primary navigation.

## Implementation notes

The catalog content, responsive cards, purchase destinations, guarantee, and standalone header are implemented in `src/pages/Products/Products.jsx`. Primary-navigation visibility is controlled in `src/pages/Header/Header.jsx`.
