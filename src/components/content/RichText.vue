<script>
import { h } from 'vue';
const tags = { bold: 'strong', italic: 'em', sub: 'sub', sup: 'sup', code: 'code' };
function render(value, format = 'normal') {
  if (value == null) return '';
  if (Array.isArray(value)) return value.map(run => {
    if (typeof run === 'string') return run;
    if (!run) return '';
    if (run.type === 'br') return h('br');
    return render(run.text ?? run.content, run.format || format);
  });
  if (typeof value === 'object') return render(value.content ?? value.text, value.format || format);
  if (format === 'bold-italic') return h('strong', [h('em', String(value))]);
  return h(tags[format] || 'span', { class: format === 'underline' ? 'text-underline' : null }, String(value));
}
export default {
  props: { content: { default: '' }, format: { type: String, default: 'normal' } },
  setup: props => () => render(props.content, props.format)
};
</script>
