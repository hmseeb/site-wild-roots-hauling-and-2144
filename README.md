# Wild Roots Hauling and Junk Removal — Website

A production-ready, five-page marketing site for Wild Roots Hauling and Junk Removal.
Built with vanilla HTML, CSS and JavaScript — no build step, no dependencies, no external APIs.

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

The site is fully static, so there is no server to receive form posts. On submit, `main.js`
validates the fields and then opens the visitor's email client with a pre-filled message
addressed to `wildrootshauling@gmail.com`. Phone and email are also presented directly on
every page so no one is dependent on the form.

To switch to a hosted form backend later, replace the `mailto:` handoff inside `initForm()`
in `assets/js/main.js` with a `fetch()` POST to the chosen endpoint.

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
