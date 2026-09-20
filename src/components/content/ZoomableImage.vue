<template>
  <button ref="trigger" type="button" class="zoomable-image-trigger" :style="imageStyle"
    :aria-label="alt ? 'Enlarge image: ' + alt : 'Enlarge image'" @click="open">
    <img :src="src" :alt="alt" loading="eager" @load="$emit('load')" @error="$emit('error')">
  </button>
  <Teleport to="body">
    <dialog v-if="opened" ref="dialog" class="image-lightbox"
      :aria-label="alt ? 'Enlarged image: ' + alt : 'Enlarged image'"
      @cancel.prevent="close" @click="onBackdropClick">
      <div class="image-lightbox-content">
        <div class="image-lightbox-toolbar">
          <span class="image-lightbox-hint">Ctrl + scroll to zoom</span>
          <button type="button" aria-label="Zoom out" @click="zoomBy(1 / 1.25)">−</button>
          <output aria-live="polite" aria-label="Zoom level">{{ Math.round(zoom * 100) }}%</output>
          <button type="button" aria-label="Zoom in" @click="zoomBy(1.25)">+</button>
          <button type="button" @click="resetZoom">Reset zoom</button>
          <button type="button" class="image-lightbox-close" aria-label="Close enlarged image" @click="close">×</button>
        </div>
        <div ref="viewport" class="image-lightbox-viewport" @click.self="close" @wheel="onWheel">
          <img :src="src" :alt="alt" :style="{ width: baseWidth * zoom + 'px' }" @load="fitImage">
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script>
import { nextTick } from 'vue';

export default {
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    imageStyle: { type: Object, default: () => ({ width: '100%' }) }
  },
  emits: ['load', 'error'],
  data: () => ({ opened: false, zoom: 1, baseWidth: 0, previousOverflow: '' }),
  beforeUnmount() {
    if (this.opened) {
      this.$refs.dialog?.close();
      document.body.style.overflow = this.previousOverflow;
    }
  },
  methods: {
    async open() {
      if (this.opened) return;
      this.opened = true;
      this.zoom = 1;
      this.previousOverflow = document.body.style.overflow;
      await nextTick();
      this.$refs.dialog.showModal();
      document.body.style.overflow = 'hidden';
      this.$refs.dialog.querySelector('.image-lightbox-close')?.focus();
      this.fitImage();
    },
    close() {
      if (!this.opened) return;
      this.$refs.dialog?.close();
      document.body.style.overflow = this.previousOverflow;
      this.opened = false;
      nextTick(() => this.$refs.trigger?.focus());
    },
    fitImage() {
      const viewport = this.$refs.viewport;
      const image = viewport?.querySelector('img');
      if (!image?.naturalWidth || !viewport) return;
      const availableWidth = Math.max(1, viewport.clientWidth - 32);
      const availableHeight = Math.max(1, viewport.clientHeight - 32);
      this.baseWidth = image.naturalWidth * Math.min(availableWidth / image.naturalWidth, availableHeight / image.naturalHeight);
    },
    zoomBy(factor) {
      this.zoom = Math.min(5, Math.max(0.5, Math.round(this.zoom * factor * 100) / 100));
    },
    resetZoom() { this.zoom = 1; },
    onWheel(event) {
      if (!event.ctrlKey) return;
      event.preventDefault();
      this.zoomBy(event.deltaY < 0 ? 1.25 : 1 / 1.25);
    },
    onBackdropClick(event) {
      if (event.target !== this.$refs.dialog) return;
      const bounds = this.$refs.dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) this.close();
    }
  }
};
</script>
