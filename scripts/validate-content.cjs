const fs = require('node:fs');
const path = require('node:path');
const Ajv = require('ajv');
const schema = require('../src/content/schema.json');
const validate = new Ajv({ allErrors: true, jsonPointers: true }).compile(schema);
const root = path.join(__dirname, '..', 'public');
const folders = fs.readdirSync(path.join(root, 'content')).filter(name => /^Unit \d+$/.test(name));
let failures = 0, warnings = 0, count = 0;
function inspectSource(node, location) {
  if (Array.isArray(node)) { node.forEach(child => inspectSource(child, location)); return; }
  if (!node || typeof node !== 'object') return;
  if (typeof node.src === 'string' && node.src) {
    const src = node.src;
    if (/^[a-z][a-z\d+.-]*:/i.test(src) && !/^https?:\/\//i.test(src)) {
      console.error(location + ': unsupported URL protocol'); failures++;
    } else if (!/^https?:\/\//i.test(src)) {
      const local = src.replace(/^\/?public\//, '');
      if (path.isAbsolute(local) || local.split(/[\\/]/).includes('..') || !fs.existsSync(path.join(root, local))) {
        console.error(location + ': local resource not found: ' + src); failures++;
      }
    }
  }
  Object.values(node).forEach(child => inspectSource(child, location));
}
for (const folder of folders) {
  const id = Number(folder.slice(5));
  const file = path.join(root, 'content', folder, 'unit' + id + '.json');
  let unit;
  try { unit = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { console.error(file + ': ' + error.message); failures++; continue; }
  if (!validate(unit)) {
    for (const error of validate.errors) console.error(file + error.dataPath + ': ' + error.message);
    failures++;
  }
  count += unit.content?.length || 0;
  (unit.content || []).forEach((block, i) => {
    const location = 'Unit ' + id + ' block ' + (i + 1);
    const warn = message => { console.warn(location + ': ' + message); warnings++; };
    inspectSource(block, location);
    if (block.type === 'image' && !block.decorative && (!block.alt || /^(?:\d+[.]?\s*)?(?:figure|table)\s*\d+\s*$/i.test(block.alt))) warn('image needs a meaningful description');
    if (['video', 'podcast'].includes(block.type) && !block.transcript && !(block.tracks || []).length) warn('media needs captions or a transcript review');
    if (block.type === '3d-model' && !block.description) warn('model needs a text description');
    if (block.type === 'iframe' && !block.title) warn('embedded resource needs a title');
    if (block.type === 'table' && !block.caption && !block.title) warn('table needs a caption');
  });
}
console.log('Validated ' + count + ' content blocks in ' + folders.length + ' units; ' + failures + ' errors, ' + warnings + ' editorial accessibility items.');
if (failures) process.exitCode = 1;
