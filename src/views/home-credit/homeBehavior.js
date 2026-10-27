export default {
    data() {
        return {
            epinephrineViewer: null,
            epinephrineResizeObserver: null,
            epinephrineWheelBlocker: null,
            epinephrineTouchZoomBlocker: null
        };
    },
    mounted() {
        this.$nextTick(() => this.initEpinephrineModel());
    },
    beforeUnmount() {
        if (this.epinephrineResizeObserver) {
            this.epinephrineResizeObserver.disconnect();
        }
        const canvas = this.$refs.epinephrineCanvas;
        if (canvas && this.epinephrineWheelBlocker) {
            canvas.removeEventListener("wheel", this.epinephrineWheelBlocker, true);
            canvas.removeEventListener("DOMMouseScroll", this.epinephrineWheelBlocker, true);
        }
        if (canvas && this.epinephrineTouchZoomBlocker) {
            canvas.removeEventListener("touchmove", this.epinephrineTouchZoomBlocker, true);
        }

        this.epinephrineViewer = null;
    },
    create() {
        window.addEventListener("DOMMouseScroll", event => console.log('???'))
    },
    methods:{
        async initEpinephrineModel() {
            const canvas = this.$refs.epinephrineCanvas;
            if (!canvas) return;

            try {
                const chemDoodle = typeof ChemDoodle === "undefined"
                    ? null : ChemDoodle;
                if (!chemDoodle) throw new Error("ChemDoodle failed to load");

                const response = await fetch(
                    `${process.env.BASE_URL}content/epinephrine-3d.sdf`
                );
                if (!response.ok) {
                    throw new Error(`Epinephrine model request failed: ${response.status}`);
                }

                const molText = await response.text();
                const host = canvas.parentElement;
                const width = Math.max(
                    240,
                    Math.min(Math.round(host.clientWidth || 420), 520)
                );
                const height = Math.max(260, Math.min(Math.round(width * 0.82), 420));
                const viewer = new chemDoodle.TransformCanvas3D(
                    canvas.id,
                    width,
                    height
                );
                viewer.mousewheel = () => {};

                this.epinephrineWheelBlocker = event => event.stopImmediatePropagation();
                this.epinephrineTouchZoomBlocker = event => {
                    if (event.touches && event.touches.length > 1) {
                        event.stopImmediatePropagation();
                    }
                };
                canvas.addEventListener("wheel", this.epinephrineWheelBlocker, { capture: true });
                canvas.addEventListener("DOMMouseScroll", this.epinephrineWheelBlocker, { capture: true });
                canvas.addEventListener("touchmove", this.epinephrineTouchZoomBlocker, { capture: true });


                viewer.styles.backgroundColor = "#111c24";
                viewer.styles.atoms_useJMOLColors = true;
                viewer.styles.bonds_color = "#d9e2df";
                viewer.styles.set3DRepresentation("Ball and Stick");
                viewer.loadMolecule(chemDoodle.readMOL(molText, 1));
                viewer.repaint();

                this.epinephrineViewer = viewer;
                canvas.dataset.status = "ready";

                if ("ResizeObserver" in window) {
                    this.epinephrineResizeObserver = new ResizeObserver(() => {
                        this.resizeEpinephrineModel();
                    });
                    this.epinephrineResizeObserver.observe(host);
                }
            } catch (error) {
                canvas.dataset.status = "error";
                console.error("Failed to initialize epinephrine model:", error);
            }
        },
        resizeEpinephrineModel() {
            const canvas = this.$refs.epinephrineCanvas;
            const viewer = this.epinephrineViewer;
            if (!canvas || !viewer || typeof viewer.resize !== "function") return;

            const width = Math.max(
                240,
                Math.min(Math.round(canvas.parentElement.clientWidth || 420), 520)
            );
            const height = Math.max(260, Math.min(Math.round(width * 0.82), 420));
            viewer.resize(width, height);
            viewer.repaint();
        },
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