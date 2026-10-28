# Updating textbook content

Lessons use a JSON-based content DSL. The schema is `src/content/schema.json`, the interpreter is `src/views/units/JsonSlides.vue`, and unit files are discovered by `src/content/registry.js`.

## Edit an existing unit

1. Open `public/content/Unit N/unitN.json`
2. Edit `title`, optional `status`, or blocks in `content`
3. Put new media in the same `public/content/Unit N/` folder
4. Reference local media as `content/Unit N/file.ext`
5. Validate and preview the result

```sh
npm run validate:content
npm run serve
```

Blocks render in array order and are automatically split into textbook pages.

## Add a unit

Create the folder and JSON file with matching numbers:

```text
public/content/Unit 13/unit13.json
```

```json
{
  "title": "Unit 13. Example title",
  "status": "published",
  "content": [
    { "type": "heading", "level": 2, "content": "Topic" },
    { "type": "text", "content": "Lesson text" }
  ]
}
```

The registry discovers correctly named files automatically. The sidebar is not fully generated, so a new visible unit must also receive an entry in `src/App.vue` that selects `unit13` and links to `/unit4`.

Use `"status": "published"` for a finished lesson and `"draft"` while editing. If `status` is omitted, units above 10 default to draft. The current sidebar is hard-coded, so `status` alone does not add or remove its links.

## DSL quick reference

Every block requires `type`. These are the main supported fields:

| Type | Main fields |
| --- | --- |
| `heading` | `content`, optional `level` from 2 to 6 |
| `text` | `content`, optional `format`, `border` |
| `image` | `src`, `alt` or `decorative: true`, optional `caption`, `width` |
| `video` | `src`, optional `title`, `caption`, `width`, `transcript`, `tracks` |
| `list` / `unordered-list` | `content` array |
| `ordered-list` / `bullet-list` | `content` array |
| `table` | `rows`, optional `head`, `title`, `caption` |
| `textarea` | `prompt`, optional `height` |
| `podcast` | `introduction`, `link`, optional `image`, `text-content`, `transcript` |
| `iframe` | `src`, `title`, optional `width`, `fullPage`, `openInNewTab`, `openLabel` |
| `3d-model` | `src`, optional `name`, `width`, `height`, `background_color`, `description` |
| `link` | `src`, `content` |

`width` is a fraction, so `0.7` means 70% of the available width.

Text may be a string or rich-text runs:

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

Formats are `normal`, `bold`, `italic`, `underline`, `bold-italic`, `code`, `sub`, and `sup`.

## Media and accessibility

- Use HTTPS for external media
- Keep local paths inside `public/` and do not use `..`
- Give informative images meaningful `alt` text
- Use `decorative: true` only when an image adds no information
- Give iframes a `title`
- Review captions or transcripts for video and podcast content
- Give 3D models a text `description`
- Give tables a `title` or `caption`

The validator fails invalid JSON, unsupported blocks, schema errors, and missing local files. Accessibility review items are reported as warnings.

## Build and publish

```sh
npm run validate:content
npm run build
```

After reviewing the production build, publish the current checkout with:

```sh
npm run deploy:pages
```
