// One-time, idempotent migration of existing lessons to the explicit DSL.
const fs = require('node:fs');
const path = require('node:path');
const base = path.join(__dirname, '..', 'public');
const plain = value => typeof value === 'string' ? value : Array.isArray(value) ? value.map(item => plain(item.text ?? item.content ?? '')).join('') : value?.content ? plain(value.content) : '';
function localize(value) {
  if (Array.isArray(value)) { value.forEach(localize); return; }
  if (!value || typeof value !== 'object') return;
  if (typeof value.src === 'string' && /^https:\/\/(raw\.githubusercontent\.com|github\.com)\//.test(value.src)) {
    const match = value.src.match(/\/public\/(content\/[^?#]+)/);
    if (match) {
      const local = decodeURIComponent(match[1]);
      if (fs.existsSync(path.join(base, local))) value.src = 'public/' + local;
    }
  }
  Object.values(value).forEach(localize);
}
for (let id = 1; id <= 12; id++) {
  const file = path.join(base, 'content', 'Unit ' + id, 'unit' + id + '.json');
  const unit = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (id > 10) unit.status = 'draft';
  unit.content.forEach((block, index) => {
    if (block.type === 'text' && block.level && typeof block.content === 'string') {
      block.type = 'heading'; delete block.format; delete block.border;
    }
    if (block.type === 'text' && block.format === 'bold' && typeof block.content === 'string' && block.content.length <= 115) {
      block.type = 'heading'; block.level = 2; delete block.format; delete block.border;
    }
    if (block.type === 'iframe' && !block.title) block.title = block.src?.includes('IsomerGame') ? 'Isomer game' : 'Embedded lesson video or activity';
    if (block.type === 'image' && !block.alt && block.caption) block.alt = plain(block.caption);
    if (block.type === 'image' && /^(?:\d+[.]?\s*)?(?:Figure|Table)\s*\d+\s*$/i.test(block.alt || '')) {
      const next = unit.content[index + 1];
      const description = plain(next?.content).replace(/^Figure\s*\d+[.]?\s*/i, '').trim();
      if (description && description.length < 300 && !/^Table\s*\d/i.test(description)) block.alt = description;
    }
    if (block.type === 'table' && !block.caption) {
      const previous = unit.content[index - 1];
      const text = plain(previous?.content);
      if (/^Table\s*\d/i.test(text)) block.caption = text;
    }
  });
  localize(unit.content);
  fs.writeFileSync(file, JSON.stringify(unit, null, 2) + '\n');
}
