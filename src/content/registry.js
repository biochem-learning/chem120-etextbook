// Existing unit folders remain the authoring source. New unitN.json files are discovered at build time.
const context = require.context('../../public/content', true, /\/unit\d+\.json$/);
const documents = new Map();
context.keys().forEach(path => {
  const id = Number(path.match(/unit(\d+)\.json$/)[1]);
  const data = context(path);
  documents.set(id, data.default || data);
});
export const units = [...documents].map(([id, data]) => ({
  id, title: data.title, draft: data.status === 'draft' || (data.status == null && id > 10)
})).sort((a, b) => a.id - b.id);
export const publishedUnits = units.filter(unit => !unit.draft);
export async function loadUnit(id) {
  if (!/^\d+$/.test(String(id))) return null;
  return documents.get(Number(id)) || null;
}
