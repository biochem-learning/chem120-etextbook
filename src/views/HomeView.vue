<template><div class="reader home">
  <p class="eyebrow">DePauw University · CHEM 120</p><h1>Organic Chemistry E-Text</h1>
  <p class="lead">Welcome to the CHEM 120 Organic Chemistry Electronic Textbook.</p>
  <p>You may have encountered electronic textbooks before. In most cases you probably found that they were basically paper textbooks that had been digitized and presented electronically. Unlike those electronic textbooks, this one attempts to take full advantage of the digital medium by incorporating not only images, but video, games, 3D interactive objects and more.</p>
  <section aria-labelledby="units-heading"><h2 id="units-heading">Explore the textbook</h2>
    <ol class="unit-cards"><li v-for="item in publishedUnits" :key="item.id"><RouterLink :to="'/units/' + item.id">{{ item.title }}</RouterLink></li></ol>
  </section>
  <section aria-labelledby="goal-heading"><h2 id="goal-heading">Purpose of the e-textbook</h2>
    <p>Why do this? Well, you will see as we progress through the semester that organic chemistry is a very visual subject. After all, organic compounds, which are the focus of our study this semester, are three dimensional objects. Understanding their composition, their properties, and their chemistry will require us to understand their 3D shapes.</p>
    <EmbedBlock :block="{ src: 'https://pubchem.ncbi.nlm.nih.gov/compound/epinephrine#section=3D-Conformer&fullscreen=true', title: '3D representation of epinephrine (adrenaline)', caption: 'Epinephrine, also known as adrenaline, in three dimensions.' }" />
    <p>However, we often need to represent organic compounds on 2D surfaces - a piece of paper, a computer screen, or a whiteboard. One of our challenges will be to learn how to represent these molecules in 2D while having a 3D understanding of them. This e-textbook attempts to bridge the gap between 2D pictures and 3D understanding.</p>
    <figure><ZoomableImage :src="homeModel" alt="Two-dimensional representations of epinephrine (adrenaline)" /><figcaption>Two-dimensional representations of epinephrine.</figcaption></figure>
  </section>
  <section aria-labelledby="contact-heading"><h2 id="contact-heading">Get in touch</h2>
    <address>Dr. Jeffrey A. Hansen<br>Julian Science and Math Center, Room 360<br>Greencastle, IN 46135<br>
      <a href="tel:+17657192376">(765) 719-2376</a><br><a href="mailto:jhansen@depauw.edu">jhansen@depauw.edu</a>
    </address>
  </section>
</div></template>
<script>
import { publishedUnits } from '../content/registry';
import EmbedBlock from '../components/content/EmbedBlock.vue';
import ZoomableImage from '../components/content/ZoomableImage.vue';
import homeModel from '../assets/homemodel.jpg';
export default { components: { EmbedBlock, ZoomableImage }, data: () => ({ publishedUnits, homeModel }), mounted() { document.title = 'Organic Chemistry E-Text · CHEM 120'; } };
</script>
