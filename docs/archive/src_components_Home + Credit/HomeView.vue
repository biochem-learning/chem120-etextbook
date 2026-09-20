<style scoped src="@/components/Home + Credit/style.css"></style>
<script src='@/components/Home + Credit/main.js'></script>
<template>
  <div id="overlay" class="overlay" @click="clickOut('overlay'); clickOut('media')"></div>
  <img id="media" class="media" src="@/assets/homemodel.jpg"> 
  <div class="body">
    <!-- Page Wrapper -->
    <div id="page-wrapper">
    <!-- Banner -->
      <section id="banner">
        <div class="inner">
          <h2>Organic Chemistry E-Text</h2>
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
            <div class="inner" id="inner2">
              <div class="image" id="image1">
                <iframe scrolling="no" src="https://pubchem.ncbi.nlm.nih.gov/compound/epinephrine#section=3D-Conformer&fullscreen=true" alt="3D Model of Epinephrine"/>
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
            <div class="inner">
              <a class="image" id="image2" style="cursor: pointer;" @click="playVideo('overlay'); playVideo('media')">
                <img src="@/assets/homemodel.jpg" alt="" />
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
          <form method="post" action="#">
            <div class="fields">
              <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" />
              </div>
              <div class="field">
                <label for="topic">Topic</label>
                <input type="topic" name="topic" id="topic" />
              </div>
              <div class="field">
                <label for="message">Message</label>
                <textarea name="message" id="message" rows="4"></textarea>
              </div>
              
            </div>
            <ul class="actions">
              <li><input type="submit" value="Send Message" /></li>
            </ul>
          </form>
          <ul class="contact">
            <li class="icon solid fa-home" style="display: flex !important; align-items: start !important; justify-content: flex-start !important;">
              Julian Science and Math Center, Room 360, <br>
              Greencastle, IN 46135  
            </li>
            <li class="icon solid fa-phone">(765)-719-2376</li>
            <li class="icon solid fa-envelope"><a href="#">jhansen@depauw.edu</a></li>
          </ul>
          <ul class="copyright">
            <li>Copyright &copy;  2024 Dr. Jeffrey A. Hansen -  All Rights Reserved.</li><li>Template: <a href="http://html5up.net">HTML5 UP</a></li>
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
