# Editing case studies

Each Coding project has its own JSON content file in `case-studies/content/`. Layout lives in `_includes/case-study.html`; the shared additions to the existing design system live in `case-studies/case-studies.css`. Edit the JSON files rather than generated HTML.

| Project | Content file | Public page |
| --- | --- | --- |
| Historical Glass Museum | `content/historical-glass-museum.json` | `historical-glass-museum.html` |
| Hair Color Portfolio | `content/hair-color-portfolio.json` | `hair-color-portfolio.html` |
| Sirius | `content/sirius.json` | `sirius.html` |
| Anthropos | `content/anthropos.json` | `anthropos.html` |

Paths in this table are relative to `case-studies/`. Existing Coding project URLs are already included under `links`. The Logo Design gallery keeps its original previews without case studies.

## Rebuild and preview

From the repository root, after any JSON or template edit:

```sh
node scripts/build-case-studies.js
python3 -m http.server 4175
```

Open `http://127.0.0.1:4175/codingprojects.html`, or a page directly, such as `http://127.0.0.1:4175/case-studies/sirius.html`.

The generated `.html` files work on a plain static server and GitHub Pages, with relative asset and navigation URLs. Commit them along with your content edits. The existing Eleventy configuration also regenerates these pages before a build and copies them, their stylesheet, and `case-studies/assets/` into `_site`. No browser content fetch, new package, routing service, or deployment step is required. Nothing in this workflow deploys the website.

## Write text

Each object in `sections` contains `id`, `title`, `placeholder`, and `blocks`. An empty `blocks` array displays that section's placeholder. Replace it with text blocks, one per paragraph:

```json
"blocks": [
  { "type": "text", "text": "Add your own paragraph here." },
  { "type": "text", "text": "Add another paragraph here." }
]
```

Some sections already have a placeholder text block followed by empty media blocks. Replace that text with your writing and populate, remove, or reorder the media blocks. Text is plain text, not HTML or Markdown; special characters are escaped automatically. Use `\n` for a newline inside a JSON string (separate text blocks create separate paragraphs). JSON requires double quotes and no trailing commas.

## Add images and screenshots

Put assets in `case-studies/assets/`, optionally in a subfolder per project. Add or update an image block in any section:

```json
{
  "type": "image",
  "src": "assets/sirius/screenshot.png",
  "alt": "Add an accurate description of the screenshot.",
  "caption": "Add an optional caption."
}
```

All media paths resolve relative to the generated page in `case-studies/`, not the JSON file. An existing image in the repository root can be referenced as `../sirius.png`. Images scale to the available width. Empty `src` values display a labeled space without requesting a missing image. Nonempty image sources require descriptive `alt` text. Remove a media block entirely to remove its placeholder.

## Embed Figma

In Figma, enable the intended sharing permissions and copy the iframe's `src` URL from its embed code. Paste only that URL into a block, not the entire iframe:

```json
{
  "type": "figma",
  "src": "https://embed.figma.com/proto/YOUR_FILE_ID/YOUR_FILE_NAME?embed-host=share",
  "title": "Add a descriptive prototype title.",
  "caption": "Add an optional caption."
}
```

Use the actual URL Figma supplies; the example is only a pattern. Both `embed.figma.com` and `www.figma.com` URLs are supported. The prototype must allow your visitors to view it. A nonempty embed source requires a descriptive `title` for accessibility. An empty `src` keeps the Figma placeholder.

## Add videos and interactive demonstrations

For a video file, put it in `assets/` and use:

```json
{
  "type": "video",
  "src": "assets/sirius/walkthrough.mp4",
  "title": "Add a descriptive video title.",
  "poster": "assets/sirius/video-poster.jpg",
  "caption": "Add an optional caption.",
  "tracks": [
    { "src": "assets/sirius/captions.vtt", "lang": "en", "label": "English" }
  ]
}
```

`poster`, `caption`, and `tracks` are optional. Add WebVTT captions for spoken audio. Videos have native controls and do not autoplay.

For a hosted video player or an interactive demonstration, copy the provider's HTTPS embed URL into a `demo` block:

```json
{
  "type": "demo",
  "src": "https://YOUR_EMBED_HOST/YOUR_EMBED_PATH",
  "title": "Add a descriptive demonstration title.",
  "caption": "Add an optional caption."
}
```

Use an embed/player URL, such as a video provider's `/embed/` URL, rather than a normal watch page. The provider must permit embedding. If it does not, use a link block instead. Embeds load lazily and support fullscreen. Empty video/demo sources keep the labeled placeholders.

## Update links

Edit the top-level `links` array to change the External Project Links section:

```json
"links": [
  { "label": "Visit project", "url": "https://YOUR_PROJECT_URL" },
  { "label": "View source", "url": "https://YOUR_REPOSITORY_URL" }
]
```

Use `"links": []` to show the empty links placeholder. Links require HTTPS and open in a separate tab. To place a link inside a section, add `{ "type": "link", "label": "Add a link label", "url": "https://YOUR_PROJECT_URL" }` to its `blocks` array. Links in the existing preview modals remain separately editable in `codingprojects.html`; editing a case study's links does not change those originals.

## Add, remove, or reorder sections

Reorder entries in `sections` to reorder the page. Delete an entry to remove the section. To add one, copy a section object, give it a unique lowercase, hyphenated `id`, and edit `title`, `placeholder`, and `blocks`. The ID `project-links` is reserved for External Project Links. All six block types (`text`, `image`, `figma`, `video`, `demo`, and `link`) work in any section and render in array order.

## Add a new case study

1. Copy an existing JSON file to `case-studies/content/your-project.json`. Use a unique lowercase, hyphenated filename; it becomes the public URL.
2. Set its `title`, `category` (`coding`), `links`, and `sections`. The category sets the destination of both back buttons.
3. Run `node scripts/build-case-studies.js` to create `case-studies/your-project.html`.
4. Add a button as a sibling of the project's existing preview button/figure, inside its card in `codingprojects.html`:

```html
<a class="project-link case-study-link"
   href="case-studies/your-project.html"
   aria-label="View Case Study: Your Project">View Case Study</a>
```

Commit the JSON file and generated HTML with the card update. If renaming or removing a study, remove the old generated HTML and update its card link as well.
