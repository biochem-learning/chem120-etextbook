<template>
 <header>
    <nav>
      <div style="display: flex; flex-direction: row;">
        <div id="mySidemenu" class="sidemenu" @touchstart="touchStartMethod">
          <div class="sm-wrapper">
            <div class="sections">
              <div class="dropdown">
                <div class="section-title" @click="openSubMenu('dropdown-content1')">Section 1</div>
                <div class="dropdown-content" id="dropdown-content1">
                  <ul style="list-style-type: none; padding: 0;">
                    <li :class="{ 'unit-active': selectedUnit === 'unit1' }" @click="selectUnit('unit1')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit1' ? 'page' : null">{{ unitNavLabel('unit1', 1) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit2' }" @click="selectUnit('unit2')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit2' ? 'page' : null">{{ unitNavLabel('unit2', 2) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit3' }" @click="selectUnit('unit3')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit3' ? 'page' : null">{{ unitNavLabel('unit3', 3) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit4' }" @click="selectUnit('unit4')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit4' ? 'page' : null">{{ unitNavLabel('unit4', 4) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit5' }" @click="selectUnit('unit5')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit5' ? 'page' : null">{{ unitNavLabel('unit5', 5) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit6' }" @click="selectUnit('unit6')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit6' ? 'page' : null">{{ unitNavLabel('unit6', 6) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit7' }" @click="selectUnit('unit7')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit7' ? 'page' : null">{{ unitNavLabel('unit7', 7) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit8' }" @click="selectUnit('unit8')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit8' ? 'page' : null">{{ unitNavLabel('unit8', 8) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit9' }" @click="selectUnit('unit9')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit9' ? 'page' : null">{{ unitNavLabel('unit9', 9) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit10' }" @click="selectUnit('unit10')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit10' ? 'page' : null">{{ unitNavLabel('unit10', 10) }}</router-link></li>
                  </ul>
                </div>
              </div>
              <div class="dropdown">
                <div class="section-title" href="#" @click="openSubMenu('dropdown-content3')">Section 2</div>
                <div class="dropdown-content" id="dropdown-content3">
                  <ul style="list-style-type: none; padding: 0;">
                    <li :class="{ 'unit-active': selectedUnit === 'unit11' }" @click="selectUnit('unit11')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit11' ? 'page' : null">{{ unitNavLabel('unit11', 11) }}</router-link></li>
                    <li :class="{ 'unit-active': selectedUnit === 'unit12' }" @click="selectUnit('unit12')"><router-link to="/unit4" :aria-current-value="selectedUnit === 'unit12' ? 'page' : null">{{ unitNavLabel('unit12', 12) }}</router-link></li>
                    <li><router-link to="/">Unit 13. </router-link></li>
                    <li><router-link to="/">Unit 14.</router-link></li>
                    <li><router-link to="/">Unit 15.</router-link></li>
                    <li><router-link to="/">Unit 16.</router-link></li>
                    <li><router-link to="/">Unit 17.</router-link></li>
                    <li><router-link to="/">Unit 18.</router-link></li>
                    <li><router-link to="/">Unit 19.</router-link></li>
                    <li><router-link to="/">Unit 20.</router-link></li>
                  </ul>
                </div>
              </div>
              <div class="dropdown">
                <div class="section-title" href="#" @click="openSubMenu('dropdown-content2')">Section 3</div>
                <div class="dropdown-content" id="dropdown-content2">
                  <ul style="list-style-type: none; padding: 0;">
                    <li><router-link to="/">Unit 21.</router-link></li>
                    <li><router-link to="/">Unit 22. </router-link></li>
                    <li><router-link to="/">Unit 23. </router-link></li>
                    <li><router-link to="/">Unit 24.</router-link></li>
                    <li><router-link to="/">Unit 25.</router-link></li>
                    <li><router-link to="/">Unit 26.</router-link></li>
                    <li><router-link to="/">Unit 27.</router-link></li>
                    <li><router-link to="/">Unit 28.</router-link></li>
                    <li><router-link to="/">Unit 29.</router-link></li>
                    <li><router-link to="/">Unit 30.</router-link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="section-title" id="credit"><router-link to="/credit">Credit</router-link></div>
          </div>
          <div class="note-taking"></div>
          <a href="javascript:void(0)" class="close" @click="closeSM">X</a>
        </div>
        <div id="pg-content">
          <div class="open" @click="openSM">&#9776;</div>
        </div>
        <router-link class="web-title" to="/" style="text-decoration: none;">ORGANIC CHEMISTRY E-TEXTBOOK</router-link>
      </div>
      <a class="department-link" href="https://www.depauw.edu/academics/chemistry-and-biochemistry/" target="_blank">
        <img class="department-logo" src="./assets/site/depauw-logo-cropped.png" alt="DePauw University Chemistry and Biochemistry" >
      </a>
    </nav>
  </header>

  <div @click="clickOut">
    <router-view :btn-text="selectedUnit" :key="selectedUnit"/> 
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { units } from '@/content/registry.js';

export default{
  data() {
    return {
      selectedUnit: 'unit1',
      units
    };
  },

  created() {
    const savedUnit = localStorage.getItem('selectedUnit');
    if (savedUnit && /^unit(?:[1-9]|1[0-2])$/.test(savedUnit)) {
      this.selectedUnit = savedUnit;
    }
  },

  components:{
    RouterLink,
    RouterView
  },

  methods: {
    unitNavLabel(unit, number) {
      return this.units[unit]?.title || `Unit ${number}`;
    },

    selectUnit(unit) {
      this.selectedUnit = unit;
      localStorage.setItem('selectedUnit', unit)
    },

    ///Open + close sidemenu
    openSM(){
      const sideMenu = document.getElementById("mySidemenu");
      if (parseInt(sideMenu.style.width, 10) > 0) {
        this.closeSM()
      }
      else {
        const maximumWidth = window.innerWidth <= 600 ? 350 : 450;
        const width = Math.min(window.innerWidth, maximumWidth);
        sideMenu.style.width = width + "px";
        if (window.innerWidth > 1020) {
          document.getElementById("pg-content").style.marginLeft = "450px";
        };
      }
    },

    ///Close sidemenu upon clicking outside
    clickOut(){
      if (parseInt(document.getElementById("mySidemenu").style.width) == (450) || (350)) {
        this.closeSM();
      }
    },
    
    ///Close sidemenu
    closeSM(){
      document.getElementById("mySidemenu").style.width = "0";
      document.getElementById("pg-content").style.marginLeft ="0";
    },

    ///Open dropdown submenu when clicking on title
    openSubMenu(id){
      const el = document.getElementById(id);
      let displayStatus = window.getComputedStyle(el).display == "block" ? "none" : "block";
      el.style.display = displayStatus;
    },

    ///For swipe to close sidebar
    touchStartMethod (touchEvent) {
      const posXStart = touchEvent.changedTouches[0].clientX;
      const posYStart = touchEvent.changedTouches[0].clientY;
      addEventListener('touchend', (touchEvent) => this.touchEndMethod(touchEvent, posXStart, posYStart), {once: true});
    },

    touchEndMethod (touchEvent, posXStart, posYStart) {
      const posXEnd = touchEvent.changedTouches[0].clientX;
      const posYEnd = touchEvent.changedTouches[0].clientY;
      if ((Math.abs(posYEnd - posYStart) <= 50) && (Math.abs(posXEnd - posXStart) >= 100)) {
        if (posXStart > posXEnd) {
            this.closeSM(); // close sidemenu
        }
      }
    },
  }
}
</script>

<style>
#app {
  font-family: "League Spartan", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(72, 72, 72);
  overflow: hidden;
  max-width: 100%;
}

header{
  background-color: rgb(255, 255, 130);
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42afb9;
}

.web-title {
  min-width: fit-content !important;
  display: flex;
  align-items: center;
  margin-left: 3%;
  font-size: 200% !important;
}

@media screen and (min-width: 2300px) {
  .web-title {
    font-size: 300% !important;
  }
}
@media screen and (max-width: 600px), 
(orientation: portrait) {
  .web-title {
    min-height: 200% !important;
  }
}
@media screen and (max-width: 600px) {
  .web-title {
    font-size: 130% !important;
  }
}

@media screen and (max-width: 365px) {
  .web-title {
    font-size: 120% !important;
  }
}


/***MEDIA***/
.overlay{
  position:fixed;
  background-color: rgba(67, 67, 67, 0.6);
  width:100%;
  height:100%;
  color:white;
  cursor: pointer;
  display:none;
}

/***SIDEMENU***/
#pg-content{
  display: flex;
  align-items: center;
  transition: margin-left 0.5s;
  padding: 5px;
}

.open {
  margin: 0%;
  font-size:2vw;
  cursor:pointer;
  color:#5b5b5b
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 3vw !important;
}

.sm-wrapper{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
 
.sidemenu{
  display: flex;
  text-wrap:nowrap;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(72, 72, 72);
  transition: 0.5s;
  padding-top: 10px;
  -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
  scrollbar-width: none;  /* Hide scrollbar for Firefox */
}

/* Hide scrollbar for IE, Edge and Firefox */
.sidemenu::-webkit-scrollbar {
  display: none;
}

.sidemenu a {
  margin:15px 20px;
  text-decoration: none;
  font-size: 15px;
  font-family: "League Spartan", sans-serif;
  color: #ffffff;
  display: block;
  margin-bottom: 20px;
  transition: 0.3s;
  }
 
.sidemenu .close{
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 20px;
  margin-left: 50px;
}

@media screen and (max-width: 600px), 
(orientation: portrait) {
  .open {
    font-size: 100% !important;
  }
  nav {
    height: 59px !important;
  }
}
@media screen and (max-width: 365px) {
  .open {
    font-size: 100% !important;
  }
}
 
/* SIDEMENU HOVER EFFECT */
.sm-wrapper {
  display: flex;
  justify-content: space-between;
}

.sm-wrapper a {
  position: relative;
}

.sm-wrapper a:after{
  z-index: 0;
  position: absolute;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  width: 0;
  height: 20px;
  background: #e85e4f;
  content: '';
  pointer-events: none;
  transition: width 0.35s ease-in-out;
}
 
.sm-wrapper a:hover:after{
  width: 3%;
}
 
.sm-wrapper a:hover{
  padding-left: 5px;
  transition: 0.35s ease-in-out;
}

/***DROPDOWN SUBMENU***/
.dropdown-content {
  width: 50px;
  display: none;
  color: white;
  font-family: "League Spartan", sans-serif;
  font-size: 11px;
}

.section-title {
  cursor: pointer;
  display: flex; 
  min-width: 400px; 
  justify-content: center;
  margin:15px 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
  font-family: "League Spartan", sans-serif;
  color: #ffffff;
  display: block;
  margin-bottom: 40px;
  transition: 0.3s;
}

@media screen and (max-width: 600px), 
(orientation: portrait) {
  .section-title {
    min-width: 300px;
  }
}

@media screen and (max-width: 365px) {
  .section-title {
    min-width: 300px;
  }
}

/* Keep the header's vertical rhythm stable at every viewport size. */
header,
nav {
  height: 64px !important;
  min-height: 64px;
  max-height: 64px;
  box-sizing: border-box;
}

nav {
  margin-left: clamp(.75rem, 3vw, 2rem) !important;
}

nav > div {
  display: flex;
  align-items: center;
  min-width: 0;
  height: 100%;
  flex: 1 1 auto;
}

#pg-content {
  height: 100%;
  padding: 0 .35rem;
}

.open {
  font-size: clamp(1rem, 2vw, 1.45rem);
  line-height: 1;
}

.web-title {
  min-width: 0 !important;
  min-height: auto !important;
  margin-left: clamp(.4rem, 2vw, 1.5rem);
  font-size: clamp(1rem, 2vw, 2rem) !important;
  line-height: 1;
  white-space: nowrap;
}

.department-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(9rem, 15vw, 10rem);
  height: 54px;
  padding: .25rem .4rem;
  margin-right: 2vw;
  flex: 0 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid rgba(35, 49, 45, .22);
  border-radius: .25rem;
  background: #fff;
}

.department-logo {
  position: static;
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  image-rendering: auto;
  filter: contrast(1.12) saturate(1.02);
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  nav {
    margin-left: .5rem !important;
    width: calc(100% - .5rem);
    gap: .2rem;
  }

  .web-title {
    margin-left: .35rem;
    font-size: clamp(.82rem, 3.8vw, 1rem) !important;
  }

  .department-link {
    width: 4.5rem;
    margin-right: .5rem;
  }


  .open {
    font-size: 1rem !important;
  }
}

@media screen and (max-width: 400px) {
  .web-title {
    font-size: .76rem !important;
  }

  .department-link {
    width: 4rem;
  }
}

/* Use one typography system across the site and lesson headers. */
header,
header a,
header .open,
.background > .container > .title {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif !important;
}

.web-title {
  font-weight: 750;
  letter-spacing: -.015em;
}

.background > .container > .title {
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -.01em;
}

/* Only the selected textbook unit receives the navigation highlight. */
.sidemenu a.router-link-active,
.sidemenu a.router-link-exact-active {
  color: #fff;
}

.sidemenu li.unit-active > a {
  padding-left: .75rem;
  border-left: 4px solid rgb(255, 255, 130);
  border-radius: 0 .35rem .35rem 0;
  background: transparent;
  box-shadow: none;
  color: rgb(255, 255, 130) !important;
  font-weight: 750;
}

/* On narrow screens, wrap the brand instead of shrinking it into illegibility. */
@media screen and (max-width: 480px) {
  .web-title {
    flex: 1 1 auto;
    max-width: none;
    white-space: normal;
    font-size: .94rem !important;
    line-height: 1.05;
  }

  .department-link {
    width: 3.75rem;
    margin-right: .4rem;
  }
}

@media screen and (max-width: 360px) {
  .web-title {
    margin-left: .2rem;
    font-size: .82rem !important;
  }

  .department-link {
    width: 3.25rem;
    margin-right: .3rem;
  }
}

/* Let complete JSON unit titles wrap inside the side taskbar. */
.sidemenu .sm-wrapper,
.sidemenu .sections,
.sidemenu .dropdown,
.sidemenu .dropdown-content {
  box-sizing: border-box;
  width: 100%;
}

.sidemenu .dropdown-content li > a {
  box-sizing: border-box;
  width: calc(100% - 2.5rem);
  white-space: normal;
  overflow-wrap: anywhere;
  line-height: 1.35;
  text-align: left;
  text-align-last: left;
  word-spacing: normal;
}

/* Lesson styles contain a broad `ul` rule; keep it out of the taskbar. */
.sidemenu ul {
  margin: 0;
  font-size: inherit;
  text-align: left;
  text-align-last: left;
  word-spacing: normal;
}

.sidemenu .section-title {
  box-sizing: border-box;
  width: calc(100% - 2.5rem);
  min-width: 0;
  text-align: center;
}

.sidemenu li.unit-active > a {
  width: calc(100% - 2.5rem);
}

/* Keep labels at their open width while the outer panel clips closed. */
.sidemenu .sm-wrapper {
  width: min(450px, 100vw);
  min-width: min(450px, 100vw);
  flex: 0 0 auto;
}

@media screen and (max-width: 600px) {
  .sidemenu .sm-wrapper {
    width: min(350px, 100vw);
    min-width: min(350px, 100vw);
  }
}

/* Retain the improved taskbar spacing with the original visual treatment. */
.sidemenu .sm-wrapper {
  padding: .5rem .45rem 1.25rem;
}

.sidemenu .section-title {
  position: relative;
  justify-content: flex-start;
  gap: .65rem;
  margin: .6rem 1rem .35rem;
  padding: .7rem .85rem;
  border: 1px solid rgba(255, 237, 147, .18);
  border-radius: .55rem;
  background: rgba(255, 255, 255, .055);
  color: #ffed93;
  font-size: 1.05rem;
  letter-spacing: .075em;
  text-align: left;
  text-transform: uppercase;
}

.sidemenu .section-title::before {
  width: .24rem;
  height: 1.2rem;
  flex: 0 0 .24rem;
  border-radius: 999px;
  background: #ffed93;
  box-shadow: 0 0 .7rem rgba(255, 237, 147, .38);
  content: "";
}

.sidemenu .dropdown-content {
  padding: .15rem .55rem .65rem;
}

.sidemenu .dropdown-content li {
  margin: .2rem 0;
  list-style: none;
}

.sidemenu .dropdown-content li > a {
  margin: 0;
  padding: .72rem .85rem;
}

.sidemenu .dropdown-content li > a:hover,
.sidemenu .dropdown-content li > a:focus-visible {
  padding-left: .85rem;
}
</style>
