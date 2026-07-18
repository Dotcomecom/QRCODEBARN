# COMPONENT_AUDIT.md

## Audit Scope

Date: 2026-07-18

Target: QRCodeBarn runtime component system implemented via placeholder injection and partial HTML files.

Reviewed assets:

- website/qrcodebarn/assets/app.js
- website/qrcodebarn/components/*.html
- website/qrcodebarn/index.html
- website/qrcodebarn/qr-code-for-pdf.html

Runtime verification was completed against a local HTTP server using real browser rendering.

## Essential Fixes Applied During Audit

The following minimal production-safety fixes were applied in website/qrcodebarn/assets/app.js:

1. Added fetch timeout (AbortController, 3s) to avoid long hangs.
2. Added graceful fallback rendering when component fetch fails.
3. Added basic sanitization of injected component HTML (strip script tags and inline on* handlers).
4. Switched component fetch cache policy from no-store to default to allow browser caching.

No styling redesign or component visual redesign was performed.

## Verification Matrix

### 1) All component partials load correctly

Status: PASS

- All placeholders resolve to existing files.
- Verified live render includes injected hero and trust sections on homepage.
- Verified live render includes injected FAQ section on QR Code for PDF page.

### 2) No page blocks rendering if a component fails

Status: PASS (after essential fix)

- Simulated network failure for hero partial.
- Page still renders and fallback content appears.
- Remaining content and navigation remain available.

### 3) Components degrade gracefully

Status: PASS WITH NOTE

- Critical components now show fallback content instead of blank sections.
- Non-critical failures show a plain temporary-unavailable notice.
- Degradation is functional; not visually identical.

### 4) SEO is preserved after component injection

Status: PARTIAL / CONDITIONAL PASS

- Canonical tags, metadata, structured data blocks in head remain unchanged.
- Rendered DOM contains injected content once JS executes.
- Raw HTML source no longer contains full injected body content for componentized sections.

### 5) Google can still index all injected content

Status: PARTIAL / CONDITIONAL PASS

- Google Web Rendering Service can index rendered JS content in normal conditions.
- There is still dependency on successful JS execution and component fetch response.
- Risk remains for crawlers with limited rendering or transient fetch failures.

### 6) Accessibility is unchanged or improved

Status: PASS WITH NOTE

- Injected sections preserve semantic elements (headings, links, details/summary).
- Fallback states provide readable text instead of empty containers.
- No new keyboard traps or script-driven focus issues found in audited pages.

### 7) There are no duplicate IDs introduced

Status: PASS

- Checked effective rendered markup for homepage and QR Code for PDF page after injection.
- No duplicate IDs detected.

### 8) Event handlers continue to work

Status: PASS (componentized paths)

- Homepage generator initializes after component loading and continues to generate output.
- Download PNG link continues to populate and function.
- FAQ injection is content-only and does not break page interaction.

Note:
- Some non-componentized long-tail pages use a separate generator script model; that is outside this component audit scope.

### 9) Components do not introduce layout shift (CLS)

Status: CONCERN

- Placeholder sections are injected after initial parse.
- Large hero replacement can introduce visual movement in slower networks/devices.
- No explicit reserved space strategy is implemented for placeholders.

### 10) Page load performance impact

Status: ACCEPTABLE WITH OVERHEAD

- Homepage adds two extra network requests (/components/hero.html and /components/editorial-review.html).
- QR Code for PDF adds one extra request for FAQ partial.
- Measured local load remained fast, but global impact depends on latency.
- Cache policy update reduces repeated fetch overhead compared to previous no-store behavior.

### 11) Browser compatibility

Status: MODERN-BROWSER PASS

- Loader uses Promise, fetch, template parsing, and AbortController.
- Works in current Chromium/WebKit/Firefox families.
- Legacy browsers without fetch/AbortController support are not explicitly polyfilled.

### 12) Search Console compatibility

Status: PASS WITH MONITORING REQUIRED

- No changes to canonical, index/follow directives, or schema block placement.
- JS-rendered content means URL Inspection should be used to confirm rendered HTML snapshots after deploy.
- Soft-failure rendering is now safer due to fallbacks.

### 13) AdSense compatibility

Status: PASS

- AdSense script tags and ad placeholders remain unchanged in audited pages.
- Component fetches are same-origin and do not modify ad script loading order directly.
- No blocking of ad regions observed from component failures.

### 14) Security review of component loading

Status: IMPROVED / STILL REQUIRES HARDENING

Improvements made:

- Strip script tags from injected HTML.
- Strip inline event handler attributes from injected HTML.
- Timeout control reduces prolonged fetch hang behavior.

Residual risks:

- Injection still trusts same-origin component files.
- A compromised component file can still inject unsafe non-script payloads (for example malicious links/content).
- No CSP policy is enforced at this layer.

### 15) Caching recommendations

Status: RECOMMENDATIONS PROVIDED

Recommended production caching policy:

1. Serve /components/*.html with Cache-Control: public, max-age=300, stale-while-revalidate=86400.
2. Use ETag or Last-Modified validators on component partials.
3. If a release pipeline exists, add revision query strings on component URLs for deterministic busting.
4. Keep app.js fingerprinted/versioned so loader updates invalidate correctly.

## Findings Summary

High priority concerns:

1. JS-dependent body content remains an indexing resiliency risk in degraded crawler/fetch conditions.
2. Componentized large sections can contribute to CLS without reserved placeholder space.

Medium priority concerns:

1. Browser support is modern-only without polyfills.
2. Security posture is improved but should be paired with CSP and stricter integrity controls.

Low priority concerns:

1. Additional network requests are expected; caching now mitigates repeated cost.

## Recommended Next Checks (No Redesign)

1. Validate rendered HTML in Google Search Console URL Inspection for homepage and one componentized long-form page.
2. Measure field CLS (CrUX or RUM) for homepage after release.
3. Add server-side cache headers for /components/ partials.
4. Consider adding minimal non-JS fallback content for highest-value SEO sections in source HTML where feasible.
