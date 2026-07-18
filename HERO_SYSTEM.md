# HERO_SYSTEM.md

## Overview

This document defines the premium reusable hero system for QRCodeBarn guide and industry pages.

Goals delivered:

1. Reusable hero component.
2. Modern SaaS-style visual treatment aligned with existing QRCodeBarn branding.
3. Large responsive hero image.
4. Clear page H1 in hero.
5. Short intro paragraph in hero.
6. Primary CTA: "Generate Free QR Code".
7. Secondary CTA: "Browse QR Templates".
8. Mobile-first responsive layout.
9. SEO-safe integration.
10. Schema-safe integration.
11. Accessibility-safe integration.

## Component Design

The component is implemented as a reusable JavaScript module:

- `website/qrcodebarn/assets/hero-system.js`

And paired illustration asset:

- `website/qrcodebarn/assets/hero-guide-qr.svg`

### Runtime behavior

On eligible guide and industry URLs, the module:

1. Injects scoped hero styles once.
2. Detects main/article content structure.
3. Reuses the page's existing H1 text (moves existing H1 node into hero).
4. Creates a short intro paragraph (from `.lead` when present, otherwise first sentence fallback).
5. Renders CTAs:
   - `Generate Free QR Code` -> `/free-qr-code-generator.html`
   - `Browse QR Templates` -> `/qr-code-templates.html`
6. Renders large responsive illustration (`/assets/hero-guide-qr.svg`).

### Eligibility

The module applies to guide/industry URL patterns such as:

- `qr-code-guides`
- `qr-code-industries`
- `qr-code-for-*`
- `qr-codes-for-*`
- `how-*`
- selected core guide slugs (for example `what-is-a-qr-code`, `static-vs-dynamic-qr-codes`).

## Accessibility

Accessibility safeguards:

1. Hero section uses landmark semantics via `<section>`.
2. Hero is labeled with `aria-labelledby` linked to the page H1.
3. H1 remains a real heading element in the DOM (not replaced by plain text).
4. CTA links include readable labels and remain keyboard accessible.
5. Illustration uses descriptive alt text.

## SEO and Schema Safety

SEO/schema protection strategy:

1. No `<head>` metadata changes were made to titles, canonicals, robots, or descriptions.
2. Existing JSON-LD blocks were left intact.
3. Existing H1 content is preserved and moved, not rewritten.
4. Existing body copy remains available in page content.

## Styling Approach

The hero style is intentionally scoped to avoid redesign side effects:

- Scoped class prefix: `.qrb-premium-hero`.
- Mobile-first single-column layout.
- Desktop enhancement to two-column layout at wider breakpoints.
- Brand-consistent palette based on existing blue/teal/orange/ink values.

## Integration Coverage

Coverage is provided in two ways:

1. Pages already loading `assets/app.js`:
   - `app.js` now ensures `hero-system.js` is loaded.
2. Guide/industry pages not loading `app.js`:
   - Explicit `<script src="/assets/hero-system.js" defer></script>` added.

This ensures consistent behavior across guide and industry templates without changing schema structures.

## Reuse Notes

To reuse the system on future guide or industry pages:

1. Ensure the page has a standard main/article structure with an `h1`.
2. Include either:
   - `assets/app.js` (auto-load path), or
   - direct `assets/hero-system.js` script include.
3. Keep existing SEO/schema blocks unchanged in head.

No visual redesign is required; the component overlays the existing template system and keeps page semantics intact.
