#!/usr/bin/env node
"use strict";

// Dependency-free static generation; the browser needs no content loader.
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const output = path.join(root, "case-studies");
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);

function url(value, external = false) {
  if (typeof value !== "string" || !value.trim()) throw new Error("A nonempty URL is required.");
  if (external ? !/^https:\/\//i.test(value) : /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value) && !/^https?:\/\//i.test(value)) {
    throw new Error(`Unsupported URL: ${value}`);
  }
  return escape(value);
}

function link(item) {
  return `<a class="project-link" href="${url(item.url, true)}" target="_blank" rel="noopener noreferrer">${escape(item.label)}</a>`;
}

function renderBlock(block) {
  const type = block.type;
  if (type === "text") return `<p>${escape(block.text)}</p>`;
  if (type === "link") return `<p>${link(block)}</p>`;
  const labels = {
    image: ["Images & screenshots", "Add images or screenshots here."],
    figma: ["Figma prototype", "Add a Figma embed here."],
    video: ["Video", "Add a video here."],
    demo: ["Interactive demonstration", "Add an interactive demonstration here."]
  };
  if (!labels[type]) throw new Error(`Unknown block type: ${type}`);
  if (!block.src) {
    return `<div class="case-study__placeholder"><strong>${labels[type][0]}</strong><span>${labels[type][1]}</span></div>`;
  }
  const caption = block.caption ? `<figcaption>${escape(block.caption)}</figcaption>` : "";
  if (type === "image") {
    if (!block.alt) throw new Error("Images require descriptive alt text.");
    return `<figure><img src="${url(block.src)}" alt="${escape(block.alt)}" loading="lazy" decoding="async">${caption}</figure>`;
  }
  if (type === "video") {
    const poster = block.poster ? ` poster="${url(block.poster)}"` : "";
    const tracks = (block.tracks || []).map((track) => `<track kind="captions" src="${url(track.src)}" srclang="${escape(track.lang)}" label="${escape(track.label)}">`).join("");
    return `<figure><video controls preload="metadata" playsinline aria-label="${escape(block.title || "Project video")}"${poster}><source src="${url(block.src)}">${tracks}<a href="${url(block.src)}">Download video</a></video>${caption}</figure>`;
  }
  if (!block.title) throw new Error("Embeds require an accessible title.");
  const src = url(block.src, true);
  if (type === "figma" && !["www.figma.com", "embed.figma.com"].includes(new URL(block.src).hostname)) {
    throw new Error("Use a Figma embed URL for figma blocks.");
  }
  return `<figure><iframe class="case-study__embed" src="${src}" title="${escape(block.title)}" loading="lazy" allow="fullscreen" allowfullscreen></iframe>${caption}</figure>`;
}

function renderStudy(study, slug, template) {
  if (!["coding", "design"].includes(study.category)) throw new Error(`${slug}: category must be coding or design.`);
  if (!study.title || !Array.isArray(study.sections) || !Array.isArray(study.links)) throw new Error(`${slug}: title, sections and links are required.`);
  const ids = new Set(["project-links"]);
  const sections = study.sections.map((section) => {
    if (!/^[a-z][a-z0-9-]*$/.test(section.id) || ids.has(section.id) || !section.title) {
      throw new Error(`${slug}: sections require unique IDs and titles.`);
    }
    ids.add(section.id);
    const blocks = section.blocks || [];
    const content = blocks.length ? blocks.map(renderBlock).join("\n          ") : `<p>${escape(section.placeholder || `Add ${section.title.toLowerCase()} here.`)}</p>`;
    return `      <section class="case-study__section" aria-labelledby="${section.id}">\n        <h2 id="${section.id}">${escape(section.title)}</h2>\n        <div class="case-study__content">\n          ${content}\n        </div>\n      </section>`;
  }).join("\n");
  const fields = {
    slug: escape(slug), title: escape(study.title), category: escape(study.category),
    categoryLabel: study.category === "coding" ? "development" : "design",
    backPage: `${study.category}projects.html`, sections,
    links: study.links.length ? study.links.map(link).join("\n") : '<div class="case-study__placeholder"><span>Add external project links here.</span></div>'
  };
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in fields)) throw new Error(`Unknown template field: ${key}`);
    return fields[key];
  });
}

function build() {
  const template = fs.readFileSync(path.join(root, "_includes/case-study.html"), "utf8");
  const directory = path.join(output, "content");
  // Validate every file before writing any pages.
  const pages = fs.readdirSync(directory).filter((file) => file.endsWith(".json")).sort().map((file) => {
    const slug = file.slice(0, -5);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid filename: ${file}`);
    const study = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
    return { slug, html: renderStudy(study, slug, template) };
  });
  pages.forEach(({ slug, html }) => fs.writeFileSync(path.join(output, `${slug}.html`), html));
  console.log(`Generated ${pages.length} case study pages.`);
}

module.exports = build;
if (require.main === module) build();
