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
                    <li><router-link to="/unit1">Unit 1. Bonding, Introduction to Structural Representations</router-link></li>
                    <li><router-link to="/unit2">Unit 2. More Structural Representations and Isomers</router-link></li>
                    <li @click="selectUnit('unit3')"><router-link to="/unit4">Unit 3. </router-link></li>
                    <li @click="selectUnit('unit4')"><router-link to="/unit4">Unit 4. </router-link></li>
                    <li @click="selectUnit('unit5')"><router-link to="/unit4">Unit 5. </router-link></li>
                    <li @click="selectUnit('unit6')"><router-link to="/unit4">Unit 6. </router-link></li>
                    <li @click="selectUnit('unit7')"><router-link to="/unit4">Unit 7. </router-link></li>
                    <li @click="selectUnit('unit8')"><router-link to="/unit4">Unit 8. </router-link></li>
                    <li @click="selectUnit('unit9')"><router-link to="/unit4">Unit 9. </router-link></li>
                    <li @click="selectUnit('unit10')"><router-link to="/unit4">Unit 10. </router-link></li>
                  </ul>
                </div>
              </div>
              <div class="dropdown">
                <div class="section-title" href="#" @click="openSubMenu('dropdown-content3')">Section 2</div>
                <div class="dropdown-content" id="dropdown-content3">
                  <ul style="list-style-type: none; padding: 0;">
                    <li @click="selectUnit('unit11')"><router-link to="/unit4">Unit 11. </router-link></li>
                    <li @click="selectUnit('unit12')"><router-link to="/unit4">Unit 12. </router-link></li>
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
        <router-link class="web-title" to="/" style="text-decoration: none; font-family: 'League Spartan', sans-serif;">ORGANIC CHEMISTRY E-TEXT</router-link>
      </div>
      <a href="https://www.depauw.edu/academics/chemistry-and-biochemistry/" target="_blank" style="width: 10%; margin-right: 2vw;">
        <img src="./assets/depauw-logo.png" style="width: 100%; cursor: pointer;" >
      </a>
    </nav>
  </header>

  <div @click="clickOut">
    <router-view :btn-text="selectedUnit" :key="selectedUnit"/> 
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default{
  data() {
    return {
      selectedUnit: ' ' // Initially, no unit is selected
    };
  },

  created() {
    const savedUnit = localStorage.getItem('selectedUnit');
    if (savedUnit) {
      this.selectedUnit = savedUnit; // Restore the saved unit
    }
  },


  components:{
    RouterLink,
    RouterView
  },

  methods: {
    selectUnit(unit) {
      this.selectedUnit = unit;
      localStorage.setItem('selectedUnit', unit)
    },

    ///Open + close sidemenu
    openSM(){
      if (parseInt(document.getElementById("mySidemenu").style.width) == 450) {
        this.closeSM()
      }
      else {
        let width = window.innerWidth <= 600 ? 350 : 450;
        document.getElementById("mySidemenu").style.width = width + "px";
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

.sm-wrapper a:after{
  z-index: -1;
  position: absolute;
  left: 0%;
  width: 0;
  height: 20px;
  background: #e85e4f;
  content: '';
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
</style>
