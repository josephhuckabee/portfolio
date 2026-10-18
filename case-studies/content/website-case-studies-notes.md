# Website case studies: evidence and completion notes

These authoring notes support Hair Color Portfolio, Sirius, and Anthropos. The case studies use the existing JSON content format and shared template. They do not add research results, performance metrics, AI usage, or stakeholder quotations that were not supplied or found in the project materials.

The Wireframes & Prototypes section was removed from all four website case studies at Joseph's request. The museum links now use its verified custom domain, https://historicalglassmuseum.com/.

## Hair Color Portfolio

- Local source: `/Users/josephhuckabee/Desktop/Code/2025_hair_port`.
- Origin: https://github.com/josephhuckabee/josephhuckabeehair
- Live site: https://josephhuckabee.com
- Read: `index.html`, `portfolio.html`, `services.html`, `contact.html`, `js/script.js`, `css/style.css`, and `netlify/functions/instagram-feed.js`.
- Live homepage, `/portfolio`, `/services`, and `/contact` returned HTTP 200. This was a read-only check; no forms were submitted or social-provider configuration verified.
- The current Contact page is labeled Hair Notes and uses a signup/message form. The write-up does not claim a working appointment scheduler or verified signup delivery.
- `7543183`: Appointments navigation label changed to Contact; labeled social icons added. The same diff also changes active navigation markup; no fully validated active-navigation behavior is claimed.
- `9ddfb12`: responsive hero image sizing, image `sizes` values, dynamic viewport behavior, and mobile overflow/safe-area adjustments.
- `fb26d41`: typography, mobile header grid, and breakpoint adjustments.
- Carousel source: reduced-motion check, pause/resume, visibility handling, responsive image candidates, and initial-image priority. Gallery source: click/keyboard activation, close-control focus, and return focus; no complete focus-trap or accessibility certification claim.
- The source checkout already contained unrelated image deletions and a changed `.DS_Store`. These were left untouched.
- Visual: existing `hairport.png`, inspected and captioned as a versioned portfolio capture. No new screenshot was fabricated.

## Sirius

- Local source: `/Users/josephhuckabee/Desktop/Code/projects/sirius-main`.
- Origin: https://github.com/josephhuckabee/sirius2.0
- Live site: https://sirius2-0.vercel.app
- Read: `readme.md`, `package.json`, `.eleventy.js`, shared Nunjucks templates, topic/news Markdown, Sass typography/layout/responsive files, `src/js/space-news.js`, and `netlify/functions/space-news.js`.
- Earlier README content identifies the Eleventy/Sass starter foundation. The write-up credits that foundation and focuses on project-specific extensions.
- `82e0aa4`: navigation ordering, shared compact navigation, news page, feed aggregation, sorting, and layout changes.
- `3371090`: fallback JSON added after failed serverless/proxy attempts; README rewritten and topic text revised.
- `d73d881`: menu backdrop, narrow-screen hero/object layout changes, responsive Sass import ordering.
- Live homepage, `/SpaceNews/`, client script, and bundled fallback JSON returned HTTP 200. `/.netlify/functions/space-news` returned HTTP 404 on the Vercel deployment.
- The source uses NASA, ESA, and Space.com feed URLs, source labels, dates, sorting, a proxy attempt, and a bundled historical fallback. It loads when the script runs, with no timer establishing continuous background refresh. The full browser request chain and freshness of displayed stories were not verified.
- Visual: existing `sirius.png`, inspected and correctly identified as a brand asset rather than an interface screenshot.

## Anthropos

- Local source: `/Users/josephhuckabee/Desktop/Code/housing_rights_2026/HousingIsARight`.
- Origin: https://github.com/josephhuckabee/HousingIsARight
- Live site: https://splendid-seahorse-722b05.netlify.app
- Read: `index.html`, `resources.html`, `stats.html`, `style.css`, `script.js`, and form markup. No README was found in this checkout.
- Live homepage and `/resources` returned HTTP 200. No petition was submitted, personal data sent, or official contacted.
- The live and local pages use Anthropos and HousingNYC names. The case study retains the existing portfolio project title.
- `1dcd87e`: homepage/resource overhaul and dedicated topic pages for eviction, housing law, rent regulation, charities, legal aid, Section 8, shelters, and volunteering.
- `779e8e3`: UI scale/logo changes and scrollable constrained mobile navigation. This is documented as an implementation revision, not a proven accessibility improvement.
- Petition markup uses Netlify form configuration and a thank-you route. No signature storage, recipient delivery, privacy-policy effectiveness, or campaign outcome is claimed.
- District lookup uses an embedded NYC Council tool and external official lookup destinations, not a custom matching engine.
- Source citations on the information page are described as content sourcing, not participant research. The case study does not repeat statistics, current officeholder identities, legal advice, or crisis contact details as verified current guidance.
- The reader-mode script only operates if its control exists; the write-up does not claim it is an exposed active feature.
- Visual: existing `ant_logo.png`, inspected and captioned as an identity asset rather than an interface screenshot.

## Items for Joseph to complete

1. Original briefs, dates, collaborator credits, responsibilities, and any actual stakeholder/audience input.
2. AI tools and concrete tasks for each project, if applicable. The museum's confirmed Codex workflow has not been attributed to these projects.
3. Personal reflections and any genuine feedback. Add analytics or outcomes only when evidence exists.
4. Current mobile screenshots and interaction captures: hair gallery/carousel controls, Sirius topic/news states and sorting, and Anthropos petition/resources/menu/district tools.
5. Verified form operations and service ownership for the hair site and Anthropos; hosting-compatible news delivery and data freshness for Sirius.
6. Museum live links were updated to https://historicalglassmuseum.com/ after checking the custom domain.

No website was deployed. Existing portfolio styles, navigation, shared templates, project cards, and third-party project source repositories were not edited. Browser visual verification remains unavailable in this session; checks cover generated structure, assets, links, static output, and preservation of existing layout code.
