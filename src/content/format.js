// Compatibility helpers shared by the reader and authoring tools.
export function plainText(value) {
  if (value == null) return '';
  if (Array.isArray(value)) return value.map(plainText).join('');
  if (typeof value === 'object') return plainText(value.text ?? value.content ?? '');
  return String(value);
}
export function assetUrl(src, base = process.env.BASE_URL || '/') {
  if (!src) return '';
  const value = String(src).trim();
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith('//')) return '';
  return base.replace(/\/?$/, '/') + value.replace(/^\/?public\//, '').replace(/^\//, '');
}
export function mediaStyle(block) {
  return { width: block.width == null ? '100%' : Math.min(100, Math.max(1, Number(block.width) * 100)) + '%' };
}
export function hasBorder(value) { return value === true || value === 'true'; }
export function sectionId(index) { return 'section-' + (index + 1); }
