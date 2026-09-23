# Wild Roots Hauling and Junk Removal — Website

A production-ready, five-page marketing site for Wild Roots Hauling and Junk Removal.
Built with vanilla HTML, CSS and JavaScript — no build step and no dependencies. The only
backend is a single serverless function that delivers form submissions to GoHighLevel.

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
├── api/
│   └── ghl-lead.js      # serverless form handler → GoHighLevel sub-account
└── assets/
    ├── css/styles.css   # all styling, design tokens, responsive rules
    ├── js/main.js       # nav, FAQ accordion, scroll reveal, form handling
    └── img/             # reserved for future photography
```

## How the quote form works

Every contact/quote form on the site is marked with `data-ghl-form`. On submit, `main.js`
validates the fields and POSTs them as JSON to `/api/ghl-lead` (the serverless function in
`api/ghl-lead.js`), then shows a thank-you message in place — the form design is unchanged.

`api/ghl-lead.js` creates or updates the contact in the GoHighLevel sub-account
(location `v6ItU2KQfXshCzO4FilA`) with first name, last name, phone and email, and then:

- sets the contact custom field **Lead Source** to `Website`
- sets the contact custom field **Website Form** to the submitting form's name
  (`data-form-name`, e.g. `Quote Request Form`)
- stores the visitor's message on the contact (a **Message** custom field plus a timeline note
  with the full submission: address, service, load size and preferred timing)
- applies the tag **website-lead**

Any of those custom fields that the sub-account does not have yet are created automatically
on the first submission.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `GHL_PRIVATE_INTEGRATION_TOKEN` | **Required.** GoHighLevel private integration / access token for the sub-account (`GHL_API_TOKEN` and `GHL_API_KEY` are accepted as aliases). The token stays server-side and is never exposed to the browser. |
| `GHL_LOCATION_ID` | Optional override; defaults to `v6ItU2KQfXshCzO4FilA`. |

If the API call fails, the visitor is shown the phone number and email address as a fallback.
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
