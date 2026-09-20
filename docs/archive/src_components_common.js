export default {
    /***
        Code reference: Adeoye's blog article "How to build a Vuejs image slider"
        https://medium.com/@davidola360/how-to-create-a-vuejs-image-slider-60b4be844081
    ***/
    data(){
        return{
            count: 0, ///Keep track of pages
            lastClick: 0,
            delay: 690,
        }
    },

    ///Move forward or backward in <- and -> buttons
    created(){
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
        window.addEventListener('resize', () => {this.resizeAdjust()}) 
    },
    
    methods:{
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
            document.getElementById("myBar").style.width = scrolled * this.count + "px";
            console.log(this.count)
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
            console.log(pageArr.length);
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
    },
}