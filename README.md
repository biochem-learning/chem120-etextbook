# CHEM 120 Organic Chemistry E-Text

The active application is a Vue 3 textbook. Each lesson is authored in JSON and displayed by one shared, scrolling reader. The original embedded lesson components and an unused Vite starter are preserved in [docs/archive](docs/archive) for comparison.

## Versions

Version 2 is a substantial redesign of the original textbook system. The final original implementation is preserved by the `v1` branch and `v1.0.0` tag at commit `49dfcaf`. The `main` branch contains the redesigned reader; `v2.0.0` marks its first release. See the [content parity audit](docs/content-parity-audit.md) for the exact differences between them.

Git branches and tags preserve source code; GitHub Pages publishes the builds. Both versions use the same `biochem-learning/chem120-etextbook` repository: v2 is at [the current textbook URL](https://biochem-learning.github.io/chem120-etextbook/), and v1 is at [the legacy URL](https://biochem-learning.github.io/chem120-etextbook/v1/). Run `npm run build:pages` to build both into ignored `dist-pages/`, then `npm run deploy:pages -- --publish-built` to publish that reviewed build. Running `npm run deploy:pages` builds and publishes in one step. The deployment script updates the existing `gh-pages` branch without force-pushing. It builds v1 from the untouched `v1.0.0` tag in a temporary directory, adjusts only its deployment path, and pins its existing GitHub media URLs to that tag so future edits to `main` cannot change legacy media. The old `deploy-mac.sh` and `deploy-win.sh` commands now use this same dual-version process.

## Run and build

```sh
npm install
npm run serve
npm run validate:content
npm run build
```

The app uses hash URLs such as `#/units/1` and is configured for the `/chem120-etextbook/` deployment path. A build runs the content validator first. Units 1–10 are published. Units 11–12 are marked `"status": "draft"` and are available only by direct URL while their sample content is replaced.

## Update a lesson

Edit `public/content/Unit N/unitN.json`. The `title` is used for both the lesson heading and the navigation label. Add blocks to `content` in reading order. Put images, videos, and molecule files in the same unit folder and refer to them as `"src": "public/content/Unit N/filename.png"`. External HTTPS URLs continue to work, but local files make the textbook less dependent on another server. Run `npm run validate:content`, then `npm run build`. New `Unit N/unitN.json` files are discovered automatically at build time.

For example:

```json
{
  "title": "Unit 13. Example",
  "status": "draft",
  "content": [
    { "type": "heading", "level": 2, "content": "A topic" },
    { "type": "text", "content": "Lesson text." },
    { "type": "image", "src": "public/content/Unit 13/example.png", "alt": "A descriptive explanation of the image", "caption": "Figure 1. Example." },
    { "type": "textarea", "prompt": "Explain the structure in your own words." }
  ]
}
```

Set `"status": "published"` when the lesson is ready. The reader also accepts the existing `text`, `list`, `bullet-list`, `table`, `video`, `iframe`, `podcast`, `3d-model`, and `link` blocks. For `text`, `content` can be a string or an array of `{"type":"span","text":"...","format":"bold"}` runs; `sub` and `sup` are supported. The complete structural contract is in [schema.json](src/content/schema.json).

Author meaningful image `alt` text, iframe `title`, captions or `transcript` for video and podcasts, and a `description` for models. A video `tracks` array can list VTT captions with `src`, `kind`, `lang`, and `label`. Validation rejects structural mistakes and missing local files. It reports editorial accessibility items separately; those require review by someone familiar with the lesson media.

Practice `textarea` responses stay in the browser while the lesson is open. They are not submitted or saved.

## Code map

- `src/App.vue`: site navigation and page landmark
- `src/router/index.js`: lesson URLs and old-link redirects
- `src/content/registry.js`: discovery of unit JSON files
- `src/views/LessonReader.vue`: lesson loading and contents navigation
- `src/components/content/`: block rendering, including media and 3D models
- `scripts/validate-content.cjs`: JSON and local media checks
- `docs/archive/`: previous implementations kept for content comparison

See [accessibility notes](docs/accessibility.md) for the remaining content work.
