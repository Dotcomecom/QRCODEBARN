# Component Library for QRCodeBarn

## Purpose

This document inventories the repeated page sections that appear across the QRCodeBarn static site and proposes a maintainable component model for a future refactor. The goal is to preserve the current branding and styling while making the markup easier to reuse, audit and extend.

## Scope and constraints

- No visual redesign is proposed in this pass.
- No CSS or JavaScript behaviour changes are proposed in this pass.
- The refactor target is structural reuse: semantic wrappers, content slots, and shared HTML patterns.
- The recommendations below are based on a repository-wide review of the production pages in [website/qrcodebarn/index.html](website/qrcodebarn/index.html), [website/qrcodebarn/qr-code-guides.html](website/qrcodebarn/qr-code-guides.html), [website/qrcodebarn/qr-code-industries.html](website/qrcodebarn/qr-code-industries.html), [website/qrcodebarn/qr-code-faq.html](website/qrcodebarn/qr-code-faq.html), [website/qrcodebarn/trust-centre.html](website/qrcodebarn/trust-centre.html), and [website/qrcodebarn/qr-code-for-pdf.html](website/qrcodebarn/qr-code-for-pdf.html), along with the repeated patterns visible across tool-detail pages and landing pages.

## What is already repeated across the site

The repository shows eight strong section families that recur often enough to justify extraction:

1. Hero section
2. Editorial review block
3. Call-to-action panel
4. Related guides section
5. FAQ block
6. Industry example block
7. “Generate your QR Code” panel
8. Footer trust section

These sections are repeated in the homepage, guide landing pages, industry landing pages, tool-detail pages, trust and editorial pages, and several legacy buildout variants.

---

## 1. Hero section

### What appears repeatedly

The hero region appears in several forms:

- Homepage hero with eyebrow, headline, supporting copy, CTA buttons, proof list, and generator entry point in [website/qrcodebarn/index.html](website/qrcodebarn/index.html).
- Landing-page hero with eyebrow, clear headline, intro paragraph and one primary CTA in [website/qrcodebarn/trust-centre.html](website/qrcodebarn/trust-centre.html).
- Tool-detail pages often begin with a short hero that introduces the tool, lists badges, and leads into the generator or explanatory content in [website/qrcodebarn/qr-code-for-pdf.html](website/qrcodebarn/qr-code-for-pdf.html).

### Recommended reusable contract

Create a single semantic hero component with these slots:

- Eyebrow text
- Heading
- Intro paragraph or lead copy
- Primary action link
- Secondary action link (optional)
- Supporting proof list or badges (optional)
- Optional secondary panel, such as a generator or a supporting visual card

### Suggested HTML shape

```html
<section class="hero" data-component="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <span class="eyebrow">Optional eyebrow</span>
      <h1>Primary headline</h1>
      <p class="lead">Short supporting paragraph.</p>
      <div class="hero-actions">
        <a class="button primary" href="#">Primary CTA</a>
        <a class="button secondary" href="#">Secondary CTA</a>
      </div>
      <ul class="hero-proof">
        <li>Optional proof point</li>
      </ul>
    </div>
    <div class="hero-aside">
      <!-- Optional secondary content, such as generator or feature card -->
    </div>
  </div>
</section>
```

### Recommendation rationale

This is the highest-value extraction because it is both structurally consistent and heavily reused. It also allows the homepage hero and the supporting page hero to share a single semantic structure without forcing them to share the same visual treatment.

---

## 2. Editorial review block

### What appears repeatedly

This block is visible in trust-oriented content and in the homepage trust section. It presents the publisher or editorial standards in a concise editorial context.

Examples include:

- The trust block on [website/qrcodebarn/index.html](website/qrcodebarn/index.html) that links to trust-centre, editorial policy and contact.
- The editorial and trust content in [website/qrcodebarn/trust-centre.html](website/qrcodebarn/trust-centre.html).
- The publisher footer and editorial messaging repeated across many article and tool pages.

### Recommended reusable contract

Create a simple editorial trust component with these slots:

- Heading or eyebrow
- Short explanatory paragraph
- One or more supporting links to policy pages
- Optional contact point or editor note

### Suggested HTML shape

```html
<section class="editorial-review" data-component="editorial-review">
  <div class="wrap">
    <div class="editorial-review-content">
      <span class="eyebrow">Published by The AI Barn</span>
      <h2>Short title</h2>
      <p>One-paragraph trust summary.</p>
    </div>
    <div class="editorial-review-links">
      <a href="/trust-centre.html">Trust Centre</a>
      <a href="/editorial-policy.html">Editorial Policy</a>
      <a href="mailto:hello@theaibarn.com">Contact the Editor</a>
    </div>
  </div>
</section>
```

### Recommendation rationale

The page-to-page editorial trust messaging is currently duplicated in a few forms but has a common intent: reassure readers that the content is reviewed and maintained. Extracting it reduces drift and ensures the publisher identity, trust links and contact details remain consistent.

---

## 3. Call-to-action panel

### What appears repeatedly

The CTA panel is one of the most common pattern families. It appears in several forms:

- The “Create your QR code” notice near the end of explanatory articles and guides.
- The “Create one now” panel in tool-detail pages.
- The “Open the QR generator” button on article-style pages.

Examples can be seen in [website/qrcodebarn/qr-code-for-pdf.html](website/qrcodebarn/qr-code-for-pdf.html) and the repeated “Create your QR code” blocks across many content pages.

### Recommended reusable contract

Create a CTA panel with these slots:

- Title
- Intro text
- Primary CTA link or button
- Optional secondary CTA
- Optional supporting note or trust copy

### Suggested HTML shape

```html
<section class="cta-panel" data-component="cta-panel">
  <div class="wrap">
    <h2>Create your QR code</h2>
    <p>Use the free generator, then test the code before printing or sharing.</p>
    <div class="cta-actions">
      <a class="button primary" href="/">Open the generator</a>
      <a class="button secondary" href="/qr-code-guides.html">Read the guides</a>
    </div>
  </div>
</section>
```

### Recommendation rationale

This block is small but highly repeatable. Extracting it improves consistency and prevents the same CTA copy and placement from diverging between pages over time.

---

## 4. Related guides section

### What appears repeatedly

The site repeatedly ends explanatory content with a list of related resources. Two variants are present:

- “Related QR resources” lists with a heading and a series of anchor links.
- “Related guides” sidebars with a heading and a compact list of links.

These appear often in article pages and tool-detail pages, including [website/qrcodebarn/qr-code-for-pdf.html](website/qrcodebarn/qr-code-for-pdf.html) and [website/qrcodebarn/qr-code-guides.html](website/qrcodebarn/qr-code-guides.html).

### Recommended reusable contract

Create a related-links block with the following data slots:

- Section title, such as “Related guides” or “Related QR resources”
- List of links
- Optional preamble or intro sentence
- Optional visual card layout per item

### Suggested HTML shape

```html
<aside class="related-links" data-component="related-links">
  <h2>Related guides</h2>
  <ul>
    <li><a href="/how-to-create-a-qr-code.html">How to create a QR code</a></li>
    <li><a href="/qr-code-faq.html">QR code FAQ</a></li>
    <li><a href="/are-qr-codes-safe.html">Are QR codes safe?</a></li>
  </ul>
</aside>
```

### Recommendation rationale

This is a good candidate for a content-driven component because the structure is nearly identical across pages even when the links change. It will also make it easier to standardise the list ordering and ensure important guides stay visible.

---

## 5. FAQ block

### What appears repeatedly

The FAQ pattern is already established in tool-detail pages and is likely to appear in industry pages, guide pages and other long-tail pages. The pattern in [website/qrcodebarn/qr-code-for-pdf.html](website/qrcodebarn/qr-code-for-pdf.html) shows a title plus a set of `<details>` items. A similar pattern exists on [website/qrcodebarn/qr-code-faq.html](website/qrcodebarn/qr-code-faq.html), though it uses a different layout and markup style.

### Recommended reusable contract

Create a semantic FAQ block with:

- Section heading
- One or more FAQ items
- Each item has a question title and a collapsed answer body
- Optional category or grouping labels

### Suggested HTML shape

```html
<section class="faq" data-component="faq">
  <div class="wrap">
    <h2>Frequently asked questions</h2>
    <details>
      <summary>Question one</summary>
      <p>Answer text.</p>
    </details>
    <details>
      <summary>Question two</summary>
      <p>Answer text.</p>
    </details>
  </div>
</section>
```

### Recommendation rationale

The FAQ interaction is simple and consistent. Once extracted, it can be reused in multiple content types without changing the information architecture or the visual intent.

---

## 6. Industry example block

### What appears repeatedly

The site has many use-case and industry pages that present examples in a card-based format. The best example is the “Best use cases” section in [website/qrcodebarn/qr-code-for-pdf.html](website/qrcodebarn/qr-code-for-pdf.html), where each card has a tag, a title and a short description. A similar card pattern is visible on guide and industry landing pages such as [website/qrcodebarn/qr-code-guides.html](website/qrcodebarn/qr-code-guides.html) and [website/qrcodebarn/qr-code-industries.html](website/qrcodebarn/qr-code-industries.html).

### Recommended reusable contract

Create a card-based example block with these slots:

- Optional tag or eyebrow
- Heading
- Short descriptive paragraph
- Optional link to a dedicated page
- Optional icon or visual accent

### Suggested HTML shape

```html
<div class="card example-card" data-component="industry-example">
  <span class="tag">Use case</span>
  <h3>Example title</h3>
  <p>Short explanation of why this use case matters.</p>
  <a href="#">View example</a>
</div>
```

### Recommendation rationale

This is a useful component because it supports both industry landing pages and product pages without requiring a new layout each time. It also makes the site’s use-case storytelling more scalable as new pages are added.

---

## 7. “Generate your QR Code” panel

### What appears repeatedly

The generator experience is the core of the site and is repeated in two forms:

- The homepage generator panel in [website/qrcodebarn/index.html](website/qrcodebarn/index.html).
- The tool-specific generator panel on pages such as [website/qrcodebarn/qr-code-for-pdf.html](website/qrcodebarn/qr-code-for-pdf.html), where the form appears above or beside explanatory content.

### Recommended reusable contract

Create a dedicated generator-panel component with these slots:

- Panel title and small label
- Form controls for the selected QR type
- Optional fieldset or field groups by input type
- Preview area
- Download actions: PNG, SVG or other export buttons
- Optional status text or helper note

### Suggested HTML shape

```html
<section class="generator-panel" data-component="generator-panel">
  <div class="panel-head">
    <h2>Create your QR code</h2>
    <span>Live preview</span>
  </div>
  <form id="qrForm">
    <!-- form controls -->
  </form>
  <div class="preview-area">
    <!-- generated QR preview -->
  </div>
  <div class="panel-actions">
    <button type="button">Download PNG</button>
    <button type="button">Download SVG</button>
  </div>
</section>
```

### Recommendation rationale

This panel is the product’s highest-priority structural element, but it is also the messiest because it mixes markup, form state and preview UI. A separate component boundary here would help maintainability without needing to change the existing generator logic immediately.

---

## 8. Footer trust section

### What appears repeatedly

The site footer includes a trust-heavy lower section that appears across the site. The homepage footer in [website/qrcodebarn/index.html](website/qrcodebarn/index.html) includes a branded footer with trust links, while many long-tail pages use a shorter publisher block at the very bottom, often with links to privacy, terms and contact information.

### Recommended reusable contract

Create a reusable footer trust block with these slots:

- Brand name and short description
- Navigation links to core pages
- Trust links, such as trust centre, editorial policy, privacy and terms
- Publisher details and copyright line
- Optional support email address

### Suggested HTML shape

```html
<footer class="site-footer" data-component="footer-trust">
  <div class="wrap footer-grid">
    <div>
      <h3>QRCodeBarn</h3>
      <p>Free QR code tools and practical guides.</p>
    </div>
    <div>
      <h3>Useful links</h3>
      <p><a href="/trust-centre.html">Trust Centre</a></p>
      <p><a href="/privacy-policy.html">Privacy</a></p>
      <p><a href="/terms-and-conditions.html">Terms</a></p>
    </div>
  </div>
  <div class="wrap publisher">
    <p>Owned and operated by The AI Barn, 124 City Road, London, EC1V 2NX, United Kingdom.</p>
  </div>
</footer>
```

### Recommendation rationale

This component serves both utility and trust functions. Extracting it makes the legal, publisher and support information easier to maintain and helps the site present one consistent footer identity everywhere.

---

## Recommended implementation strategy for the future refactor

### 1. Extract markup first, not styles

The safest first step is to define the component shells as semantic wrappers and content slots while keeping the existing classes intact. This avoids visual churn while making the code easier to maintain.

### 2. Prefer semantic wrappers over one-off div-heavy markup

Use `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`, `<details>` and `<nav>` where appropriate. These elements already align with the site’s content structure and will make the markup more readable.

### 3. Preserve current class names where possible

The existing design is already working in production, so the first refactor should mirror the current classes and structure rather than introducing a brand-new design system. This reduces the risk of layout regressions.

### 4. Use data attributes for component identity

A lightweight approach is to add `data-component="hero"`, `data-component="faq"` and so on to each extracted wrapper. That keeps the future implementation explicit without forcing a framework or build pipeline.

### 5. Keep content and layout separate

The content for each component should be easy to swap in by page while the layout remains shared. That is especially important for the hero, CTA panel and related-links sections, which are likely to grow over time.

### 6. Refactor by section family before refactoring by page

Start with the highest-value components: hero, CTA panel, related links and footer trust. Once those are stable, move to FAQ and industry-example cards, then the generator panel.

---

## Suggested order of implementation

1. Hero section
2. CTA panel
3. Related guides section
4. Footer trust section
5. Editorial review block
6. FAQ block
7. Industry example block
8. Generator panel

This order prioritises the components that are easiest to standardise and most visible across the site.

## Final recommendation

The repository is already using a strong set of repeated content patterns. The best next step is not a redesign but a structural cleanup: turn the repeated sections above into reusable HTML components with clear content slots, preserve the current branding and classes, and implement them in a way that can be reused across homepage, guide, industry and tool pages without introducing visual inconsistency.
