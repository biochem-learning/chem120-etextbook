<template>
  <figure class="media-block">
    <ZoomableImage v-if="block.type === 'image'" :src="url" :alt="block.decorative ? '' : block.alt || ''"
      :image-style="mediaStyle(block)" @error="failed = true" @load="failed = false" />
    <video v-else :src="url" :aria-label="block.title || 'Lesson video'" :style="mediaStyle(block)"
      controls preload="metadata" @error="failed = true">
      <track v-for="(track, i) in block.tracks || []" :key="i" :src="assetUrl(track.src)"
        :kind="track.kind || 'captions'" :srclang="track.lang || 'en'" :label="track.label || 'English'" :default="i === 0">
    </video>
    <figcaption v-if="block.caption"><RichText :content="block.caption" /></figcaption>
    <p v-if="failed" role="status">This media could not be loaded.</p>
    <p v-if="url" class="media-actions"><a :href="url" target="_blank" rel="noopener noreferrer">Open {{ block.type }} in a new tab</a></p>
    <details v-if="block.description"><summary>Image description</summary><p><RichText :content="block.description" /></p></details>
    <details v-if="block.transcript"><summary>Transcript</summary><p class="transcript"><RichText :content="block.transcript" /></p></details>
  </figure>
</template>
<script>
import RichText from './RichText.vue';
import ZoomableImage from './ZoomableImage.vue';
import { assetUrl, mediaStyle } from '../../content/format';
export default {
  components: { RichText, ZoomableImage }, props: { block: { type: Object, required: true } },
  data: () => ({ failed: false }),
  computed: { url() { return assetUrl(this.block.src); } },
  methods: { assetUrl, mediaStyle }
};
</script>
