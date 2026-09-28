# Wild Roots Hauling and Junk Removal — Website

A production-ready, five-page marketing site for Wild Roots Hauling and Junk Removal.
Built with vanilla HTML, CSS and JavaScript — no build step, no dependencies and no backend.
Form submissions are delivered to LeadrVision.

## Contact details used throughout the site

- **Phone (click-to-call):** [+1 (458) 867-8037](tel:+14588678037)
- **Email:** [wildrootshauling@gmail.com](mailto:wildrootshauling@gmail.com)
- **Hours:** Monday–Sunday, 7:00 AM – 7:00 PM
- **Service area:** Mobile service — the crew travels to the customer

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Hero with primary CTA, services overview, process, why-us, reviews, FAQ preview |
| `services.html` | Detailed service breakdown, pricing model, items we cannot accept |
| `about.html` | Company story, values, service area, who we help, reviews |
| `faq.html` | Full FAQ grouped into pricing, on-the-day, and items/disposal |
| `contact.html` | Contact details and the quote request form |

## Structure

```
.
├── index.html
├── services.html
├── about.html
├── faq.html
├── contact.html
├── favicon.svg          # favicon placeholder
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css   # all styling, design tokens, responsive rules
    ├── js/main.js       # nav, FAQ accordion, scroll reveal, form handling
    └── img/             # reserved for future photography
```

## How the quote form works

Every contact/quote form on the site is marked with `data-lead-form` and posts to the
LeadrVision forms endpoint named in its own `action` attribute:

```
https://vision.leadrai.com/api/forms/a0a587b54f7e8cadafac1d1f9f7c9493
```

On submit, `main.js` validates the fields and POSTs them as JSON to that same URL, then shows
a thank-you message in place — the form design is unchanged. Each form also carries:

- `_form` — a short human name for the form (e.g. `Quote request`)
- `_page` — set to `window.location.href` on page load, so the visitor returns to the right page
- `_gotcha` — a hidden honeypot field that real people never fill in

Every visible field uses a human-readable `name` (`Service needed`, `Preferred timing`, and so
on), with `name`, `email` and `phone` kept exactly as those three names.

Because the `action` and `method="POST"` are on the form itself, submission still works with
JavaScript disabled: the visitor comes back to the page with `?submitted=1` and `main.js` shows
the same confirmation message.

If the request fails, the visitor is shown the phone number and email address as a fallback.
Phone and email also appear directly on every page, so no one depends on the form.

## Features

- Semantic HTML5 landmarks, skip link, ARIA-labelled navigation and accordions
- Responsive from 320px up, with a mobile sticky call bar and off-canvas menu
- Meta descriptions, Open Graph and Twitter cards, canonical URLs on every page
- `LocalBusiness` and `FAQPage` JSON-LD structured data
- Respects `prefers-reduced-motion`; print stylesheet included

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Images

No photography is bundled with this build. Sections are designed to look complete without
photos, using layered gradients, SVG iconography and typography. Drop real job photos into
`assets/img/` and reference them with descriptive alt text when they become available.
