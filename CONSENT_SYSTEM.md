# CONSENT_SYSTEM.md

## Overview

This document specifies the GDPR/UK GDPR cookie consent system implemented for QRCodeBarn.

Design goals achieved:

1. Fully responsive consent banner.
2. Cookie preferences dialog.
3. Google Consent Mode v2 defaults and updates.
4. Default consent denied except essential storage.
5. Consent persistence.
6. Cookie Settings entry point in footer.
7. Existing design language preserved.
8. No third-party cookie libraries.
9. No jQuery.
10. Vanilla JavaScript only.
11. Accessibility support.
12. Minimal performance overhead.

## Architecture

The system is split into two first-party scripts:

1. `website/qrcodebarn/assets/consent-bootstrap.js`
2. `website/qrcodebarn/assets/consent-manager.js`

### 1) consent-bootstrap.js (early execution)

Purpose:

- Initialize `window.dataLayer` and `window.gtag` safely.
- Apply Google Consent Mode v2 default state immediately.
- Read stored consent (if available) and issue consent update.

Behavior:

- Storage key: `qrbarn_consent_v1` in `localStorage`.
- Default state (before user action):
  - `ad_storage`: denied
  - `ad_user_data`: denied
  - `ad_personalization`: denied
  - `analytics_storage`: denied
  - `personalization_storage`: denied
  - `functionality_storage`: granted
  - `security_storage`: granted
- Includes `wait_for_update: 500` in default call.

Rationale:

- Ensures privacy-safe defaults before analytics/ads logic executes.
- Keeps essential/security storage enabled for core site operation.

### 2) consent-manager.js (deferred UI/controller)

Purpose:

- Render consent banner and preferences modal.
- Save user choices.
- Update Consent Mode when user changes preferences.
- Inject "Cookie Settings" link into footer.

Behavior:

- Shows banner only if no stored consent exists.
- Banner actions:
  - Reject non-essential
  - Cookie preferences
  - Accept all
- Preferences modal categories:
  - Essential (always on, disabled toggle)
  - Analytics
  - Advertising
  - Personalization
- Saves consent state to `localStorage`.
- Calls `gtag('consent','update',...)` after save.
- Footer link opens preferences dialog any time.

## Consent State Model

Stored JSON example:

```json
{
  "analytics": true,
  "ads": false,
  "personalization": true,
  "method": "custom",
  "ts": 1784375660917
}
```

Fields:

- `analytics`: boolean
- `ads`: boolean
- `personalization`: boolean
- `method`: one of `accept`, `reject`, `allowall`, `custom`, `stored`, `default`
- `ts`: timestamp

## Accessibility

Implemented accessibility features:

1. Banner uses `role="region"` with accessible label.
2. Modal uses `role="dialog"` + `aria-modal="true"` + `aria-labelledby`.
3. Escape key closes modal.
4. Focus trap keeps keyboard navigation within modal while open.
5. Focus restore returns to previously focused element after close.
6. Clear button labels and checkbox labels.

## Responsive Behavior

- Banner action buttons wrap on smaller widths.
- Modal scales to viewport width (`min(620px, 100%)`).
- Mobile-specific layout adjustments are included in injected CSS.

## Performance Strategy

- Bootstrap script is small and loaded before other scripts in `<head>`.
- UI manager loads with `defer`.
- No external dependencies.
- No blocking network calls for consent UI.
- Styling is inlined via one injected style block to avoid extra CSS requests.

## Integration Notes

Scripts are wired into all pages with `<head>` tags:

```html
<script src="/assets/consent-bootstrap.js"></script>
...
<script src="/assets/consent-manager.js" defer></script>
```

Placement rationale:

- Bootstrap early for privacy defaults.
- Manager deferred to avoid main-thread blocking.

## Compliance Notes (Operational)

Technical implementation supports GDPR/UK GDPR consent controls and Consent Mode v2 signaling.

Legal/compliance operations should additionally ensure:

1. Cookie policy text mirrors actual categories and vendors used.
2. Records of consent policy changes are retained.
3. Any non-Google trackers are also gated according to consent.
4. CMP wording is reviewed by legal counsel for jurisdictional precision.

## Future Enhancements (Optional)

1. Add geo-based auto-behavior if desired (still default-safe globally).
2. Add consent versioning/migration on policy changes.
3. Add telemetry for consent action rates (respecting denied analytics state).
4. Add server-side rendering of a static "Cookie Settings" link where templates are centralized.
