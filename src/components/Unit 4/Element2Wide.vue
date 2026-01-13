<template>
    <div class="background">
        <div class="container" id="container" @keyup="created">
            <div class="nav-buttons">
                <button @click="previous" class="control">
                    <
                </button>
                <button @click="next" class="control">
                    >
                </button>
            </div>
            
            <div id="overlay" class="overlay" @click="clickOut('overlay'); clickOut('media')">
                <!--
                    Overlay class rests upon the slide class. It contains video/3d model data and it expands when a user
                    selects the thumbnail picture.
                -->
            </div>
            <!-- <video id="media1" class="media" width="80%" controls>
                <source src="@/assets/Unit1-twoPeopleSharingSoda.mp4" type="video/mp4" showControl>
            </video>

            <img id="media2" class="media" width="80%" src=""> 

            <img id="media3" class="media" width="40%" src="">

            <img id="media4" class="media" width="40%" src="">

            <img id="media5" class="media" width="80%" src="">

            <img id="media6" class="media" width="80%" src="">

            <img id="media7" class="media" width="80%" src="">

            <img id="media8" class="media" width="80%" src="">

            <img id="media9" class="media" width="80%" src="">

        -->

            <p class="title">
                {{title}} 
            </p>
            
            
            <div id="slide" v-if="!gridEnabled" @touchstart="touchStartMethod" @mousedown="mouseDownMethod" @keyup.left="next()">
                <!--
                <div class="page" id="1">
                    <p>
                        <strong>{{ introduction }}</strong>
                        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
                    </p>
                    <p style="margin-top: 27px;" >
                        <div v-for="(section, index) in sections" :key="index">
                            
                            <p v-if="section.type === 'text'">{{ section.content }}</p>
                            
                            <img v-if="section.type === 'image'" :src="require('/public/content/Unit 4/test.jpg')" :alt="section.alt" />
                            
                            <video v-if="section.type === 'video'" :src="require('/public/content/Unit 4/cat.mp4')" controls>
                                {{ section.title }}
                            </video>

                            
                        </div>
                    </p>
                    <p>
                        
                    </p>
                    <p>
                        
                    </p>
                    <p>
                        
                    </p>
                </div>
                -->
            </div> 

            <div class="progress-container">
                <div class="progress-bar" id="myBar"></div>
            </div> 
        </div>
    </div>
</template>

<script>
    /// !!! PROBLEMS: 
    // - Problem with ScrollIntoView functionality
    // - Progress bar doesn't update when resize
    // - Images need to be set as percentage to the overall page

    /// *** FUNCTIONALITIES:
    // - Add choice of percentage height and width to JSON
    // - Add enlargement upon clicking to photos and images
    // - Add excercises, podcast and games as a type of media

    import unit1 from '/public/content/Unit 1/unit1.json';
    import unit2 from '/public/content/Unit 2/unit2.json';
    import unit3 from '/public/content/Unit 3/unit3.json';
    import unit4 from '/public/content/Unit 4/unit4.json';
    import unit5 from '/public/content/Unit 5/unit5.json';
    import unit6 from '/public/content/Unit 6/unit6.json';
    import unit7 from '/public/content/Unit 7/unit7.json';
    import unit8 from '/public/content/Unit 8/unit8.json';
    import unit9 from '/public/content/Unit 9/unit9.json';
    import unit10 from '/public/content/Unit 10/unit10.json';
    import unit11 from '/public/content/Unit 11/unit11.json';
    import unit12 from '/public/content/Unit 12/unit12.json';

    export default {
        props: ["btnText"],
        data() {
            return {
                units: {
                    unit1,
                    unit2,
                    unit3,
                    unit4, 
                    unit5,
                    unit6,
                    unit7,
                    unit8,
                    unit9,
                    unit10,
                    unit11,
                    unit12
                },
                selectedUnit: this.btnText,

                count: 0, ///Keep track of pages
                lastClick: 0,
                delay: 690,

            };
        },
        computed: {
            title() {
                return this.units[this.selectedUnit]?.title || 'Default Title';
            },
            items() {
                return this.units[this.selectedUnit]?.items || [];
            },
            sections() {
                return this.units[this.selectedUnit]?.sections|| "Default Content";
            },
        },

        mounted() {
            // const script = document.createElement("script");
            // script.src ='public/libraries/chemdoodle/ChemDoodleWeb.js';
            // document.body.appendChild(script);
            
            let pageDiv = document.createElement("div");
            pageDiv.setAttribute("id", "1");
            pageDiv.setAttribute("class", "page");
            document.getElementById("slide").appendChild(pageDiv);

            let pageEl = document.getElementById("1")
            
            //Read data from JSON files and display them onto the website based on key/"type"
            for (const key in this.units[this.selectedUnit]) {
                // console.log(`${key}:`);
                
                const value = this.units[this.selectedUnit][key];
                    
                // console.log(`Next page id will be ${parseInt(pageEl.id, 10) + 1}`)
                
                pageEl = this.handleOverflow.call(this, pageEl)
                
                if (Array.isArray(value)) {

                    // Loop through array values
                    for (let i = 0; i < value.length; i++) {

                        pageEl = this.handleOverflow.call(this, pageEl)

                        if (typeof value[i] === "object" && value !== null) {
                        // Loop through object values
                            if (typeof value[i] === "object" && value[i] !== null) {

                                for (const innerKey in value[i]) {

                                    // Only react to the "type" field
                                    if (innerKey !== "type") continue;

                                    switch (value[i][innerKey]) {
                                        
                                        case "text": {
                                            const p = document.createElement("p");

                                            p.textContent = value[i]["content"];
                                            
                                            const format = value[i]["format"] || "normal";

                                            if (format !== "normal") {
                                                switch (format) {
                                                    case "bold":
                                                        p.style.fontWeight = "700";
                                                        break;

                                                    case "italic":
                                                        p.style.fontStyle = "italic";
                                                        break;

                                                    case "underline":
                                                        p.style.textDecoration = "underline";
                                                        break;

                                                    case "bold-italic":
                                                        p.style.fontWeight = "700";
                                                        p.style.fontStyle = "italic";
                                                        break;

                                                    case "code":
                                                        p.style.fontFamily = "monospace";
                                                        p.style.background = "#f5f5f5";
                                                        p.style.padding = "0.25em 0.4em";
                                                        p.style.borderRadius = "4px";
                                                        break;
                                                }
                                            }
                                            if (value[i]["border"] === "true") {
                                                p.style.border = "1px solid black";
                                                p.style.padding = "8px";
                                            }

                                            pageEl.appendChild(p);
                                            break;
                                        }

                                        case "image": {
                                            /// Zoom in when clicked
                                            let imgContent = document.createElement("img");
                                            imgContent.src = value[i]["src"];
                                            imgContent.alt = value[i]["alt"] || "";

                                            if (value[i]["width"]) {
                                                imgContent.style.width = `${Number(value[i]["width"]) * 100}%`;
                                            }

                                            imgContent.style.display = "block";
                                            imgContent.style.margin = "0 auto";

                                            pageEl.appendChild(imgContent);
                                            break;
                                        }

                                        case "video": {
                                            let video = document.createElement("video");

                                            video.src = value[i]["src"];
                                            video.controls = true;

                                            if (value[i]["title"]) {
                                                video.title = value[i]["title"];
                                            }

                                            if (value[i]["width"]) {
                                                video.style.width = `${Number(value[i]["width"]) * 100}%`;
                                            }

                                            video.style.display = "block";
                                            video.style.margin = "0 auto";

                                            pageEl.appendChild(video);
                                            break;
                                            }

                                        case "list": {
                                            let ul = document.createElement("ul");

                                            value[i]["content"].forEach(item => {
                                                let li = document.createElement("li");
                                                li.textContent = item;
                                                ul.appendChild(li);
                                            });

                                            pageEl.appendChild(ul);
                                            break;
                                        }

                                        case "bullet-list": {
                                            let ol = document.createElement("ol");

                                            value[i]["content"].forEach(item => {
                                                let li = document.createElement("li");
                                                li.textContent = item;
                                                ol.appendChild(li);
                                            });

                                            pageEl.appendChild(ol);
                                            break;
                                        }

                                        case "table": {
                                            let table = document.createElement("table");
                                            table.style.borderCollapse = "collapse";
                                            table.style.width = "100%";

                                            // Header
                                            if (value[i]["head"]) {
                                            let thead = document.createElement("thead");
                                            let tr = document.createElement("tr");

                                            value[i]["head"].forEach(h => {
                                                let th = document.createElement("th");
                                                th.textContent = h;
                                                th.style.border = "1px solid #ccc";
                                                th.style.padding = "6px";
                                                tr.appendChild(th);
                                            });

                                            thead.appendChild(tr);
                                            table.appendChild(thead);
                                            }

                                            // Body
                                            let tbody = document.createElement("tbody");

                                            value[i]["rows"].forEach(row => {
                                            let tr = document.createElement("tr");

                                            row.forEach(cell => {
                                                let td = document.createElement("td");
                                                td.style.border = "1px solid #ccc";
                                                td.style.padding = "6px";

                                                if (typeof cell === "object" && cell.type === "image") {
                                                    let img = document.createElement("img");
                                                    img.src = cell.src;
                                                    img.alt = cell.alt || "";
                                                    img.style.width = "40px";
                                                    img.style.display = "block";
                                                    td.appendChild(img);
                                                } else {
                                                    td.textContent = cell;
                                                }

                                                tr.appendChild(td);
                                            });

                                            tbody.appendChild(tr);
                                            });

                                            table.appendChild(tbody);
                                            pageEl.appendChild(table);
                                            break;
                                        }

                                        case "textarea": {
                                            let textarea = document.createElement("textarea");
                                            textarea.placeholder = value[i]["prompt"] || "";

                                            if (value[i]["height"]) {
                                                textarea.style.height = `${Number(value[i]["height"])}px`;
                                            }

                                            textarea.rows = 4;
                                            pageEl.appendChild(textarea);
                                            break;
                                        }

                                        case "podcast": {
                                            // Outer container
                                            let container = document.createElement("div");
                                            container.className = "podcast-container";

                                            // Introduction text
                                            if (value[i]["introduction"]) {
                                                let intro = document.createElement("p");
                                                intro.className = "podcast-text";
                                                intro.textContent = value[i]["introduction"];
                                                container.appendChild(intro);
                                            }

                                            // Podcast media row
                                            let podcastRow = document.createElement("div");
                                            podcastRow.className = "podcast";

                                            // Image
                                            if (value[i]["image"]) {
                                                let img = document.createElement("img");
                                                img.src = value[i]["image"]["src"];
                                                img.alt = value[i]["image"]["alt"] || "";
                                                podcastRow.appendChild(img);
                                            }

                                            // Embedded player
                                            if (value[i]["link"]) {
                                                let iframe = document.createElement("iframe");
                                                iframe.src = value[i]["link"];
                                                iframe.setAttribute("frameBorder", "0");
                                                iframe.setAttribute("scrolling", "no");
                                                iframe.style.width = "60%";

                                                podcastRow.appendChild(iframe);
                                            }

                                            container.appendChild(podcastRow);

                                            // Text content blocks
                                            if (Array.isArray(value[i]["text-content"])) {
                                                value[i]["text-content"].forEach(block => {
                                                if (block.type === "text") {
                                                    let p = document.createElement("p");
                                                    p.className = "podcast-text";
                                                    p.textContent = block.content;
                                                    container.appendChild(p);
                                                }
                                                });
                                            }

                                            pageEl.appendChild(container);
                                            break;
                                        }

                                        case "3d-model": {
                                            /// create a canvas element 
                                            /// insert 3d model with thecorresponding width and height
                                            
                                            break;
                                        }

                                        case "iframe": {
                                            let iframe = document.createElement("iframe");

                                            // Ensure absolute URL
                                            let src = value[i]["src"];
                                            if (!src.startsWith("http")) {
                                                src = "https://" + src;
                                            }
                                            iframe.src = src;

                                            // Width handling (0–1 → percentage)
                                            if (value[i]["width"] !== undefined) {
                                                iframe.style.width = `${Number(value[i]["width"]) * 100}%`;
                                            } else {
                                                iframe.style.width = "100%";
                                            }

                                            // Sensible defaults
                                            iframe.style.height = "400px";
                                            iframe.style.border = "none";
                                            iframe.style.display = "block";
                                            iframe.style.margin = "0 auto";

                                            iframe.setAttribute("loading", "lazy");

                                            pageEl.appendChild(iframe);
                                            break;
                                            }


                                    }
                                }

                                continue;
                            }
                        }

                        let content = document.createElement("p");
                        let list = document.createElement("li");
                        list.textContent = value[i];
                        content.appendChild(list);
                        pageEl.appendChild(content);
                        
                        // console.log(`  [${i}]:`, value[i]);

                        ///Append the content of the list into ls tag in html
                    }
                } else {
                    if (key == "title") {
                        continue;
                    }
                    let bold = document.createElement("strong");
                    let content = document.createElement("p");
                    bold.textContent = this.units[this.selectedUnit][key];
                    content.appendChild(bold);
                    pageEl.appendChild(content);
                    // console.log(`  ${this.units[this.selectedUnit][key]}`);
                }
            }
            // console.log(`Page is ${this.isOverflow(pageEl)}`)
            // console.log(this.selectedUnit)

            if (parseInt(pageEl.id) % 2 != 0) {
                this.createNewPage(pageEl)
            }
        },

        created() {
            let self = this;
            window.addEventListener('scroll', this.handleScroll);
            document.onkeydown = function(e) {
                switch(e.which) {
                    case 37: 
                    self.previous()// left
                    break;

                    case 39: 
                    self.next()// right
                    break;
                } 
            };


            ///When selectedUnit is updated, reload this component and this component only (not the app)

            window.addEventListener('resize', () => {this.resizeAdjust()}) 
        },

        methods: {
            // Check if page overflows
            isOverflow(element) {
                return element.scrollHeight > element.clientHeight;
            },

            // Helper function to create a new page
            createNewPage(currentPage) {
                const newPage = document.createElement("div");
                newPage.setAttribute("id", `${parseInt(currentPage.id, 10) + 1}`);
                newPage.setAttribute("class", "page");
                document.getElementById("slide").appendChild(newPage);

                // console.log(`Created new page with id: ${newPage.id}`);

                return newPage;
            },

            // Helper function to handle overflow
            handleOverflow(pageElement) {
                if (this.isOverflow(pageElement)) {
                    // console.log("Overflow detected, creating new page.");

                    return this.createNewPage(pageElement);
                }
                return pageElement;
            },

            ///Readjust/fix slider position when resize window
            resizeAdjust() {
                let pageArr = document.getElementsByClassName("page");
                pageArr[this.count * 2].scrollIntoView({ 
                    behavior: "instant", 
                    block: "start", 
                    inline: "start" });
                if (window.innerWidth >= window.innerHeight && window.innerWidth > 800)  {
                    pageArr[this.count * 2 + 1].scrollIntoView({ 
                        behavior: "instant", 
                        block: "start", 
                        inline: "end" });
                }
                ///scale down elements in page until it fit (problem with this implementation: high runtime)
                // let pages = document.querySelectorAll(".page")
                // for (let i = 0; i < pages.length; i += 1) {
                //     while (!this.isOverflow(pages[i])) { 
                //         ///Scale up the element until overflow
                //     }
                    
                //     while (this.isOverflow(pages[i])) {
                //         ///scale down the element until no longer overflow
                //     }    
                // }
                ///scale up elem
            },
            
            ///Invokes the website that is hidden from view (usually games).
            openIframe(id) {
                document.getElementById(id).style.visibility = "visible";
            },
            closeIframe(id){
                document.getElementById(id).style.visibility = "hidden";
            },

            ///Invokes the overlay area that has a video on top of it.
            playVideo(id){
                document.getElementById(id).style.display = "flex";
            },
            closeVideo(id){
                document.getElementById(id).style.display = "none";
            },
            
            ///play3D(id){
            ///    document.getElementById(id).style.display = "flex";
            ///},
            ///close3D(){
            ///    document.getElementById(id).style.display = "none";
            ///},

            ///Escape the overlay area upon clicking out
            clickOut(cls){
                const el = document.getElementsByClassName(cls);
                for (let i=0; i < el.length; i += 1) {
                    el[i].style.display = "none";
                }
            },

            ///Manages the scroll bar behavior. 
            handleScroll() {
                let pageArr = document.getElementsByClassName("page");
                //var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                //var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                //var scrolled = (winScroll / height) * 100;
                //var totalWidth = screen.availWidth;
                var totalWidth = document.getElementById("slide").offsetWidth;
                var scrolled = (window.innerWidth <= window.innerHeight) ? totalWidth / (pageArr.length - 1) : totalWidth / (pageArr.length/2 - 1); 
                document.getElementById("myBar").style.width = scrolled*this.count + "px";
                console.log(this.count)
                console.log(pageArr.length)
            },
            
            ///Move slide backward
            previous() {
                ///Bouncing prevention
                if (this.lastClick >= (Date.now() - this.delay))
                    return;
                this.lastClick = Date.now();
                if(this.count > 0){ //12 because the current slide has 12 pages
                    this.count--
                    this.scroll("previous")
                }
                this.handleScroll()
            },

            ///Move slide forward
            next() {
                ///Bouncing prevention
                if (this.lastClick >= (Date.now() - this.delay))
                    return;
                this.lastClick = Date.now();
                let pageArr = document.getElementsByClassName("page");
                let limit = window.innerWidth >= window.innerHeight && window.innerWidth > 600 ? pageArr.length / 2 - 1 : pageArr.length - 1;
                if(this.count < limit){
                    this.count++
                    this.scroll("next")
                }
                this.handleScroll()
                // console.log(pageArr.length);
            },

            ///Creating and managing scroll behavior 
            scroll(position) {
                let el = document.getElementById("slide");
                let page = document.getElementsByClassName("page")[0].offsetWidth;
                let width = (window.innerWidth > 600) && (window.innerWidth > window.innerHeight) ? page * 2 : page;
                let scrollValue = position == 'next' ? width : -width;
                el.scrollBy({
                    left: scrollValue,
                    top: 0,
                    behavior: 'smooth'
                })
            },
    
            ///For swipability on mobile devices
            touchStartMethod (touchEvent) {
                const posXStart = touchEvent.changedTouches[0].clientX;
                const posYStart = touchEvent.changedTouches[0].clientY;
                addEventListener('touchend', (touchEvent) => this.touchEndMethod(touchEvent, posXStart, posYStart), {once: true});
            },

            touchEndMethod (touchEvent, posXStart, posYStart) {
                const posXEnd = touchEvent.changedTouches[0].clientX;
                const posYEnd = touchEvent.changedTouches[0].clientY;
                if ((Math.abs(posYEnd - posYStart) <= 50) && (Math.abs(posXEnd - posXStart) >= 100)) {
                    if (posXStart < posXEnd) {
                        this.previous(); // swipe right
                    } else if (posXStart > posXEnd) {
                        this.next(); // swipe left
                    }
                }
            },

            /*** 
            ///For swipability with mouse 
            mouseDownMethod (mouseEvent) {
                if (touchEvent.changedTouches.length !== 1) { // Only care if one finger is used
                    return;
                }
                const posXStart = touchEvent.clientX;
                addEventListener('mouseup', (touchEvent) => this.mouseUpMethod(touchEvent, posXStart), {once: true});
            },

            mouseUpMethod (touchEvent, posXStart) {
                if (touchEvent.changedTouches.length !== 1) { // Only care if one finger is used
                    return;
                }
                const cellText = document.getSelection();
                const posXEnd = touchEvent.clientX;
                if (cellText.type != 'Range') {
                    if (posXStart < posXEnd) {
                        this.previous(); // swipe right
                    } else if (posXStart > posXEnd) {
                        this.next(); // swipe left
                    }
                }
            },***/
        }
    };
</script>

<style>
.title {
  font-family: "League Spartan", sans-serif;
  margin: 1vw;
  color:aliceblue; 
  font-size: 230%;
}

.background {
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  height: 95vh ;
}

@media (max-width: 600px),
(orientation:portrait) {
  .background {
    height: 100vh;
  }
}

/***Slide***/
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  min-width: 97vw !important;
  padding-bottom: 0;
  height:100%;
  padding-right: 0;
  padding-left: 0;
}


#slide {
  height: 80vh !important;
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  text-indent: 2%;
}

#slide > div {
  padding: 2%;
  min-width: 50%;
  height: 100%;
  min-height: 400px;
  padding-right: 2%;
  padding-left:2%;
  box-sizing: border-box;
  background-color: aliceblue;
  text-align: left;
  margin:0;
  overflow-y: scroll !important; 
  -ms-overflow-style: none;  
  scrollbar-width: none;  
  
  }
  #slide > div::-webkit-scrollbar {
  display: none;
  }

  #slide > .page > p {
    margin: 12.5px;
    font-size: 120%;
    font-family:"League Spartan",sans-serif;
    text-align: justify;
  }

#page2 > div > div > img {
  max-width:130px;
}

@media (max-width: 600px),
(orientation:portrait) {
  .background {
    height: 100vh;
  }
  #slide > div { 
      min-width: 100%;
  }
  .title {
    margin: 5%;
    font-size: 5vw;
  }
  .container {
      min-width: 85.3vw;
  }
}

@media screen and (max-height: 500px) {
  #slide > .page > p,
  .wrap-text {
    font-size: 70% !important;
  }
  #slide {
    overflow-y: scroll;
  }
  .background{
    height: 100vh;
  }
  .title {
    font-size: 129%;
  }
  .podcast-text {
    font-size: 70% !important;
  }
}

@media screen and (min-height: 900px) {
  #slide > .page > p,
  .wrap-text {
      font-size: 160% !important;
  }
  #slide > div > div > p {
      font-size: 120%;
  }
}

@media screen and (min-height: 1200px) {
  #slide > .page > p {
      font-size: 210%;
  }
  #slide > div > div > p {
      font-size: 180%;
  }
  .wrap-text {
    font-size: 210%;
  }
}

@media screen and (min-width: 2300px) {
  #page2 > div > div > img {
      display: none;
  }
  #slide > .page > p {
      font-size: 250%;
  }
  #slide > div > div > p {
      font-size: 200%;

  }
}
/***MEDIA (GENERAL)***/
.overlay{
  position:fixed;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: rgba(67, 67, 67, 0.6);
  width:100%;
  height:120%;
  color:white;
  cursor: pointer;
  display:none;
}

.media {
  width: 80%;
  position: absolute;
  left: 0;
  right: 0;
  top: 15%;
  bottom: 0;
  margin: auto;
  color:white;
  cursor: pointer;
  display: none;
}

/***PODCAST***/
.podcast {
  display: flex; 
  flex-direction: row; 
  justify-content: space-around;
  height: 18vh;
}

/***VIDEO***/
.video {
  display: flex; 
  overflow: hidden;
  flex-direction: column; 
  height: 29vh;
  width: 70%;
  padding:2%;
  color: #FFFFFF;
  background: #212121;
  text-align: center;
  border-radius: 20px;
  margin-left: auto; 
  margin-right: auto;
  overflow: hidden
}

.vid-title {
  margin-bottom: 3vh !important;
  font-size: 16px;
  text-align: center;
}

.thumbnail {
  width: 40%; 
  height: 19vh; 
  cursor: pointer;
}

@media (max-width: 600px) and (orientation:portrait) {
  .thumbnail {
    width: 70%;
  }
}

/***CONTROL BUTTONS***/
.control {
  background: transparent;
  opacity: 0.3;
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-self: center;
  color: rgb(255, 255, 130) ;
  border: none;
  height: 70px;
  font-size: 90px;
  font-weight: bold;
}

.nav-buttons {
  background-color: rgba(128, 128, 128, 0.1);
  position: absolute;
  display: flex;
  width: 140px;
  justify-content: center !important;
  justify-self: center !important;
  border-radius: 50px;
  right: 3.5%;
  bottom: 5%;
}

.nav-buttons :hover {
  opacity: 0.5;
}

@media (max-width: 600px),
(orientation:portrait) {
  .control {
      font-size: 70px;
  }
  .nav-buttons {
      width: 100px;
  }
}

/***ANSWER BOX***/
#slide > div > textarea{
  margin: 3% 0;
  width: 100%;
}

/***PROGRESS CONTAINER***/
.progress-container {
width: 100%;
height: 1%;
background: #cccccc;
margin:0;
}

.progress-bar {
height: 8px;
background: #04AA6D;
width: 0%;
min-width:0%;
max-width:100%;
}

.periodic-table-container {
    cursor: pointer; 
    display: flex; align-items: center; 
    justify-items: center;
}
.periodic-table {
    width:80%; 
    margin: 20px;
}

.podcast-text {
  text-indent: 0%;
  margin: 10px;
  font-size: 100%;
  font-family: "League Spartan",sans-serif;
  text-align: justify;
}

.podcast-container {
  display: flex; 
  overflow: hidden;
  flex-direction: column; 
  min-height: 10vh;
  padding:2%;
  color: #FFFFFF;
  background: #212121;
  text-align: center;
  border-radius: 20px;
  display:block;
  margin:0;
}

.wrap-img-container {
    display: flex; 
    flex-direction: column !important; 
    align-items: center;
    justify-content: space-around; 
    width:50%;
}

.wrap-img {
    width:50%; 
    cursor: pointer;
}

.bond-table {
    margin:30px 25%; 
    width: 50%; 
    cursor: pointer;
}

/***PROGRESS BAR***/
#myBar {
    background-color: rgba(4,170,109,255); 
    height: 100%;
}

/***EXCERCISES***/
.excercise {
  margin:30px 4%; 
  width: 90%; 
  cursor: pointer;
}

.ex-answer {
  margin: 0% 4% !important;
  width:95% !important;
  height:7% !important;
}

.wrap-text {
  color: black;
  max-width: 50%;
  margin: 12.5px;
  font-size: 120%;
  font-family:"League Spartan",sans-serif;
  text-align: justify;
}

.wrap-textbox {
  display:flex; 
  flex-direction: row !important; 
  background: none !important; 
  width: 100%;
  margin: 0;
}

.wrap-up-head {
  font-style: italic; 
  margin-bottom: 0% !important;
}

.wrap-up-content {
  margin-top: 0% !important;
}

/***GAME***/
/* #game1 {
    visibility: hidden;
}

iframe{
    position:fixed; 
    top:0; 
    left:0; 
    bottom:0; 
    right:0; 
    width:100%; 
    height:100%; 
    border:none; 
    margin:0; 
    padding:0; 
    overflow:hidden; 
    background-color: gray;
    z-index: 9;
} */
</style>
