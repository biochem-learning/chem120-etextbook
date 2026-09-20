<template>
  <div class="table-scroll" role="region" :aria-label="label" tabindex="0">
    <table>
      <caption v-if="block.caption"><RichText :content="block.caption" /></caption>
      <thead v-if="block.head && block.head.length"><tr>
        <th v-for="(cell, index) in block.head" :key="index" scope="col"><RichText :content="cell" /></th>
      </tr></thead>
      <tbody><tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
        <component :is="block.rowHeaders && column === 0 ? 'th' : 'td'"
          v-for="(cell, column) in row" :key="column" :scope="block.rowHeaders && column === 0 ? 'row' : undefined">
          <ZoomableImage v-if="cell && cell.type === 'image'" :src="assetUrl(cell.src)"
            :alt="cell.decorative ? '' : cell.alt || ''" :image-style="mediaStyle(cell)" />
          <RichText v-else :content="cell" />
        </component>
      </tr></tbody>
    </table>
  </div>
</template>
<script>
import RichText from './RichText.vue';
import ZoomableImage from './ZoomableImage.vue';
import { assetUrl, mediaStyle, plainText } from '../../content/format';
export default {
  components: { RichText, ZoomableImage }, props: { block: { type: Object, required: true } },
  computed: { label() { return this.block.title || plainText(this.block.caption) || 'Lesson table'; } },
  methods: { assetUrl, mediaStyle }
};
</script>
