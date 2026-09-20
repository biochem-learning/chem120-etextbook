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
            <video id="media1" class="media" width="80%" controls>
                <source src="" type="video/mp4" showControl>
            </video>
            <div id="game1" class="game">
                <button style="position: fixed; right: 15%; top: 0; z-index: 10;" @click="closeIframe('game1')">X</button>
                <iframe src="http://jefhans4.github.io/IsomerGame/"></iframe>
            </div>
        
            <p class="title">
                Unit 2. More Structural Representations and Isomers
            </p>
            <div id="slide" v-if="!gridEnabled" @touchstart="touchStartMethod" @mousedown="mouseDownMethod" @keyup.left="next()">
                <div class="page" id="page1">
                    <p style="margin-top: 27px;" >
                        As with Lewis structures, in line structures we represent bonds with lines. However, in line
                        structures we don’t show all of the bonds. We leave out bonds to hydrogen atoms. Also, we don’t
                        write the symbol for carbon atoms.
                        I’ve said what we don’t write, what about what we do write? Basically we just write the
                        bonds between carbon atoms and any other non-hydrogen atoms. We generally write these bonds
                        in a zig-zag sort of way. It is a short hand notation so we have to understand what the short hand
                        means. When we draw a line, we understand that the line represents a bond so there must be
                        atoms at both ends of the bond. If another kind of atom isn’t specifically indicated we understand
                        the end of the line to be a carbon atom. If we write several lines (representing bonds) in a zig-zag
                        then the end of a line or a corner where two lines meet represent a carbon. Since we know that
                        carbon normally makes 4 bonds, we also understand that the number of hydrogen atoms bonded
                        to each carbon is 4 minus the number of bonds shown. If an atom other than carbon or hydrogen
                        is present we write its symbol at the end of a line or a corner where two lines meet and
                        understand that that atom is there instead of carbon. We don’t write hydrogens bonded to C but
                        usually write hydrogens bonded to other atoms.
                    </p>
                </div>
                <div class="page" id="page2">
                    <p>
                        <strong>What we will learn in this unit:</strong>
                        <ul list-style: disc outside none>
                            <li>Common bonding patterns in organic compounds.</li>
                            <li>Drawing Lewis structures.</li>
                            <li>Drawing condensed structures.</li>
                        </ul>
                    </p>
                    <p style="text-indent: 0%;">
                        Let’s see some examples.
                    </p>
                </div>
                <div class="page" id="page3" style="display: flex; flex-direction: column; align-items: center;">
                    <p><strong>Isomers</strong></p>
                    <p>
                        
                        Isomers are compounds with the same molecular formula but the atoms are connected
                        differently. Since one of our goals for this course is to begin to understand how organic
                        molecules are put together (we call this structure) and how structure affects properties and
                        reactivity, we need to develop a couple of skills. Understanding isomers will help us do that. One
                        skill we need is simply being able to see when two structures are the same or not. This sounds
                        trivial, but it isn’t necessarily. Especially as structures become more complex we will see that
                        there may be many ways to draw the same structure. 
                    </p>
                    <div style="background-color: rgb(255, 255, 130); margin: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 20%; width: 50%; border-radius: 10%; ">
                        <h3 style="color: black; text-align: center; width: 100%;">Isomer Game </h3> 
                        <button style="border-radius: 30%; border: none;" @click="openIframe('game1')">Play</button>
                    </div>
                </div>
                <div class="page" id="page4">
                </div>
            </div>
            <div class="progress-container">
                <div class="progress-bar" id="myBar"></div>
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            const script = document.createElement("script");
            script.src ='@/components/common.js';
            document.body.appendChild(script);
        },
    };
</script>

<style scoped src="@/components/style.css"></style>
<style scoped>

#game1 {
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
}
</style>