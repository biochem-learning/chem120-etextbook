<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header"><div class="header-inner">
    <RouterLink class="brand" to="/">ORGANIC CHEMISTY E-TEXTBOOK <small>CHEM 120: Structure and Properties of Organic Molecules · DePauw University</small></RouterLink>
    <details ref="menu" class="unit-menu"><summary>Contents</summary>
      <nav aria-label="Textbook contents">
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink v-for="item in publishedUnits" :key="item.id" :to="'/units/' + item.id" @click="closeMenu">{{ item.title }}</RouterLink>
        <RouterLink to="/credit" @click="closeMenu">Credits</RouterLink>
      </nav>
    </details>
    <a class="department-logo" href="https://www.depauw.edu/academics/chemistry-and-biochemistry/" aria-label="DePauw Chemistry and Biochemistry Department">
      <img src="./assets/depauw-logo.png" alt="DePauw Chemistry and Biochemistry Department">
    </a>
  </div></header>
  <main id="main-content" ref="main" tabindex="-1"><RouterView /></main>
  <footer class="site-footer"><p>CHEM 120 · DePauw University</p>
    <a href="https://www.depauw.edu/academics/chemistry-and-biochemistry/">Chemistry and Biochemistry</a>
    <RouterLink to="/credit">Credits</RouterLink>
  </footer>
</template>
<script>
import { publishedUnits } from './content/registry';
export default {
  data: () => ({ publishedUnits }),
  watch: { '$route.fullPath': { async handler() {
    this.closeMenu(); await this.$nextTick();
    this.$refs.main?.focus({ preventScroll: true });
  } } },
  methods: { closeMenu() { if (this.$refs.menu) this.$refs.menu.open = false; } }
};
</script>
