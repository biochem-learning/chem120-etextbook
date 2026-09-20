<template>
  <figure class="embed-block">
    <iframe v-if="url" :src="url" :title="title" :style="mediaStyle(block)" loading="lazy"
      allow="fullscreen" allowfullscreen></iframe>
    <p v-else role="status">This embedded resource has no usable address.</p>
    <figcaption v-if="block.caption"><RichText :content="block.caption" /></figcaption>
    <p v-if="url" class="media-actions"><a :href="url" target="_blank" rel="noopener noreferrer">Open {{ title }} in a new tab</a></p>
    <details v-if="block.transcript"><summary>Transcript</summary><p class="transcript"><RichText :content="block.transcript" /></p></details>
    <p v-if="block.description"><RichText :content="block.description" /></p>
  </figure>
</template>
<script>
import RichText from './RichText.vue';
import { assetUrl, mediaStyle, plainText } from '../../content/format';
export default {
  components: { RichText }, props: { block: { type: Object, required: true } },
  computed: {
    url() { return assetUrl(this.block.src); },
    title() { return this.block.title || plainText(this.block.caption) || 'Embedded lesson resource'; }
  }, methods: { mediaStyle }
};
</script>
