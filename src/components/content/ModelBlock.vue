<template>
  <figure class="model-block">
    <figcaption>{{ block.title || 'Interactive molecular model' }}</figcaption>
    <p v-if="block.description"><RichText :content="block.description" /></p>
    <p v-else class="muted">A molecular structure viewer. A detailed text description has not yet been supplied for this model.</p>
    <button v-if="!started" type="button" @click="load">Load molecular model</button>
    <p v-if="message" role="status">{{ message }}</p>
    <canvas v-show="started && !failed" :id="id" ref="canvas" role="img"
      :aria-label="block.title || 'Molecular structure'" :aria-describedby="id + '-controls'"></canvas>
    <div :id="id + '-controls'" class="model-controls">
      <template v-if="ready">
        <button type="button" @click="rotate('left')">Rotate left</button>
        <button type="button" @click="rotate('right')">Rotate right</button>
        <button type="button" @click="rotate('up')">Rotate up</button>
        <button type="button" @click="rotate('down')">Rotate down</button>
        <button type="button" @click="zoom(true)">Zoom in</button>
        <button type="button" @click="zoom(false)">Zoom out</button>
        <button type="button" @click="reset">Reset view</button>
      </template>
    </div>
    <p v-if="url"><a :href="url" download>Download molecule file</a></p>
  </figure>
</template>
<script>
import { markRaw } from 'vue';
import RichText from './RichText.vue';
import { assetUrl } from '../../content/format';
export default {
  components: { RichText }, props: { block: Object, id: String },
  data: () => ({ started: false, ready: false, failed: false, message: '', viewer: null, controller: null, disposed: false }),
  computed: { url() { return assetUrl(this.block.src); } },
  beforeUnmount() {
    this.disposed = true;
    this.controller?.abort();
    this.viewer?.stopAnimation?.();
    const cd = window.ChemDoodle;
    if (cd?.monitor?.CANVAS_DRAGGING === this.viewer) cd.monitor.CANVAS_DRAGGING = undefined;
    if (cd?.monitor?.CANVAS_OVER === this.viewer) cd.monitor.CANVAS_OVER = undefined;
    this.viewer?.gl?.getExtension('WEBGL_lose_context')?.loseContext();
    this.viewer = null;
  },
  methods: {
    async load() {
      this.started = true; this.message = 'Loading molecular model…';
      this.controller = markRaw(new AbortController());
      try {
        const cd = window.ChemDoodle;
        if (!cd?.TransformCanvas3D) throw new Error('The molecular viewer is unavailable.');
        if (!this.url) throw new Error('No molecule file has been supplied.');
        const response = await fetch(this.url, { signal: this.controller.signal });
        if (!response.ok) throw new Error('The molecule file could not be loaded.');
        const text = await response.text();
        if (this.disposed) return;
        await this.$nextTick();
        if (this.disposed) return;
        const viewer = markRaw(new cd.TransformCanvas3D(this.id, 400, 320));
        this.viewer = viewer;
        if (!viewer.gl) throw new Error('This browser cannot display the 3D model. You can download its molecule file instead.');
        viewer.styles.backgroundColor = this.block.background_color || '#ffffff';
        viewer.styles.atoms_useJMOLColors = true;
        viewer.styles.bonds_color = '#666666';
        viewer.styles.set3DRepresentation('Ball and Stick');
        const molecule = cd.readMOL(text, 1);
        if (!molecule?.atoms?.length) throw new Error('The molecule file contains no readable atoms.');
        viewer.loadMolecule(molecule);
        viewer.repaint();
        this.ready = true; this.message = '';
      } catch (error) {
        if (this.disposed || error.name === 'AbortError') return;
        this.failed = true; this.message = error.message;
      }
    },
    rotate(direction) {
      const mat = window.ChemDoodle.lib.mat4;
      const angle = (direction === 'left' || direction === 'up' ? -1 : 1) * Math.PI / 12;
      const transform = mat.rotate(mat.identity([]), angle, direction === 'left' || direction === 'right' ? [0, 1, 0] : [1, 0, 0]);
      this.viewer.rotationMatrix = mat.multiply(transform, this.viewer.rotationMatrix);
      this.viewer.repaint();
    },
    zoom(inside) { this.viewer.camera[inside ? 'zoomIn' : 'zoomOut'](); this.viewer.updateScene(); },
    reset() { this.viewer.rotationMatrix = window.ChemDoodle.lib.mat4.identity([]); this.viewer.camera.zoom = 1; this.viewer.updateScene(); }
  }
};
</script>
