# ETextbook for improved learning in biochemistry
Source code for "E-TextBook For Better Learning in Chemistry 120" project

## Introduction
Organic chemistry is a highly visual subject  since organic compounds are 3D objects. For this reason, in order to fully understand the composition, properties, and chemistry of these compounds, it is essential to understand and visualize their 3D structures. Nevertheless, there is a frequent necessity to depict organic substances on 2D surfaces, such as paper, a computer screen, or a whiteboard. As a result, one of the biggest obstacles we will face is learning these molecules in a 2D format while maintaining an accurate understanding of 3D nature. The purpose of this e-textbook is to fully utilize the digital medium by integrating images, videos, games, 3D interactive objects, etc., in order to assist students in comprehending the properties of molecules in both 2D and 3D formats.

## Repository layout

- `src/App.vue`: shared header, sidebar, and navigation.
- `src/router/index.js`: page routes.
- `src/views/home-credit/`: home and credits pages.
- `src/views/units/Unit1Slides.vue` and `Unit2Slides.vue`: the original hand-authored Unit 1 and 2 slides. Their lesson text and markup remain in these Vue files.
- `src/views/units/JsonSlides.vue`: the original JSON-backed slide renderer, reached through `#/unit4`.
- `src/content/units.js`: registry of the twelve unit JSON files used by that renderer.
- `public/content/Unit N/unitN.json`: unit content for the JSON-backed reader. Media referenced by JSON lives under the same unit's public folder.
- `src/legacy/slideControls.js` and `src/styles/slide.css`: controls and appearance shared by the original slides.
- `src/assets/unit1/` and `src/assets/site/`: imported media and site images.
- `docs/archive/`: older, unrouted starter material retained for reference. `Unit3Slides.vue` is also retained but has no route in v1.

## Editing content

The v1 home page opens the hand-authored Unit 1 and 2 routes, so edit `src/views/units/Unit1Slides.vue` or `Unit2Slides.vue` to change what students see there. The JSON-backed route uses `public/content/Unit N/unitN.json`; edit the corresponding JSON file and its media for that route. Adding a new JSON file by itself does not create a new navigation entry: register it in `src/content/units.js` and update the navigation/route as needed. Keep the existing JSON structure and check the result in the browser after editing.

This cleanup kept the lesson JSON and media unchanged. It repaired the old Unit 1–2 slide controls without changing their text or appearance.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Contributions

## Deployment note

This local v1 cleanup is separate from `main` and the published site. The historical `deploy-mac.sh` and `deploy-win.sh` scripts force-push to `gh-pages`; running either would replace the current combined v1/v2 publication. Use the combined deployment workflow from the main repository only after reviewing the intended release.
