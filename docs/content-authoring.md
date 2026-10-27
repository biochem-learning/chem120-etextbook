# V1 content authoring guide

V1 has two lesson implementations. The sidebar chooses a unit from JSON and renders it with the shared slide page at `#/unit4`. Separate, older hand-authored slide pages still exist at `#/unit1` and `#/unit2`. Editing JSON does **not** change those two hand-authored pages.

## Update an existing sidebar lesson

1. Open `public/content/Unit N/unitN.json` (for example, `public/content/Unit 3/unit3.json`).
2. Edit `title` or add, remove, and reorder objects in the top-level `content` array. Each object is one content block. Keep the JSON valid, including commas and double quotes.
3. Put new media under the same `public/content/Unit N/` folder. For images and videos, a relative source such as `"content/Unit 3/diagram.png"` resolves under the site's base path. Existing HTTPS sources also work, but their content can change independently of this branch. The old 3D renderer is different: for a MOL file, use `"public/content/Unit 3/molecule.mol"`.
4. Validate, test, build, and open the unit from the sidebar:

   ```sh
   npm run validate:content
   npm test
   npm run build
   npm run serve
   ```

Validation runs automatically before every production build. Structural errors and missing local files fail validation. Editorial accessibility findings are reported as warnings for human review.

The sidebar labels in `src/App.vue` are hard-coded. Changing a JSON `title` changes the lesson heading, **not** its sidebar label. The selected unit is kept in browser local storage, so use the sidebar to select the unit before reviewing `#/unit4`.

## How the v1 JSON block format works

The textbook uses a formally defined JSON DSL: `src/content/schema.json` defines the contract, `src/content/registry.js` discovers lesson files, and `scripts/validate-content.cjs` validates them. The interpreter remains `src/views/units/JsonSlides.vue`, so the established slide markup, pagination, and styling remain unchanged. A minimal lesson looks like this:

```json
{
  "title": "Unit 3. Example",
  "content": [
    { "type": "text", "content": "A short explanation." },
    { "type": "image", "src": "content/Unit 3/diagram.png", "alt": "Description of the diagram", "width": 0.7 },
    { "type": "list", "content": ["First point", "Second point"] }
  ]
}
```

Blocks appear in array order. The renderer puts them into slides based on available space. Common fields are:

| `type` | Main fields | Result |
| --- | --- | --- |
| `heading` | `content`, optional `level` from 2–6 | Semantic heading rendered inside the legacy slide layout. |
| `text` | `content`, optional `format`, `border` | Paragraph. `border` accepts `true` or the legacy string `"true"`. |
| `image` | `src`, `alt`, optional `caption`, `width` | Image and optional caption. |
| `video` | `src`, optional `title`, `caption`, `width` | Video player. |
| `list` | `content` array | Unordered list. |
| `bullet-list` | `content` array | **Numbered** list in this legacy renderer, despite the name; retained for exact v1 visual compatibility. |
| `ordered-list` | `content` array | Numbered list. |
| `unordered-list` | `content` array | Bulleted list. |
| `table` | `head` array, `rows` array | Table; a cell can be an image block. |
| `textarea` | `prompt`, optional `height` in pixels | Practice input. |
| `podcast` | `introduction`, `link`, optional `image`, `text-content` | Podcast embed with surrounding text. |
| `iframe` | `src`, optional `width` | Embedded external page or activity. |
| `3d-model` | `src` to a MOL file, optional `name`, `width`, `height`, `background_color` | ChemDoodle model canvas. |
| `link` | `src`, `content` | Link opening in a new tab. |

`width` is a fraction: `0.7` means 70% of the available width. Text and some captions can contain rich-text runs:

```json
{
  "type": "text",
  "content": [
    { "type": "span", "text": "Water is " },
    { "type": "span", "text": "polar", "format": "bold" },
    { "type": "br" },
    { "type": "span", "text": "H" },
    { "type": "span", "text": "2", "format": "sub" },
    { "type": "span", "text": "O" }
  ]
}
```

The renderer recognizes `bold`, `italic`, `underline`, `bold-italic`, `code`, `sub`, and `sup`. See existing unit JSON for more examples. Unknown block types fail validation and display an in-page warning if they reach the renderer.

## Add a unit or edit the old slide pages

A correctly named `public/content/Unit N/unitN.json` file is discovered automatically; no registry edit is needed. V1's visible sidebar is still intentionally hard-coded to preserve its exact layout and labels, so add a sidebar entry in `src/App.vue` that calls `selectUnit('unitN')` and links to `/unit4`. The shared JSON route already exists; a separate route is unnecessary for another JSON unit.

The older pages at `#/unit1` and `#/unit2` are edited in `src/views/units/Unit1Slides.vue` and `Unit2Slides.vue`; their media imports are under `src/assets/unit1/`. The v1 home page is in `src/views/home-credit/HomeView.vue`.

## Publishing

After validation and review, publish the sole textbook site with:

```sh
npm run deploy:pages
```

This builds the current checkout and safely updates the existing `gh-pages` branch at the primary textbook URL. The `deploy-mac.sh` and `deploy-win.sh` wrappers use the same workflow.
