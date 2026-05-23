# Built by Joseph

Personal portfolio site for Joseph Huckabee, featuring front-end development, design projects, contact information, and selected client-facing work.

## Overview

This is a mostly static portfolio built with HTML, CSS, and vanilla JavaScript. The site is designed to run on GitHub Pages or Vercel.

## Project Structure

```txt
.
├── index.html
├── codingprojects.html
├── designprojects.html
├── contact.html
├── style.css
├── main.js
├── api/
│   └── contact.js
├── .eleventy.js
└── image assets
```

## Local Preview

You can preview the site with any static file server:

```sh
python3 -m http.server 4175
```

Then open:

```txt
http://127.0.0.1:4175
```

## Deployment Notes

The site can be deployed as a static site. On Vercel, `.eleventy.js` is used to build the static output into `_site`.

Important passthrough assets:

- `style.css`
- `main.js`
- image files

If JavaScript features like the dark/light mode toggle are missing on Vercel, confirm that `main.js` is being copied into the deployed output.

## Contact Form

The contact form posts to:

```txt
/api/contact
```

The Vercel serverless function uses the following environment variables:

```txt
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

## License

All portfolio content, images, branding, and project materials are owned by Joseph Huckabee unless otherwise noted. Do not copy or reuse without permission.
