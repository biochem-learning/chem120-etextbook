const test = require('node:test');
const assert = require('node:assert/strict');
const Ajv = require('ajv');
const schema = require('../src/content/schema.json');
const validate = new Ajv({ allErrors: true }).compile(schema);
test('legacy rich captions remain valid', () => {
  assert.equal(validate({ title: 'A', content: [{ type: 'image', src: 'public/content/example.png', alt: 'Diagram', caption: { type: 'text', content: [{ type: 'span', text: 'Figure', format: 'bold' }] } }] }), true);
});
test('a content image must have an alternative or be decorative', () => {
  assert.equal(validate({ title: 'A', content: [{ type: 'image', src: 'x.png' }] }), false);
  assert.equal(validate({ title: 'A', content: [{ type: 'image', src: 'x.png', decorative: true }] }), true);
});
test('unknown block types cannot silently disappear', () => {
  assert.equal(validate({ title: 'A', content: [{ type: 'mystery', content: 'lost' }] }), false);
});

test('list items follow the rich-text contract', () => {
  assert.equal(validate({ title: 'A', content: [{ type: 'bullet-list', content: ['Valid item'] }] }), true);
  assert.equal(validate({ title: 'A', content: [{ type: 'bullet-list', content: [{ unexpected: true }] }] }), false);
});
