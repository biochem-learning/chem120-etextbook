<template>
  <component v-if="block.type === 'heading'" :is="'h' + (block.level || 2)" :id="id" tabindex="-1"><RichText :content="block.content" /></component>
  <p v-else-if="block.type === 'text'" :class="{ bordered: hasBorder(block.border) }"><RichText :content="block.content" :format="block.format || 'normal'" /></p>
  <MediaBlock v-else-if="['image', 'video'].includes(block.type)" :block="block" />
  <component v-else-if="['list', 'bullet-list', 'ordered-list', 'unordered-list'].includes(block.type)"
    :is="block.ordered === true || block.type === 'ordered-list' ? 'ol' : 'ul'">
    <li v-for="(item, index) in block.content" :key="index"><RichText :content="item" /></li>
  </component>
  <TableBlock v-else-if="block.type === 'table'" :block="block" />
  <ExerciseBlock v-else-if="block.type === 'textarea'" :block="block" :id="id" />
  <EmbedBlock v-else-if="block.type === 'iframe'" :block="block" />
  <ModelBlock v-else-if="block.type === '3d-model'" :block="block" :id="id" />
  <section v-else-if="block.type === 'podcast'" class="podcast" :aria-label="block.title || 'Podcast'">
    <p v-if="block.introduction"><RichText :content="block.introduction" /></p>
    <MediaBlock v-if="block.image && !block.link" :block="{ ...block.image, type: 'image' }" />
    <EmbedBlock v-if="block.link" :block="{ type: 'iframe', src: block.link, title: block.title || 'Lesson podcast', transcript: block.transcript }" />
    <p v-for="(text, index) in block['text-content'] || []" :key="index"><RichText :content="text" /></p>
  </section>
  <p v-else-if="block.type === 'link'"><a :href="assetUrl(block.src)" target="_blank" rel="noopener noreferrer"><RichText :content="block.content" /> <span class="sr-only">(opens in a new tab)</span></a></p>
  <p v-else role="alert" class="notice">Unsupported content block: {{ block.type }}. Please report this lesson issue.</p>
</template>
<script>
import RichText from './RichText.vue';
import MediaBlock from './MediaBlock.vue';
import TableBlock from './TableBlock.vue';
import EmbedBlock from './EmbedBlock.vue';
import ModelBlock from './ModelBlock.vue';
import ExerciseBlock from './ExerciseBlock.vue';
import { assetUrl, hasBorder } from '../../content/format';
export default {
  components: { RichText, MediaBlock, TableBlock, EmbedBlock, ModelBlock, ExerciseBlock },
  props: { block: { type: Object, required: true }, id: { type: String, required: true } },
  methods: { assetUrl, hasBorder }
};
</script>
