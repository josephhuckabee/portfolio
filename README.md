# Built by Joseph

Personal portfolio site for Joseph Huckabee.

The site is intentionally small: hand-written HTML, CSS, and JavaScript with a lightweight serverless contact endpoint.

## Pages

- `index.html` - homepage
- `portfolio/index.html` - coding projects
- `logos/index.html` - design projects
- `contact/index.html` - contact form

## Project Structure

```text
.
├── api/
│   └── contact.js
├── assets/
│   ├── index.js
│   ├── style.css
│   └── images
├── contact/
├── logos/
├── portfolio/
├── index.html
├── robots.txt
└── sitemap.xml
```

## Local Preview

Run a local static server from the project root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

Static preview does not run the `api/contact.js` endpoint. The pages, styling, images, and client-side interactions still load.

## Contact Form

The contact form posts to `/api/contact`. The endpoint expects these environment variables:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

If the site is hosted on a static-only service such as GitHub Pages, the contact form endpoint will not run. Use a serverless host such as Vercel, or replace the form with a static mail link.

## Vercel Deployment

This repo includes `vercel.json` so Vercel serves the project root directly. In the Vercel dashboard, keep the project settings simple:

- Framework Preset: Other
- Build Command: empty
- Output Directory: `.`
- Install Command: empty

If CSS is missing after deploy, check that Vercel is not still using an old output directory such as `docs` or `_site`, then redeploy without build cache.

## Accessibility and Performance Notes

- Pages include semantic landmarks, labels, skip links, and descriptive image alt text.
- Images use explicit dimensions and lazy loading where appropriate.
- CSS and JavaScript are shared across pages to avoid duplicate logic.
- No package manager or build step is required for the visible site.

## Legal Documents

Draft site documents are included:

- `PRIVACY.md`
- `TERMS.md`
- `ACCESSIBILITY.md`
- `SECURITY.md`

These are practical starter documents, not legal advice.
