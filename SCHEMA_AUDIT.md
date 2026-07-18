# SCHEMA_AUDIT.md

## Pages checked
- website/qrcodebarn/index.html
- website/qrcodebarn/qr-code-guides.html
- website/qrcodebarn/qr-codes-for-restaurants.html
- website/qrcodebarn/static-vs-dynamic-qr-codes.html
- website/qrcodebarn/what-is-a-qr-code.html
- website/qrcodebarn/qrcodebarn_buildout/index.html
- website/qrcodebarn/qrcodebarn_buildout/qr-code-security-guide.html
- website/qrcodebarn/qrcodebarn_buildout/static-vs-dynamic-qr-codes.html
- website/qrcodebarn/homepage-faq-schema.json

## Issues found
- Several Article schema blocks used non-standard publisher values such as "QRCodeBarn" instead of the site’s consistent Organization identity.
- Some pages lacked required Article fields such as description and datePublished.
- Some pages lacked breadcrumb markup even though the page content already had breadcrumb navigation.
- The homepage had WebPage and WebApplication blocks with slightly inconsistent Organization references and no image/logo reference.
- A legacy buildout homepage used WebPage + WebApplication blocks with inconsistent publisher URLs.
- The FAQ schema file existed as a standalone JSON file and was not bound to a page-level schema implementation; this was acceptable but needed to be documented as a manual review candidate.

## Issues repaired
- Standardised Organization identity to The AI Barn across the updated schema blocks.
- Normalised canonical page URLs to the live site URL pattern.
- Added description, datePublished, and image fields where they were absent.
- Added BreadcrumbList schema to article-style pages with breadcrumb navigation.
- Added logo references through ImageObject entries for stronger Organization and publisher consistency.
- Kept WebApplication schema only on the homepage and homepage buildout entry page, where it is appropriate.
- Left the FAQ JSON file unchanged because it already validly represents a FAQPage and does not need modification for this audit.

## Pages requiring manual review
- website/qrcodebarn/faq.html — no inline JSON-LD block was present, so this page would benefit from a page-level FAQPage or WebPage schema if the site wants broader structured data coverage.
- website/qrcodebarn/homepage-faq-schema.json — the JSON file is valid as FAQPage schema, but it should be embedded into a page or referenced by the site template if the intent is to have it indexed as part of the homepage content.
- Any additional article pages outside the audited set that may contain schema in future should be checked against the same canonical pattern before deployment.

## Summary statistics
- Pages checked: 8 HTML pages + 1 FAQ schema file
- Pages with modified schema blocks: 8
- Schema blocks validated successfully after repair: 12
- BreadcrumbList additions: 4
- WebApplication blocks retained: 2
- FAQPage/FAQ schema file reviewed: 1
