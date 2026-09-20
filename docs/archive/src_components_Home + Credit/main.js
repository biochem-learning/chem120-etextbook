export default {
    create() {
        window.addEventListener("DOMMouseScroll", event => console.log('???'))
    },
    methods:{
        ////playVideo() invokes the overlay area that has a video on top of it.
        playVideo(id){
            document.getElementById(id).style.display = "flex";
        },
        //closeVideo() closes the overlay area.
        closeVideo(id){
            document.getElementById(id).style.display = "none";
        },
        play3D(){
            document.getElementById("overlay2").style.display = "flex";
        },
        close3D(){
            document.getElementById("overlay2").style.display = "none";
        },
        clickOut(cls){
            const el = document.getElementsByClassName(cls);
            for (let i=0; i < el.length; i += 1) {
                el[i].style.display = "none";
            }
        },
        //handleScroll() manages the scroll bar function. Every time a user clicks Next/Previous,
        //it increases/decreases the area of a green bar that indicates where the reader is at wihtin
        //the whole slide
        percentageSeen(element) {
            // Get the relevant measurements and positions
            const viewportHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            const elementOffsetTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
          
            // Calculate percentage of the element that's been seen
            const distance = scrollTop + viewportHeight - elementOffsetTop;
            const percentage = Math.round(
              distance / ((viewportHeight + elementHeight) / 100)
            );
          
            // Restrict the range to between 0 and 100
            console.log (Math.min(100, Math.max(0, percentage)));
    }
    },
}