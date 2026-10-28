<template>
    <div class="background">
        <div class="container" id="container" @keyup="created">
            <div class="nav-buttons" role="group" aria-label="Lesson page navigation">
                <button type="button" @click="previous" class="control" aria-label="Previous pages">
                    <
                </button>
                <button type="button" @click="next" class="control" aria-label="Next pages">
                    >
                </button>
            </div>

            <div
                v-if="lightboxOpen"
                class="image-lightbox"
                ref="lightboxDialog"
                tabindex="-1"
                role="dialog"
                aria-modal="true"
                aria-label="Enlarged image. Use Control or Command plus scroll to zoom. Press Escape to close."
                @click.self="closeImageLightbox"
            >
                <div class="image-lightbox__dialog">
                    <div class="image-lightbox__viewport" @wheel="handleLightboxWheel">
                        <div class="image-lightbox__stage" :style="{ width: (lightboxZoom * 100) + '%' }">
                            <img :src="lightboxSrc" :alt="lightboxAlt">
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="overlay" class="overlay" @click="clickOut('overlay'); clickOut('media')">
                <!--
                    Overlay class rests upon the slide class. It contains video/3d model data and it expands when a user
                    selects the thumbnail picture.
                -->
            </div>
            <!-- <video id="media1" class="media" width="80%" controls>
                <source src="@/assets/unit1/Unit1-twoPeopleSharingSoda.mp4" type="video/mp4" showControl>
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

            <h1 class="title">
                {{title}} 
            </h1>
            
            
            <div id="slide" v-if="!gridEnabled" role="region" :aria-label="title" @touchstart="touchStartMethod" @mousedown="mouseDownMethod" @keyup.left="next()">
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

    import { units } from '@/content/registry.js';

    export default {
        props: ["btnText"],
        data() {
            const savedUnit = localStorage.getItem('selectedUnit');
            const selectedUnit = units[this.btnText]
                ? this.btnText
                : (units[savedUnit] ? savedUnit : 'unit1');
            return {
                units,
                selectedUnit,

                count: 0, ///Keep track of pages
                lastClick: 0,
                delay: 690,
                onSlideKeydown: null,
                lightboxOpen: false,
                lightboxSrc: "",
                lightboxAlt: "",
                lightboxZoom: 1,
                lightboxReturnFocus: null,
                repaginationTimer: null,
                repaginationFrame: null,

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
                return this.units[this.selectedUnit]?.sections || [];
            },
        },

        mounted() {

        // const loadScript = (src) => {
        //     return new Promise((resolve, reject) => {
        //     const s = document.createElement("script");
        //     s.src = src;
        //     s.onload = resolve;
        //     s.onerror = () => reject(new Error(`Failed to load ${src}`));
        //     document.body.appendChild(s);
        //     });
        // };

        // const init = async () => {
        //     try {
        //     // Load in dependency order
        //     const base = process.env.BASE_URL || "/";
        //     await loadScript(`${base}libraries/chemdoodle/ChemDoodleWeb.js`);
        //     await loadScript(`${base}libraries/chemdoodle/ChemDoodleWeb-uis.js`);
            
        //     // now ChemDoodle exists
        //     console.log(window.ChemDoodle);

        //     // render blocks here only after scripts are ready
        //     // this.renderAllBlocks();
        //     } catch (err) {
        //     console.error(err);
        //     }
        // };

        // init();

        // ---------- helpers: inline rich text ----------
        const applyInlineFormat = (el, fmt) => {
            switch (fmt) {
            case "bold": el.style.fontWeight = "700"; break;
            case "italic": el.style.fontStyle = "italic"; break;
            case "underline": el.style.textDecoration = "underline"; break;
            case "bold-italic":
                el.style.fontWeight = "700";
                el.style.fontStyle = "italic";
                break;
            case "code":
                el.style.fontFamily = "monospace";
                el.style.background = "#f5f5f5";
                el.style.padding = "0.25em 0.4em";
                el.style.borderRadius = "4px";
                break;
            }
        };

        const renderInline = (content, fallbackFmt = "normal") => {
            const frag = document.createDocumentFragment();

            // Rich runs array
            if (Array.isArray(content)) {
            content.forEach(run => {
                if (run == null) return;

                // allow raw strings in run array
                if (typeof run === "string") {
                frag.appendChild(document.createTextNode(run));
                return;
                }

                if (run.type === "br") {
                frag.appendChild(document.createElement("br"));
                return;
                }

                if (run.type !== "span") return;

                let node;

                // structural formats
                if (run.format === "sub") {
                node = document.createElement("sub");
                node.textContent = run.text ?? "";
                } else if (run.format === "sup") {
                node = document.createElement("sup");
                node.textContent = run.text ?? "";
                } else {
                node = document.createElement("span");
                node.textContent = run.text ?? "";

                const fmt = run.format || "normal";
                if (fmt !== "normal") applyInlineFormat(node, fmt);
                }

                if (run.class) node.className = run.class;
                if (run.style && typeof run.style === "object") Object.assign(node.style, run.style);

                frag.appendChild(node);
            });

            return frag;
            }

            // Plain string/number fallback
            const span = document.createElement("span");
            span.textContent = content ?? "";
            if (fallbackFmt && fallbackFmt !== "normal") applyInlineFormat(span, fallbackFmt);
            frag.appendChild(span);
            return frag;
        };

        const renderTextLike = (x, fallbackFmt = "normal") => {
            if (x == null) return document.createTextNode("");

            // { type:"text", content: ... }
            if (typeof x === "object" && !Array.isArray(x) && x.type === "text") {
            return renderInline(x.content, x.format || fallbackFmt);
            }

            // runs array
            if (Array.isArray(x)) {
            return renderInline(x, fallbackFmt);
            }

            // plain string/number
            return renderInline(String(x), fallbackFmt);
        };

        // ---------- helpers: media styling + figure/caption ----------
        const styleMediaEl = (el, b = {}) => {
            el.style.display = "block";
            el.style.margin = "0 auto";
            el.style.maxWidth = "100%";
            el.style.height = "auto";

            if (b.width !== undefined) {
            el.style.width = `${Number(b.width) * 100}%`;
            }
        };

        const makeImageZoomable = (img, b = {}) => {
            if (!b.src) return;
            const accessibleText = b.alt || b.title ||
                (typeof b.caption === "string" ? b.caption : "") ||
                "image";
            img.classList.add("zoomable-image");
            img.tabIndex = 0;
            img.setAttribute("role", "button");
            img.setAttribute("aria-label", "Enlarge " + accessibleText);
            const open = () => this.openImageLightbox(
                b.src,
                b.decorative ? "" : accessibleText,
                img
            );
            img.addEventListener("click", open);
            img.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    open();
                }
            });
        };

        const renderMediaFigure = (mediaEl, caption) => {
            const fig = document.createElement("figure");
            fig.className = "media-figure";
            fig.style.margin = "16px auto";
            fig.style.textAlign = "center";

            fig.appendChild(mediaEl);

            if (caption) {
            const cap = document.createElement("figcaption");
            cap.className = "media-caption";
            cap.style.fontSize = "130%";
            cap.style.marginTop = "6px";
            cap.style.lineHeight = "1.3";

            if (typeof caption === "string") {
                cap.textContent = caption;
            } else {
                if (caption.border === "true") {
                cap.style.border = "1px solid black";
                cap.style.padding = "6px";
                cap.style.display = "inline-block";
                }
                cap.appendChild(renderTextLike(caption, "normal"));
            }

            fig.appendChild(cap);
            }

            return fig;
        };

        // ---------- block renderers ----------
        const blockRenderers = {
            heading: (b) => {
            const level = Math.min(6, Math.max(2, Number(b.level) || 2));
            const heading = document.createElement("h" + level);
            heading.appendChild(renderTextLike(b.content ?? "", "normal"));
            return heading;
            },

            text: (b) => {
            const p = document.createElement("p");
            if (typeof b.content === "string" && b.content.trim() === "What we will learn in this unit:") p.classList.add("learning-objectives-label");

            if (b.border === true || b.border === "true") {
                p.style.border = "1px solid black";
                p.style.padding = "8px";
            }

            p.appendChild(renderTextLike(b.content ?? "", b.format || "normal"));
            return p;
            },

            image: (b) => {
            const img = document.createElement("img");
            img.src = b.src;
            img.alt = b.decorative ? "" : (b.alt || "");
            img.style.color = "transparent";
            styleMediaEl(img, b);
            makeImageZoomable(img, b);
            return renderMediaFigure(img, b.caption);
            },

            video: (b) => {
            const video = document.createElement("video");
            video.src = b.src;
            video.controls = true;
            video.preload = "metadata";
            if (b.title) {
                video.title = b.title;
                video.setAttribute("aria-label", b.title);
            }

            (b.tracks || []).forEach((track, index) => {
                const trackEl = document.createElement("track");
                trackEl.src = track.src;
                trackEl.kind = track.kind || "captions";
                trackEl.srclang = track.lang || "en";
                trackEl.label = track.label || "English";
                trackEl.default = index === 0;
                video.appendChild(trackEl);
            });

            styleMediaEl(video, b);
            if (b.width === undefined) video.style.width = "100%";

            return renderMediaFigure(video, b.caption);
            },

            list: (b) => {
            const ul = document.createElement("ul");
            (b.content || []).forEach(item => {
                const li = document.createElement("li");
                li.appendChild(renderTextLike(item, "normal"));
                ul.appendChild(li);
            });
            return ul;
            },

            "bullet-list": (b) => {
            const ol = document.createElement("ol");
            (b.content || []).forEach(item => {
                const li = document.createElement("li");
                li.appendChild(renderTextLike(item, "normal"));
                ol.appendChild(li);
            });
            return ol;
            },

            "ordered-list": (b) => {
            const ol = document.createElement("ol");
            (b.content || []).forEach(item => {
                const li = document.createElement("li");
                li.appendChild(renderTextLike(item, "normal"));
                ol.appendChild(li);
            });
            return ol;
            },

            "unordered-list": (b) => {
            const ul = document.createElement("ul");
            (b.content || []).forEach(item => {
                const li = document.createElement("li");
                li.appendChild(renderTextLike(item, "normal"));
                ul.appendChild(li);
            });
            return ul;
            },

            table: (b) => {
            const table = document.createElement("table");
            table.style.borderCollapse = "collapse";
            table.style.width = "100%";

            // Header (rich supported)
            if (b.head) {
                const thead = document.createElement("thead");
                const tr = document.createElement("tr");

                b.head.forEach(h => {
                const th = document.createElement("th");
                th.style.border = "1px solid #ccc";
                th.style.padding = "6px";
                th.appendChild(renderTextLike(h, "normal"));
                tr.appendChild(th);
                });

                thead.appendChild(tr);
                table.appendChild(thead);
            }

            const tbody = document.createElement("tbody");

            (b.rows || []).forEach(row => {
                const tr = document.createElement("tr");

                (row || []).forEach(cell => {
                const td = document.createElement("td");
                td.style.border = "1px solid #ccc";
                td.style.padding = "6px";

                // image cell
                if (cell && typeof cell === "object" && cell.type === "image") {
                    const img = document.createElement("img");
                    img.src = cell.src;
                    img.alt = cell.decorative ? "" : (cell.alt || "");
                    img.style.color = "transparent";
                    styleMediaEl(img, cell);
                    makeImageZoomable(img, cell);

                    if (cell.width === undefined) img.style.width = "120px";

                    td.appendChild(img);
                } else {
                    td.appendChild(renderTextLike(cell, "normal"));
                }

                tr.appendChild(td);
                });

                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            return table;
            },

            textarea: (b) => {
            const textarea = document.createElement("textarea");
            textarea.placeholder = b.prompt || "";
            textarea.rows = 4;
            if (b.height) textarea.style.height = `${Number(b.height)}px`;
            return textarea;
            },

            podcast: (b) => {
            const container = document.createElement("div");
            container.className = "podcast-container";

            if (b.introduction) {
                const intro = document.createElement("p");
                intro.className = "podcast-text";
                intro.textContent = b.introduction;
                container.appendChild(intro);
            }

            const row = document.createElement("div");
            row.className = "podcast";

            if (b.image?.src && !b.link) {
                const img = document.createElement("img");
                img.src = b.image.src;
                img.alt = b.image.alt || "";
                styleMediaEl(img, b.image);
                // optional: thumbnail default
                if (b.image.width === undefined) img.style.width = "140px";
                img.style.borderRadius = "8px";
                row.appendChild(img);
            }

            if (b.link) {
                const iframe = document.createElement("iframe");
                iframe.src = b.link;
                iframe.title = b.title || "Lesson podcast";
                iframe.setAttribute("frameBorder", "0");
                iframe.setAttribute("scrolling", "no");
                iframe.style.width = "100%";
                row.appendChild(iframe);
            }

            container.appendChild(row);

            (b["text-content"] || []).forEach(tb => {
                if (tb && tb.type === "text") {
                const p = document.createElement("p");
                p.className = "podcast-text";
                p.appendChild(renderTextLike(tb, tb.format || "normal"));
                container.appendChild(p);
                }
            });

            return container;
            },

            iframe: (b) => {
            const container = document.createElement("div");
            container.className = "iframe-embed";

            if (b.fullPage) {
                container.classList.add("iframe-embed--full-page");
                container.dataset.fullPage = "true";
            }

            const iframe = document.createElement("iframe");
            let src = b.src || "";
            if (src && !src.startsWith("http")) src = "https://" + src;
            iframe.src = src;
            iframe.title = b.title || "Embedded lesson resource";

            if (b.width !== undefined) iframe.style.width = `${Number(b.width) * 100}%`;
            else iframe.style.width = "100%";

            iframe.style.height = b.fullPage ? "100%" : "400px";
            iframe.style.border = "none";
            iframe.style.display = "block";
            iframe.style.margin = "0 auto";
            iframe.setAttribute("loading", "lazy");

            if (b.openInNewTab) {
                const toolbar = document.createElement("div");
                toolbar.className = "iframe-embed__toolbar";
                const link = document.createElement("a");
                link.className = "iframe-embed__open-link";
                link.href = src;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = b.openLabel || `Open ${iframe.title} in a new tab`;
                toolbar.appendChild(link);
                container.appendChild(toolbar);
            }

            container.appendChild(iframe);
            return container;
            },

            "3d-model": (b) => {
                const canvas = document.createElement("canvas");

                const canvasId = b.name || `rotator-${Math.random().toString(36).slice(2)}`;
                canvas.id = canvasId;
                canvas.setAttribute("role", "img");
                canvas.setAttribute("aria-label", b.title || "Molecular structure");

                canvas.style.display = "block";
                canvas.style.margin = "0 auto";
                canvas.style.width = b.width !== undefined ? `${Number(b.width) * 100}%` : "100%";
                canvas.style.height = `${Number(b.height || 0.3) * 1000}px`;

                requestAnimationFrame(async () => {

                    if (!ChemDoodle) {
                    console.error("ChemDoodle not loaded");
                    return;
                    }

                    if (!b.src) {
                    console.error("3d-model missing src");
                    return;
                    }

                    try {
                    const cleanSrc = b.src.replace(/^public\//, "");
                    const res = await fetch(process.env.BASE_URL + cleanSrc);
                    const molText = await res.text();

                    console.log(molText)

                    const viewer = new ChemDoodle.TransformCanvas3D(canvasId, 250, 250);
                    viewer.styles.backgroundColor = b.background_color || "black";
                    viewer.styles.atoms_useJMOLColors = true;
                    viewer.styles.bonds_color = "#CCCCCC"
                    viewer.styles.set3DRepresentation("Ball and Stick");
                    // nicer rendering
                    const molecule = ChemDoodle.readMOL(molText, 1);

                    viewer.loadMolecule(molecule);
                    viewer.repaint();

                    } catch (err) {
                    console.error("Failed to load MOL file:", err);
                    }
                });

                return canvas;
            },

            link: (b) => {
                let link = document.createElement("a");
                link.width = "100%"
                link.setAttribute("href", b.src);
                link.setAttribute("target", "_blank");
                link.setAttribute("rel", "noopener noreferrer");
                link.appendChild(renderTextLike(b.content ?? "", "normal"));
                return link;
            }
        };

        const renderBlock = (block) => {
            if (!block || typeof block !== "object") return document.createTextNode("");
            const fn = blockRenderers[block.type];
            if (!fn) {
                const warning = document.createElement("p");
                warning.setAttribute("role", "alert");
                warning.textContent = "Unsupported content block: " + block.type;
                return warning;
            }
            return fn(block);
        };

        // ---------- mount logic ----------
        const slide = document.getElementById("slide");
        const unit = this.units[this.selectedUnit];
        if (!slide || !unit || !Array.isArray(unit.content)) return;


        // Create first page
        const pageDiv = document.createElement("div");
        pageDiv.id = "1";
        pageDiv.className = "page";
        slide.appendChild(pageDiv);

        let pageEl = pageDiv;

        const blocks = Array.isArray(unit.content) ? unit.content : [];
        const plainText = content => Array.isArray(content)
            ? content.map(run => run?.text ?? run?.content ?? "").join("")
            : String(content ?? "");

        blocks.forEach((block, index) => {
            const blockElement = renderBlock(block);
            const fullPage = blockElement.dataset?.fullPage === "true";

            if (fullPage && pageEl.childNodes.length) {
                pageEl = this.createNewPage(pageEl);
            }

            if (blockElement.dataset && block?.type === "text") {
                const label = plainText(block.content).trim();
                if (/^(Figure|Video)\s+\d+\s*[.:]/i.test(label)) {
                    blockElement.dataset.keepWithPrevious = "true";
                }
                if (/^Table\s+\d+\s*[.:]/i.test(label)) {
                    blockElement.dataset.keepWithNext = "true";
                }
            }

            pageEl.appendChild(blockElement);

            if (fullPage) {
                if (index < blocks.length - 1) pageEl = this.createNewPage(pageEl);
                return;
            }

            if (this.isOverflow(pageEl)) {
                const moveGroup = this.paginationMoveGroup(pageEl, blockElement);
                if (pageEl.childNodes.length > moveGroup.length) {
                    moveGroup.forEach(node => pageEl.removeChild(node));
                    pageEl = this.createNewPage(pageEl);
                    moveGroup.forEach(node => pageEl.appendChild(node));
                }
            }
        });

        if (parseInt(pageEl.id, 10) % 2 !== 0) {
            this.createNewPage(pageEl);
        }

        const repaginateAfterLayout = () => {
            if (!this["$el"]?.isConnected) return;
            this.scheduleRepagination();
        };

        Array.from(slide.querySelectorAll("img, video")).forEach(media => {
            const ready = media.tagName === "IMG"
                ? media.complete
                : media.readyState >= 1;
            if (ready) return;

            const eventName = media.tagName === "IMG" ? "load" : "loadedmetadata";
            media.addEventListener(eventName, repaginateAfterLayout, { once: true });
            media.addEventListener("error", repaginateAfterLayout, { once: true });
        });

        this.scheduleRepagination();

        if (document.fonts?.ready) {
            Promise.resolve(document.fonts.ready).then(repaginateAfterLayout);
        }
        },


        created() {
            this.onSlideKeydown = (event) => {
                if (event.key === "Escape" && this.lightboxOpen) {
                    this.closeImageLightbox();
                    return;
                }
                if (this.lightboxOpen) return;
                if (event.which === 37) this.previous();
                if (event.which === 39) this.next();
            };
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.resizeAdjust);
            document.addEventListener('keydown', this.onSlideKeydown);
        },

        beforeUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('resize', this.resizeAdjust);
            document.removeEventListener('keydown', this.onSlideKeydown);
            window.clearTimeout(this.repaginationTimer);
            window.cancelAnimationFrame(this.repaginationFrame);
        },

        methods: {
            openImageLightbox(src, alt, returnFocus) {
                this.lightboxSrc = src;
                this.lightboxAlt = alt || "";
                this.lightboxZoom = 1;
                this.lightboxReturnFocus = returnFocus || null;
                this.lightboxOpen = true;
                this["\u0024nextTick"](() => {
                    if (this["\u0024refs"].lightboxDialog) this["\u0024refs"].lightboxDialog.focus();
                });
            },

            closeImageLightbox() {
                const returnFocus = this.lightboxReturnFocus;
                this.lightboxOpen = false;
                this.lightboxReturnFocus = null;
                this["\u0024nextTick"](() => {
                    if (returnFocus && typeof returnFocus.focus === "function") returnFocus.focus();
                });
            },

            adjustImageZoom(delta) {
                this.lightboxZoom = Math.min(4, Math.max(0.5,
                    Number((this.lightboxZoom + delta).toFixed(2))
                ));
            },

            resetImageZoom() {
                this.lightboxZoom = 1;
            },

            handleLightboxWheel(event) {
                if (!event.ctrlKey && !event.metaKey) return;
                event.preventDefault();
                this.adjustImageZoom(event.deltaY < 0 ? 0.25 : -0.25);
            },

            scheduleRepagination() {
                window.clearTimeout(this.repaginationTimer);
                window.cancelAnimationFrame(this.repaginationFrame);
                this.repaginationTimer = window.setTimeout(() => {
                    this["$nextTick"](() => {
                        this.repaginationFrame = window.requestAnimationFrame(() => {
                            this.repaginationFrame = window.requestAnimationFrame(() => {
                                this.repaginationFrame = null;
                                if (this["$el"]?.isConnected) this.repaginatePages();
                            });
                        });
                    });
                }, 40);
            },

            // Check if page overflows
            isOverflow(element) {
                return element.scrollHeight - element.clientHeight > 1;
            },

            paginationMoveGroup(page, block) {
                const group = [block];
                const previous = block.previousElementSibling;
                const keepTogether = block.dataset?.keepWithPrevious === "true"
                    || previous?.dataset?.keepWithNext === "true";
                if (keepTogether && previous && previous.parentNode === page) {
                    group.unshift(previous);
                }
                return group;
            },

            repaginatePages() {
                const slide = this["$el"]?.querySelector("#slide");
                if (!slide) return;

                const oldPages = Array.from(slide.children)
                    .filter(element => element.classList.contains("page"));
                const blocks = oldPages.flatMap(page => Array.from(page.childNodes));
                if (!blocks.length) return;

                oldPages.forEach(page => page.remove());

                const pages = [];
                const addPage = () => {
                    const page = document.createElement("div");
                    page.id = String(pages.length + 1);
                    page.className = "page";
                    pages.push(page);
                    slide.appendChild(page);
                    return page;
                };

                let currentPage = addPage();
                blocks.forEach(block => {
                    if (!currentPage) currentPage = addPage();
                    const fullPage = block.dataset?.fullPage === "true";

                    if (fullPage && currentPage.childNodes.length) {
                        currentPage = addPage();
                    }

                    currentPage.appendChild(block);

                    if (fullPage) {
                        currentPage = null;
                        return;
                    }

                    if (this.isOverflow(currentPage)) {
                        const moveGroup = this.paginationMoveGroup(currentPage, block);
                        if (currentPage.childNodes.length > moveGroup.length) {
                            moveGroup.forEach(node => currentPage.removeChild(node));
                            currentPage = addPage();
                            moveGroup.forEach(node => currentPage.appendChild(node));
                        }
                    }
                });

                if (pages.length % 2 !== 0) addPage();

                const pagesPerView =
                    window.innerWidth >= window.innerHeight && window.innerWidth > 600 ? 2 : 1;
                const maxCount = Math.max(0, Math.ceil(pages.length / pagesPerView) - 1);
                this.count = Math.min(this.count, maxCount);
                this.scroll("auto");
                this.handleScroll();
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
                this.scheduleRepagination();
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
                const slide = document.getElementById("slide");
                const progressBar = document.getElementById("myBar");
                if (!slide || !progressBar || pageArr.length < 2) return;
                var totalWidth = slide.offsetWidth;
                var denominator = (window.innerWidth <= window.innerHeight) ? pageArr.length - 1 : pageArr.length / 2 - 1;
                var scrolled = denominator > 0 ? totalWidth / denominator : 0;
                progressBar.style.width = scrolled*this.count + "px";
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
            scroll(position = "auto") {
                const slide = document.getElementById("slide");
                const pages = Array.from(slide?.querySelectorAll(".page") || []);
                if (!slide || !pages.length) return;

                const pagesPerView =
                    window.innerWidth >= window.innerHeight && window.innerWidth > 600 ? 2 : 1;
                const targetIndex = Math.min(this.count * pagesPerView, pages.length - 1);
                const targetPage = pages[targetIndex];
                const left =
                    targetPage.getBoundingClientRect().left
                    - slide.getBoundingClientRect().left
                    + slide.scrollLeft;

                slide.scrollTo({
                    left: Math.round(left),
                    top: 0,
                    behavior: "auto"
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
  overflow-x: hidden;
  overflow-y: hidden;
  align-items: flex-start;
  text-indent: 2%;
  scroll-snap-type: x mandatory;
}

#slide > div {
  padding: 2%;
  min-width: 0;
  flex: 0 0 50%;
  height: 100%;
  min-height: 400px;
  padding-right: 2%;
  padding-left:2%;
  box-sizing: border-box;
  background-color: aliceblue;
  text-align: left;
  margin:0;
  overflow-y: scroll !important;
  -ms-overflow-style: auto;
  scrollbar-width: auto;
  scroll-snap-align: start;
  
  }

  #slide > .page > p, ul, ol {
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
      min-width: 0;
      flex-basis: 100%;
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

<style src="@/views/units/contentBlocks.css"></style>
