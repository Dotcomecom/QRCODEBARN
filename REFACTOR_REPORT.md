# REFACTOR_REPORT.md

## Refactor objective

Implement a reusable component system for QRCodeBarn based on `COMPONENT_LIBRARY.md`, without changing branding, URLs, metadata intent, schema placement, or accessibility semantics.

## Scope completed in this pass

This implementation introduces a component folder, a lightweight runtime loader, and representative page adoption on high-traffic templates.

## New component files

Created under `website/qrcodebarn/components/`:

1. `hero.html`
2. `editorial-review.html`
3. `cta.html`
4. `related-guides.html`
5. `faq.html`
6. `industry-example.html`
7. `generate-qr-panel.html`
8. `footer-trust.html`
9. `faq-qr-code-for-pdf.html` (page-specific FAQ content component preserving original copy)

## Runtime integration

Updated `website/qrcodebarn/assets/app.js` to add a minimal component loader:

- Scans for nodes with `data-component`
- Loads partial HTML from `/components/{name}.html`
- Supports `data-component-file` override for page-specific component content
- Replaces placeholder node with loaded component markup
- Preserves existing generator behavior by initializing QR form logic after component loading

## Template adoption completed

1. `website/qrcodebarn/index.html`
- Replaced inline hero block with `data-component="hero"`
- Replaced inline trust/editorial block with `data-component="editorial-review"`

2. `website/qrcodebarn/qr-code-for-pdf.html`
- Replaced inline FAQ block with `data-component="faq" data-component-file="faq-qr-code-for-pdf.html"`
- Preserved the exact original FAQ content via the page-specific component file

## Behavioral safeguards

- Loader runs before QR form initialization to avoid missing-element race conditions.
- Existing QR IDs used across templates are supported (`qrOut`, `qrOutput`, `qrcode`).
- Existing download button ID variants are supported (`downloadPng`, `download_png`, `downloadSvg`, `download_svg`).

## Maintenance impact estimate

### Immediate reduction

- Homepage: large hero generator + editorial trust section no longer maintained inline in the page.
- PDF page: FAQ section moved into component file, preserving content while allowing reusable structure.

### Estimated benefit

- ~180-220 lines of repeated template markup removed from active page templates in this pass.
- Future edits to shared hero/editorial/FAQ structures can now be made in one place.

## Residual work for full rollout

1. Adopt component placeholders across additional tool pages with repeated hero + FAQ patterns.
2. Introduce page-specific `data-component-file` mappings where SEO-critical copy differs by page.
3. Gradually migrate related-links, CTA, and footer-trust sections where exact visual parity is confirmed.
4. Optionally add build-time component expansion later if runtime fetch-based includes should be replaced.

## Risk notes

- The runtime include model depends on server path availability for `/components/*`.
- If pages are opened directly via `file://`, component fetching may not work due to browser origin restrictions.
- No URL, canonical path, schema block, or metadata intent changes were introduced by this refactor pass.

## Files modified

- `website/qrcodebarn/assets/app.js`
- `website/qrcodebarn/index.html`
- `website/qrcodebarn/qr-code-for-pdf.html`
- `website/qrcodebarn/components/hero.html`
- `website/qrcodebarn/components/editorial-review.html`
- `website/qrcodebarn/components/cta.html`
- `website/qrcodebarn/components/related-guides.html`
- `website/qrcodebarn/components/faq.html`
- `website/qrcodebarn/components/industry-example.html`
- `website/qrcodebarn/components/generate-qr-panel.html`
- `website/qrcodebarn/components/footer-trust.html`
- `website/qrcodebarn/components/faq-qr-code-for-pdf.html`
