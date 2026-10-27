# ETextbook for improved learning in biochemistry
Source code for "E-TextBook For Better Learning in Chemistry 120" project

This repository now maintains and publishes one version: the cleaned-up original textbook application.

## Introduction
Organic chemistry is a highly visual subject  since organic compounds are 3D objects. For this reason, in order to fully understand the composition, properties, and chemistry of these compounds, it is essential to understand and visualize their 3D structures. Nevertheless, there is a frequent necessity to depict organic substances on 2D surfaces, such as paper, a computer screen, or a whiteboard. As a result, one of the biggest obstacles we will face is learning these molecules in a 2D format while maintaining an accurate understanding of 3D nature. The purpose of this e-textbook is to fully utilize the digital medium by integrating images, videos, games, 3D interactive objects, etc., in order to assist students in comprehending the properties of molecules in both 2D and 3D formats.

## Repository layout

- `src/App.vue`: shared header, sidebar, and navigation.
- `src/router/index.js`: page routes.
- `src/views/home-credit/`: home and credits pages.
- `src/views/units/Unit1Slides.vue` and `Unit2Slides.vue`: the original hand-authored Unit 1 and 2 slides. Their lesson text and markup remain in these Vue files.
- `src/views/units/JsonSlides.vue`: the original JSON-backed slide renderer, reached through `#/unit4`.
- `src/content/registry.js`: automatic discovery and loading of unit JSON files.
- `src/content/schema.json`: formal JSON DSL contract.
- `scripts/validate-content.cjs`: schema, media-path, and editorial accessibility checks.
- `public/content/Unit N/unitN.json`: unit content for the JSON-backed reader. Media referenced by JSON lives under the same unit's public folder.
- `src/legacy/slideControls.js` and `src/styles/slide.css`: controls and appearance shared by the original slides.
- `src/assets/unit1/` and `src/assets/site/`: imported media and site images.
- `docs/archive/`: older, unrouted starter material retained for reference. `Unit3Slides.vue` is also retained but has no route in v1.

## Editing content

The older hand-authored Unit 1 and 2 routes are separate from the sidebar JSON lessons. Edit `src/views/units/Unit1Slides.vue` or `Unit2Slides.vue` to change what students see there. The JSON-backed route uses `public/content/Unit N/unitN.json`; edit the corresponding JSON file and its media for that route. A correctly named new unit JSON file is discovered automatically, but its visible v1 sidebar entry must still be added to `src/App.vue`. Keep the existing JSON structure and check the result in the browser after editing. See the [v1 content authoring guide](docs/content-authoring.md) for the full workflow and block format.

The cleanup retains the original visible lesson text, media, slide layout, and styling. Six existing images received nonvisual alternative-text metadata so all lessons satisfy the shared schema. The old Unit 1–2 slide controls were repaired without changing their text or appearance.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Validates the JSON DSL
```
npm run validate:content
npm test
```

### Compiles and minifies for production

```
npm run build
```

A production build runs content validation first.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Contributions

## Deployment note

The textbook is published at `https://biochem-learning.github.io/chem120-etextbook/`.

```sh
npm run deploy:pages
```

The deployment command validates and builds the application, then updates the existing `gh-pages` branch without force-pushing. The legacy `deploy-mac.sh` and `deploy-win.sh` commands call the same safe workflow.
