<style scoped src="@/views/home-credit/homeCredit.css"></style>
<style scoped src="@/views/home-credit/homeTextbook.css"></style>
<script src='@/views/home-credit/homeBehavior.js'></script>
<template>
  <div id="overlay" class="overlay" @click="clickOut('overlay'); clickOut('media')"></div>
  <img id="media" class="media" src="@/assets/site/homemodel.jpg">
  <div class="body">
    <!-- Page Wrapper -->
    <div id="page-wrapper">
    <!-- Banner -->
      <section id="banner">
        <div class="inner textbook-cover">
          <h2>Organic Chemistry E-Textbook</h2>
          <p class="intro" id="text1" style="text-align: justify; text-align-last: center;">
            Welcome to the Chem 120 Organic Chemistry Electronic Textbook. 
            You may have encountered electronic textbooks before. 
            In most cases you probably found that they were basically 
            paper textbooks that had been digitized and presented electronically. 
            Unlike those electronic textbooks, this one attempts to take full advantage 
            of the digital medium by incorporating not only images, but video, games, 
            3D interactive objects and more.
          </p>
        </div>
      </section>

    <!-- Wrapper -->
      <section id="wrapper">
        <!-- One -->
          <section id="one" class="wrapper spotlight style1">
            <div class="inner textbook-spread" id="inner2">
              <div class="image" id="image1">
                <div class="epinephrine-model">
                  <canvas
                    id="epinephrine-3d-canvas"
                    ref="epinephrineCanvas"
                    role="img"
                    aria-label="Interactive 3D ball-and-stick model of epinephrine"
                  ></canvas>
                </div>
                <p class="main-content" id="description1" style=" text-align: justify; text-align-last: center">
                <em>This is a 3D representation of the molecule epinephrine, also known as adrenaline.</em>
                </p>
              </div>
              <div class="content">
                <h2 class="major main-content" id="main-content1">Goal for the course</h2>
                <p class="main-content" id="main-content2" style="text-align: justify; text-align-last: end;">
                  Why do this? Well, you will see as we progress through the semester that organic
                  chemistry is a very visual subject. After all, organic compounds, which are the focus of 
                  our study this semester, are three dimensional objects. 
                  Understanding their composition, their properties, and their chemistry will 
                  require us to understand their 3D shapes. 
                </p>
              </div>
            </div>
          </section>

        <!-- Two -->
          <section id="two" class="wrapper alt spotlight style2">
            <div class="inner textbook-spread">
              <a class="image" id="image2" style="cursor: pointer;" @click="playVideo('overlay'); playVideo('media')">
                <img src="@/assets/site/homemodel.jpg" alt="Two-dimensional representations of the epinephrine molecule" />
                <p class="main-content" id="description2" style=" text-align: justify; text-align-last: center;">
                  <em>These are a variety of 2D representations of the molecule epinephrine, also known as adrenaline.</em>
                </p>
              </a>
              <div class="content" id="content2">
                <p class="main-content" id="main-content3"  style="text-align: justify;">
                  However, we often need to represent organic 
                  compounds on 2D surfaces - a piece of paper, a computer screen, or a whiteboard. 
                  One of our challenges will be to learn how to represent these molecules in 2D while having a 
                  3D understanding of them. This e-textbook attempts to bridge the gap between 2D pictures and 
                  3D understanding.
                </p>
              </div>
            </div>
          </section>
      </section>

    <!-- Footer -->
      <section id="footer">
        <div class="inner">
          <h2 class="major">Get in touch</h2>
          <p>If you have any questions, please feel free to contact: </p>
          <address class="contact">
            <span>Professor Jeffrey Hansen</span>
            <a href="mailto:jhansen@depauw.edu">jhansen@depauw.edu</a>
            <a href="tel:+17657192376">(765)-719-2376</a>
            <span>Julian Science and Math Center, Room 360,<br>
              Greencastle, IN 46135</span>
          </address>
          <ul class="copyright">
            <li>Copyright &copy;  2024 Dr. Jeffrey A. Hansen -  All Rights Reserved.</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
</style>
