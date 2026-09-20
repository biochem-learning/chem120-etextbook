<template><div class="reader">
  <p v-if="loading" role="status">Loading lesson…</p>
  <section v-else-if="error"><h1 ref="heading" tabindex="-1">Lesson could not be loaded</h1><p>{{ error }}</p><button type="button" @click="read">Try again</button></section>
  <section v-else-if="!unit"><h1 ref="heading" tabindex="-1">Unit not found</h1><p>There is no lesson at this address.</p><RouterLink to="/">Browse available units</RouterLink></section>
  <template v-else>
    <nav class="breadcrumbs" aria-label="Breadcrumb"><RouterLink to="/">Textbook</RouterLink> / Unit {{ id }}</nav>
    <p v-if="isDraft" class="notice">Draft lesson: this material is unfinished and may contain placeholders.</p>
    <h1 ref="heading" tabindex="-1">{{ unit.title }}</h1>
    <details v-if="headings.length" class="lesson-contents"><summary>On this page</summary>
      <nav aria-label="Lesson sections"><ul><li v-for="heading in headings" :key="heading.id"><a :href="'#' + heading.id" @click.prevent="goToSection(heading.id)">{{ heading.text }}</a></li></ul></nav>
    </details>
    <article :aria-label="unit.title" :key="id"><ContentBlock v-for="(block, index) in unit.content" :key="index" :block="block" :id="sectionId(index)" /></article>
    <nav class="lesson-navigation" aria-label="Adjacent lessons">
      <RouterLink v-if="previous" :to="'/units/' + previous.id">← {{ previous.title }}</RouterLink>
      <RouterLink v-if="next" :to="'/units/' + next.id">{{ next.title }} →</RouterLink>
    </nav>
    <p><a href="#main-content" @click.prevent="backToTop">Back to top</a></p>
  </template>
</div></template>
<script>
import ContentBlock from '../components/content/ContentBlock.vue';
import { loadUnit, units, publishedUnits } from '../content/registry';
import { plainText, sectionId } from '../content/format';
export default {
  components: { ContentBlock }, props: { id: String },
  data: () => ({ unit: null, loading: false, error: '', request: 0 }),
  computed: {
    isDraft() { return units.find(unit => unit.id === Number(this.id))?.draft; },
    headings() { return (this.unit?.content || []).flatMap((block, index) => block.type === 'heading' ? [{ id: sectionId(index), text: plainText(block.content) }] : []); },
    previous() { const index = publishedUnits.findIndex(unit => unit.id === Number(this.id)); return index > 0 ? publishedUnits[index - 1] : null; },
    next() { const index = publishedUnits.findIndex(unit => unit.id === Number(this.id)); return index >= 0 ? publishedUnits[index + 1] : null; }
  },
  watch: { id: { immediate: true, handler: 'read' } },
  beforeUnmount() { this.request++; },
  methods: {
    sectionId,
    async read() {
      const request = ++this.request;
      this.loading = true; this.error = ''; this.unit = null;
      try {
        const unit = await loadUnit(this.id);
        if (request !== this.request) return;
        this.unit = unit;
        document.title = (unit?.title || 'Unit not found') + ' · CHEM 120';
      } catch (error) {
        if (request !== this.request) return;
        this.error = 'Please reload the page or return to the textbook contents.';
      } finally {
        if (request === this.request) {
          this.loading = false; await this.$nextTick();
          if (request === this.request) {
            const hash = this.$route.hash.slice(1);
            if (hash && document.getElementById(hash)) this.goToSection(hash);
            else this.$refs.heading?.focus({ preventScroll: true });
          }
        }
      }
    },
    goToSection(id) {
      const target = document.getElementById(id);
      if (!target) return;
      history.replaceState(null, '', '#' + this.$route.path + '#' + id);
      target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'start' });
    },
    backToTop() { this.$refs.heading?.focus({ preventScroll: true }); window.scrollTo({ top: 0 }); }
  }
};
</script>
