# AUTHORITY_COMPONENTS.md

## Purpose

This document defines the QRCodeBarn Content Authority Pack for industry pages.

Goals:

1. Reusable content components for all industry pages.
2. No duplication of existing page copy.
3. Preserve schema.
4. Preserve SEO.
5. Strengthen internal linking.
6. Avoid visual redesign.

## Component Set

The pack is implemented as reusable first-party HTML templates in `website/qrcodebarn/components/authority/` and a runtime loader in `website/qrcodebarn/assets/content-authority-pack.js`.

Required components:

1. Quick Benefits
2. Real Business Example
3. Step-by-Step Guide
4. Best Practices
5. Common Mistakes
6. Industry FAQ
7. Related Guides
8. Editorial Review

## Integration Model

### Loader behavior

The runtime loader:

- Detects industry pages from URL patterns such as `qr-code-for-*` and `qr-codes-for-*`.
- Loads reusable templates from `/components/authority/`.
- Fills each component with page-specific, non-duplicative content.
- Inserts the authority pack into the article flow without changing the existing page design.

### Coverage

Coverage is provided in two ways:

1. Pages that already load `assets/app.js` or `assets/app-longtail.js` now auto-load `assets/content-authority-pack.js`.
2. Pages not using those loaders received a direct deferred include for `assets/content-authority-pack.js`.

## Page Data Strategy

Each industry page is mapped to a content category, then to a component dataset.

Example category groups:

- Hospitality
- Property
- Education
- Healthcare
- Community / nonprofit
- Events
- Operations
- Services
- Digital / social
- General fallback

The data strategy is designed to avoid duplicating existing article sections. Instead, it adds adjacent authority content that complements the page topic.

## Component Contracts

### 1. Quick Benefits

Purpose:
- Show immediate, practical reasons the QR use case matters.

Inputs:
- Industry name
- 3 to 5 benefit bullets

Expected outcome:
- Short, scannable summary of business value.

### 2. Real Business Example

Purpose:
- Provide a realistic example of how the QR workflow works in a live business setting.

Inputs:
- One short scenario
- One measured outcome or expected operational result

Expected outcome:
- Grounded, non-hypothetical credibility without repeating page body copy.

### 3. Step-by-Step Guide

Purpose:
- Turn the use case into a clear implementation path.

Inputs:
- 4 to 5 action steps

Expected outcome:
- Practical workflow that helps the reader move from idea to deployment.

### 4. Best Practices

Purpose:
- State the highest-value implementation rules.

Inputs:
- 4 to 5 concise best-practice items

Expected outcome:
- Stronger page authority and clearer user guidance.

### 5. Common Mistakes

Purpose:
- Warn against likely failures without repeating the main article.

Inputs:
- 4 to 5 common pitfalls

Expected outcome:
- Better decision-making and fewer scanning or UX regressions.

### 6. Industry FAQ

Purpose:
- Answer the most relevant questions for the industry page.

Inputs:
- 3 to 4 question/answer pairs

Expected outcome:
- Increased topical completeness and better internal utility.

### 7. Related Guides

Purpose:
- Strengthen internal linking across the QRCodeBarn content graph.

Inputs:
- 4 to 6 related page links

Expected outcome:
- Better page discovery, topic clustering, and crawl depth.

### 8. Editorial Review

Purpose:
- Signal editorial standards and review quality.

Inputs:
- Short review statement and Trust Centre link

Expected outcome:
- Stronger E-E-A-T style trust signaling without changing schema.

## Content Rules

The authority pack must follow these rules:

1. Do not copy existing article paragraphs, FAQ answers, or list items verbatim.
2. Do not rewrite the existing H1, meta description, canonical URL, or JSON-LD.
3. Keep the component copy short and additive.
4. Use page-specific internal links only when they improve relevance.
5. Favor concrete operational advice over broad marketing claims.
6. Keep every component useful on mobile.

## SEO Rules

1. Preserve the current URL structure.
2. Preserve existing schema blocks.
3. Do not alter canonical tags.
4. Do not duplicate the existing on-page lead copy.
5. Strengthen internal linking with purposeful related-guide links.
6. Keep semantic headings in the natural article order.

## Implementation Notes

### Files created or updated

- `website/qrcodebarn/assets/content-authority-pack.js`
- `website/qrcodebarn/components/authority/quick-benefits.html`
- `website/qrcodebarn/components/authority/real-business-example.html`
- `website/qrcodebarn/components/authority/step-by-step-guide.html`
- `website/qrcodebarn/components/authority/best-practices.html`
- `website/qrcodebarn/components/authority/common-mistakes.html`
- `website/qrcodebarn/components/authority/industry-faq.html`
- `website/qrcodebarn/components/authority/related-guides.html`
- `website/qrcodebarn/components/authority/editorial-review.html`

### Loader dependencies

- `assets/app.js`
- `assets/app-longtail.js`
- direct script includes on non-loader industry pages

## Maintenance Guidance

When adding a new industry page:

1. Map the page to the closest content category.
2. Supply unique benefits, example, steps, mistakes, FAQ, and related links.
3. Keep the authority copy distinct from the main article content.
4. Confirm the pack does not change schema or redesign the layout.
5. Verify that the page still renders correctly with and without JS.

## Validation Expectations

After deployment, validate:

1. The authority pack appears on representative industry pages.
2. The page H1 and existing intro content remain intact.
3. Related links point to correct live pages.
4. Schema output is unchanged.
5. Search Console rendering still matches expectations.

## Summary

The Content Authority Pack is a reusable content layer for industry pages that adds business value, examples, process guidance, and internal links without duplicating existing copy or redesigning the site.
