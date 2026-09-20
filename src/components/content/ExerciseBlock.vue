<template>
  <div class="exercise">
    <label :for="id"><RichText :content="block.label || block.prompt || 'Your response'" /></label>
    <textarea :id="id" v-model="answer" rows="5" :aria-describedby="id + '-help'"></textarea>
    <p :id="id + '-help'" class="muted">Practice response. Copy your answer before leaving this lesson; it is not submitted or saved.</p>
  </div>
</template>
<script>
import RichText from './RichText.vue';
export default {
  components: { RichText }, props: { block: Object, id: String }, data: () => ({ answer: '' })
};
</script>
