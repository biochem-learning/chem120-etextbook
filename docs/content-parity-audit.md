# Original-content parity audit

Baseline: committed source at `49dfcafeda0ae6e8a80dec04c982d00ea82ae6bc`, compared with the current working tree. This is an audit only; it does not modify lessons. The [field-level manifest](content-parity-diff.json) contains every old and new value for all 328 changed JSON fields.

## Committed JSON lessons

All 12 lesson titles, block counts, authored `content` values, nested `text-content` values, table data, and block order match the committed JSON. Unit 5's original final cat image is present. No JSON lesson prose or practice prompt was added or removed.

| Unit | Blocks | Changed fields |
| --- | ---: | ---: |
| 1 | 43 | 48 |
| 2 | 38 | 49 |
| 3 | 52 | 22 |
| 4 | 37 | 24 |
| 5 | 20 | 25 |
| 6 | 21 | 29 |
| 7 | 40 | 48 |
| 8 | 24 | 17 |
| 9 | 23 | 34 |
| 10 | 27 | 20 |
| 11 | 11 | 6 |
| 12 | 12 | 6 |

The 328 changed fields are: 121 media `src` values, 44 `text` to `heading` type changes with the corresponding 44 new `level` fields and removal of 44 `format` and 44 `border` fields, 14 image alternatives, 7 added table captions, 7 iframe/model titles, 1 model description, and 2 draft statuses. The 44 headings retain their exact words but render and navigate differently. Added captions repeat existing table descriptions; they do not replace original prose.

All 121 rewritten media URLs resolve to the same decoded `public/content` path as before. Every target file exists and is byte-identical to that path in the baseline commit. The URL changes remove the published reader's dependency on GitHub raw-file delivery for those assets. External YouTube, podcast, and activity URLs otherwise remain in the JSON. Future changes to the old GitHub-hosted media will not appear automatically; the matching local file must be updated and the app rebuilt.

## Which original path students used

The old sidebar sent every Unit 1–12 selection to `#/unit4`, a generic slide renderer that selected an imported JSON file from component state. It also displayed placeholder links for Units 13–30. Direct `#/unit1` and `#/unit2` routes opened separate hard-coded Vue lessons. A hard-coded Unit 3 component existed in source but had no route.

The current sidebar links directly to `#/units/1` through `#/units/10`, each showing its JSON. Units 11–12 were marked draft and removed from the sidebar but remain directly accessible. Old-style `#/unitN` addresses redirect to the corresponding JSON lesson. Consequently, direct old `#/unit1` and `#/unit2` links no longer show their hard-coded lessons, and `#/unit4` no longer depends on a previously selected sidebar unit.

## Material only in the old hard-coded lessons

The direct old Unit 1 lesson contained a learning-goal response field, a three-part soda-sharing analogy, four practice diagrams for Lewis dots, bond counts, and Lewis/condensed conversion, and wrap-up response prompts. Those items are not in the original Unit 1 JSON and are not in the current active reader. The four practice image files remain in `docs/archive/src_assets`.

The direct old Unit 2 lesson began with a detailed bond-line notation explanation and included an Isomer Game launch. Bond-line notation is covered with different wording in current JSON Unit 1; the Isomer Game is in current JSON Unit 3. The hard-coded Unit 3 source contained nomenclature prose and examples, including a detailed 2-methylbutane numbering explanation. It was not routed in the old app and is not reproduced verbatim in current JSON Unit 2.

The old direct lessons used page navigation, a progress bar, swipe/arrow-key controls, and clickable image/video overlays. The current reader uses a continuous page, section links, inline media, and open-in-new-tab links. The generic old JSON renderer rendered `bullet-list` as numbered lists; the new reader renders the eight such blocks as bulleted lists. The old generic model initialized automatically; the new one loads on button activation and adds keyboard controls.

## Home, credits, and source archive

The home page was rewritten: its welcome and 2D/3D explanation is shorter, the PubChem epinephrine example and 2D image remain, and the old contact form was replaced by direct phone and email links. The credits page replaced eight anonymous placeholder profile cards with a shorter credits statement. The site navigation, styling, and route behavior changed.

All 55 tracked files removed from their old active locations have equivalents in `docs/archive`. Fifty-four copies are byte-identical to the baseline; `public/content/syntax.json` differs only by a final newline. Archived source is preserved but is not rendered by the new app.

## Verification boundary

The production build, schema tests, all published routes, local media URLs, model controls, mobile reflow, and an automated WCAG A/AA browser scan passed locally. This verifies current app operation, not exact old-site behavior or complete WCAG conformance. Unit 1 media alternatives and third-party embed accessibility remain open in [accessibility.md](accessibility.md).
