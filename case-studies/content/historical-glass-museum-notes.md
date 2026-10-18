# Historical Glass Museum case study: evidence and completion notes

This is an authoring note, not a public case study page. The existing Eleventy configuration excludes authoring files in this directory from the published output. Edit `historical-glass-museum.json` and regenerate the HTML with `node scripts/build-case-studies.js`.

## Evidence reviewed

- The project context supplied with this request establishes Joseph's collaboration with museum leadership, responsibilities, accessibility priorities, ongoing maintenance, digital communications, and AI-assisted workflow.
- Joseph further confirmed that Codex helped cross-check his work, produce and test code, and review accessibility and usability. No specific prompts, test protocols, rejected outputs, or elapsed-time comparisons were provided.
- Local project repository: `/Users/josephhuckabee/Desktop/Code/glass museum`, clean at `234289a5757ba57a3dd41f26aa6c3549f99e7121` during review.
- Origin: https://github.com/josephhuckabee/historic_glass_museum_foundation
- Live site: https://josephhuckabee.github.io/historic_glass_museum_foundation/
- The live `index.html`, `support-us.html`, `donations.html`, `contact-us.html`, and `newsletter.html` each returned HTTP 200 and matched the corresponding local source byte-for-byte during this session. No transactions, contact submissions, or newsletter operations were performed.
- `README.md`: static architecture, GitHub Pages root publishing, PDF-and-check membership, external-service requirements for contact delivery, and email-provider responsibilities.
- `index.html`: homepage hierarchy, visit/support actions, visitor information, announcements, and persistent membership access.
- `support-us.html` and `script.js`: membership benefits and levels, downloadable PDF, mailing instructions, accordion routing, and header-aware scrolling.
- `donations.html`: Donorbox handoff and nonfinancial donation information. Successful donation processing was not tested.
- `contact-us.html` and `script.js`: labels, native validation, character count, status messages, integration hooks, unconfigured provider and security settings, and telephone fallback. Contact delivery is unconfirmed.
- `newsletter.html` and `unsubscribe.html`: issue-selection controls, PDF viewer, and manual email opt-out instructions. No signup interface or connected mailing-list service was found; subscription delivery is unconfirmed.
- `styles.css`: locally hosted Libre Baskerville, responsive grids/menu/buttons, focus styles, skip-link behavior, minimum control heights, and reduced-motion support. These are implementation observations, not an accessibility conformance assessment.

## Development history used

- `62557cb`: initial repository includes Eleventy/Nunjucks source and an unfinished contact-page entry. This is an early version of this project, not evidence of defects in the museum's former public site.
- `86ea102` (May 21, 2026): conversion to static HTML, CSS, and JavaScript.
- `a3cf2ab` (September 26, 2026): contact-provider setup and operational documentation.
- `6704176` (September 27, 2026): documentation of the earlier online membership application and its external-service requirements.
- `b160187` (September 27, 2026): membership action moved to a fixed position, with viewport-safe sizing and focus styling.
- `3eb7fd8` (September 27, 2026): membership hash routing and accordion/scroll handling added.
- `234289a` (October 1, 2026): online membership application and its calculation/confirmation code removed; printable PDF and mailed-check process documented. The change does not document why leadership selected this approach.

## Actual project asset used

`assets/historical-glass-museum/museum-building.jpg` is an unchanged copy of `Images/Building Images/2023HGMbuilding800.jpg` from the museum repository. Its caption identifies it as a photograph, not an interface screenshot. No stock images, invented wireframes, or reconstructed earlier interfaces were used.

## Details still needed

1. Stakeholder discovery dates, meeting format, requirements explicitly approved, and any documented previous-site audit.
2. Wireframe and prototype sections were removed at Joseph’s request; no replacement artifacts are needed.
3. One concrete Codex task, generated output, personal refinement, and verification example. Include a specific accessibility/usability check if available; do not infer screen-reader testing, WCAG conformance, or measured acceleration.
4. The stakeholder rationale for the membership-flow change and any subsequent changes to the live service configuration.
5. Joseph's own lessons from leadership collaboration and specific ongoing maintenance responsibilities.
6. Real screenshots of the homepage, desktop navigation, expanded membership section, donation options, contact form/status, newsletter viewer, and mobile menu/layout. Add a short interaction recording if useful.

The case study makes no claims about interview findings, formal usability-test results, analytics, conversion lifts, task-completion improvements, or administrator self-service. No browser connection was available for visual desktop/mobile verification in this session; the existing responsive layout and functionality were preserved.
