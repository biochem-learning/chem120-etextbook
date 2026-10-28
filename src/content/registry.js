const context = require.context('../../public/content', true, /\/unit\d+\.json$/);
const documents = new Map();

context.keys().forEach(path => {
  const match = path.match(/unit(\d+)\.json$/);
  if (!match) return;
  const id = Number(match[1]);
  const data = context(path);
  documents.set(id, data.default || data);
});

export const units = Object.fromEntries(
  [...documents].map(([id, data]) => ['unit' + id, data])
);

export const unitList = [...documents]
  .map(([id, data]) => ({
    id,
    key: 'unit' + id,
    title: data.title,
    draft: data.status === 'draft' || (data.status == null && id > 10)
  }))
  .sort((a, b) => a.id - b.id);

export const publishedUnits = unitList.filter(unit => !unit.draft);

export async function loadUnit(id) {
  if (!/^\d+$/.test(String(id))) return null;
  return documents.get(Number(id)) || null;
}
