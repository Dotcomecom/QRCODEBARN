# AI Barn Master Website Audit

**Audit scope**

- Repository: /Users/robfalconer/Documents/GitHub/QRCODEBARN
- Branch: main
- Site: QRCodeBarn
- Canonical domain: https://www.qrcodebarn.com
- Audit date: 2026-07-28
- Production files scanned: 162 HTML pages
- Live site checked: Partial
- Git working-tree status: dirty

**Release status**

PASS WITH REVIEW

Repository audit: PASS WITH REVIEW within the implemented local audit scope. Live deployment and external platform behavior were not fully verified.

**Pre-repair totals**

- Production pages: 162
- Indexable pages: 162
- Noindex pages: 0
- ERROR groups: 0
- WARNING groups: 1
- REVIEW groups: 1
- INFO groups: 2
- Total occurrence records: 139
- Affected source pages: 123
- Open Graph missing pages: 114
- Duplicate indexable title groups: 9
- Duplicate indexable description groups: 1
- Duplicate indexable H1 groups: 10

**Repairs implemented**

- Updated server normalization in [website/qrcodebarn/.htaccess](website/qrcodebarn/.htaccess):
  - Added `RewriteRule ^index\.html$ / [L,R=301]` with request guard.
- Added missing Open Graph core metadata to production pages missing it:
  - `og:title`
  - `og:description`
  - `og:url`
  - plus `og:type` / `og:site_name` where missing.
- Converted duplicate alias pages into explicit non-indexable aliases:
  - canonical points to primary page
  - `meta robots` set to `noindex,follow`
- Alias pages updated:
  - about-us.html -> about.html
  - contact.html -> contact-us.html
  - privacy.html -> privacy-policy.html
  - qr-code-faq.html -> faq.html
  - qr-codes-for-events.html -> qr-code-for-events.html
  - qr-codes-for-restaurants.html -> qr-code-for-restaurants.html
  - qr-codes-for-schools.html -> qr-code-for-schools.html
  - qr-code-generator-for-wifi.html -> wifi-qr-code-generator.html
  - create-qr-code-free.html -> free-qr-code-generator.html
  - free-qr-code-maker.html -> free-qr-code-generator.html
  - generate-qr-code-online.html -> free-qr-code-generator.html
  - qr-code-creator.html -> free-qr-code-generator.html
  - qr-code-generator.html -> free-qr-code-generator.html
  - qr-code-maker.html -> free-qr-code-generator.html

**Post-repair totals**

- Production pages: 162
- Indexable pages: 148
- Noindex pages: 14
- ERROR groups: 0
- WARNING groups: 0
- REVIEW groups: 1
- INFO groups: 2
- Total occurrence records: 2
- Affected source pages: 2
- Open Graph missing pages: 0
- Duplicate indexable title groups: 0
- Duplicate indexable description groups: 0
- Duplicate indexable H1 groups: 1

**Findings resolved**

- WARNING-001 Open Graph metadata coverage: resolved
- REVIEW-001 Duplicate/alias clusters: resolved as explicit aliases (canonical + noindex)

**Findings remaining**

REVIEW-002 | Overlapping indexable H1 intent
- Severity: REVIEW
- Affected target: homepage and primary generator page
- Occurrence count: 2
- Affected page count: 2
- Source files: index.html, free-qr-code-generator.html
- Reason: both indexable pages intentionally use the same H1 "Free QR Code Generator"; acceptable if intent split is deliberate, but should be a product/content decision.
- Proposed repair: either keep as-is by policy decision, or differentiate one H1 slightly.
- Confidence: Medium
- Approval required: Yes

**Validation performed**

- Reran full local production audit script (`/tmp/qrcodebarn_audit.js`).
- Recomputed Open Graph completeness and duplicate-group counts from refreshed inventory.
- Spot-checked all 14 alias pages for canonical target and `noindex,follow`.
- Confirmed no workspace errors reported for scanned files.

**Local and live distinction**

- LOCAL: canonical/indexing metadata and alias behavior in repository files verified.
- LIVE: deployment of these new changes is NOT VERIFIED.
- Partial live checks from earlier audit still showed `/index.html` as HTTP 200 before this repair set.
- Live production behavior has not been verified by this audit.

**Git safety and state**

- staged files: none
- unstaged files: 126
- untracked files: 2 (`MASTER-AUDIT-REPORT.md`, `master-audit-report.json`)
- commit status: no commit performed
- push status: no push performed
- deployment status: no deployment performed

**Executive summary**

The remaining repository findings were corrected locally:
- Open Graph coverage is now complete across production pages.
- Duplicate/alias clusters were converted to explicit non-indexable aliases with canonical consolidation.

One non-blocking review item remains (shared H1 intent between homepage and primary generator page), and live deployment verification is still required.
