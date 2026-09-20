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

            <img id="media2" class="media" width="80%" src=""> 

            <img id="media3" class="media" width="40%" src="">

            <img id="media4" class="media" width="40%" src="">

            <img id="media5" class="media" width="80%" src="">

            <img id="media6" class="media" width="80%" src="">

            <img id="media7" class="media" width="80%" src="">

            <img id="media8" class="media" width="80%" src="">

            <img id="media9" class="media" width="80%" src="">

            <p class="title">
                Unit 3. Types of Hydrocarbons and Beginning Nomenclature
            </p>
            <div id="slide" v-if="!gridEnabled" @touchstart="touchStartMethod" @mousedown="mouseDownMethod" @keyup.left="next()" @click="isElementXPercentInViewport">
                <div class="page" id="page1">
                    <p>
                        <strong>What we will learn in this unit:</strong>
                        <ul list-style: disc outside none>
                            <li>Alkanes, Alkenes, and Alkynes</li>
                            <li>A systematic approach to naming hydrocarbons</li>
                        </ul>
                    </p>
                    <p><strong>Types of Hydrocarbons</strong></p>
                    <p style="margin-top: 27px;" >
                        As the name implies, hydrocarbons are compounds made from only hydrogen and carbon.
                        As the name implies, hydrocarbons are compounds made from only hydrogen and carbon.
                        While this may sound kind of simple, and maybe a little boring, hydrocarbons are actually an
                        interesting and important class of compounds. They make up the bulk of crude oil, which is
                        refined into gasoline, diesel fuel, jet fuel, and from which many of the chemicals used in
                        chemical research are derived. Many plastics are also hydrocarbons including high-density
                        polyethylene (2), low-density polyethylene (4), polypropylene (5), and polystyrene (6). The
                        number of different hydrocarbon compounds is literally more than the number of stars in the sky.While this may sound kind of simple, and maybe a little boring, hydrocarbons are actually an
                        interesting and important class of compounds. They make up the bulk of crude oil, which is
                        refined into gasoline, diesel fuel,
                    </p>
                </div>
                <div class="page" id="page2">
                    <p style="text-indent: 0%;">
                        jet fuel, and from which many of the chemicals used in
                        chemical research are derived. Many plastics are also hydrocarbons including high-density
                        polyethylene (2), low-density polyethylene (4), polypropylene (5), and polystyrene (6). The
                        number of different hydrocarbon compounds is literally more than the number of stars in the sky.
                    </p>
                    <p>
                        We can categorize hydrocarbons in a number of useful ways. For now we are going to talk
                        about 3 types of hydrocarbons. They are alkanes, alkenes, and alkynes. Alkanes are compounds
                        of carbon and hydrogen that contain only single bonds. Alkenes are hydrocarbons that contain
                        one or more carbon to carbon double bonds. Alkenes may also have some carbon to carbon
                        single bonds. In other words, it is not necessary for there to be only carbon to carbon double
                        bonds for a compound to be considered an alkene. Alkynes are like alkenes except they have at
                        least one carbon to carbon triple bond instead of double bonds.
                    </p>
                </div>
                <div class="page" id="page3">
                    <p><strong>Nomenclature</strong></p>
                    <p>
                        Remember when we were learning to draw all the isomers for a given formula? We
                        emphasized starting by drawing the longest possible chain of carbons. The longest chain of
                        carbons is also going to be a focus for us in the systematic naming of compounds. In organic
                        chemistry the name of a compound and its structure go together. The name has meaning; it tells
                        us what the structure is. Often this is very useful though it can also be very cumbersome. In order
                        for the name to tell us about the structure it often must be a long name. Think about it this way: if
                        your name had to describe to people all they need to know to understand who you are it would be
                        a very long name! Let's consider an example. Likely many of us are familiar with ibuprofen,
                        which is also known as Advil, Midol, Motrin, and several other names. If I say I took some
                        ibuprofen you would probably understand that I had a headache or some other pain, and I took
                        the ibuprofen to relieve that pain. In that way, the name tells us something important about what
                        it is. However, a chemist might very well want to know more about ibuprofen than that name can
                        tell us. Chemists are interested in the structure of the compound because the structure tells us
                        much that can help 
                    </p>
                </div>
                <div class="page" id="page4">
                    <p style="text-indent: 0%;">
                        us understand how ibuprofen interacts with the body and produces its pain
                        relieving effect. So chemists might use the name (RS)-2-[4-(2-methylpropyl)phenyl]propanoic
                        acid. Quite a long and complicated name, to be sure, but to someone trained in organic chemistry
                        it allows us to write the structure and from that understand quite a bit about ibuprofen.
                    </p>
                    <p>
                        We’ll start with nomenclature
                        in the simplest way. The first thing we look for when naming
                        an organic compound is the longest chain osr ring of carbon
                        atoms. Knowing this provides what we call the parent name of
                        the compound. Now that we know what alkanes, alkenes, and
                        alkynes are we can start by naming alkanes. The end of the
                        name is going to be “ane.”  Before that we’ll put a prefix to
                        indicate the length of the longest carbon chain. So, for example,
                        the compound with 5 carbons in a chain is called pentane – pent to
                        indicate 5 carbons and ane to indicate it is an alkane. Unfortunately, all of the prefixes we used to
                        indicate chain length are not as easy to remember as pent. The hardest are the first four as you
                        can see in this table.
                    </p>
                    <p>
                        Finding the longest chain of carbon atoms seems like an easy enough thing to do.
                        Unfortunately it isn’t always so easy. If the compounds were always 
                    </p>
                </div>
                <div class="page" id="page5">
                    <p style="text-indent: 0%;">
                        drawn in the nice zig-zag
                        way you see in the table, it would be rather simple, but they aren’t always drawn so. You can see
                        here several examples of different ways a 10-carbon chain could be written. More on this in a bit.
                    </p>
                    <p>
                        As we have seen, organic compounds are not just simple, straight chains of carbon atoms.
                        Let's take the isomers of C5H12 as an example. You see that in addition to just having a 5-carbon
                        chain, we can also have a 4-carbon chain with a 1-carbon branch or a 3-carbon chain with two 1-
                        carbon branches. In the case of the 4-carbon chain with a 1-carbon branch we start naming it
                        with the longest carbon chain, which would be called butane. Next we would have to include
                        something in the name to indicate the 1-carbon branch. Since it has 1 carbon we’ll start with
                        meth. When it is a branch, or more often we will call it a substituent, we put “yl” after meth to
                        make methyl. A “yl” always indicates that bit of the molecule is a substituent or part of the
                        whole. Now, in this case there is only one possible place to put that methyl substituent along the
                        4-carbon chain, as we learned when studying isomers. That won’t always be the case when we
                        get to more complicated molecules. To make sure it is clear where the substituent is we assign
                        numbers to all the carbons in the longest chain. Then we can identify where the substituent is by number.
                    </p>
                </div>
                <div class="page" id="page6">
                    <p style="text-indent: 0%;"> 
                        While it may seem natural that we numbered the chain from left to right. We wouldn’t
                        necessarily have to do it that way. It matters which end of the chain we start numbering from. In
                        this case, the compound is called 2-methylbutane, but if we numbered right to left it would be
                        called 3-methylbutane. Or if we drew it differently and numbered left to right we might also call If you have read “The Lord of the Rings” you might
                        remember a strange folk called Ents. Naming things in organic chemistry is something like naming things in Old Entish, the language of the Ents.
                        “I am not going to tell you my name, not yet at any rate.’ A queer half-knowing, half-humorous look came with a green fl
                        it 3-methylbutane. Having more than one possible name would be confusing so we always
                        number the carbon chain from the end closest to a substituent. That way there is almost always
                        just one name for the compound. Organic chemists don’t like ambiguity in names.
                    </p>
                    <p>
                        Now for the isomer with a 3-carbon chain and two methyl substituents. Because there are two
                        methyl groups we include a di when naming the methyl groups. We also include a number for
                        each methyl group to indicate where it is. The name of this compound is 2,2-dimethylpropane.
                        Now a word about commas and dashes. Notice we put a comma between the two 
                    </p>
                </div>
                <div class="page" id="page7">
                    <p style="text-indent: 0%;">
                        numbers. That is how it is done. Commas come between twonumbers. On the other hand, dashes come between
                        a number and a name. With only a few exceptions, which we will talk about later, there are no
                        spaces in the name. One more thing – we put all the substituent names in alphabetical order
                        within the name of the compound.
                    </p>
                    <p>
                        We now have the beginnings of a process to assign a name to a compound.
                    </p>
                    <ol list-style: disc outside none>
                        <li>Identify the longest chain of carbon atoms. This provides the parent name of the
                            compound.</li>
                        <li>Figure out which end of the chain is closest to a substituent.</li>
                        <li>Number the chain starting from the end closest to a substituent.</li>
                        <li>Name each substituent including a number along the chain to indicate where it is.</li>
                        <li>Write out the name by writing each substituent name in alphabetical order (ignore di, tri,
                            tetra, etc.) preceded by the number indicating its position then write the parent name.</li>
                    </ol>
                    <div style="width: 70%; height: 25vh; margin-left: auto; margin-right: auto; overflow: hidden;">
                        <h6>Animation: Two people sharing soda?</h6>
                        <div class="hover-container">
                            <img src="@/assets/Unit1-ScreenshotOfTwoPeopleSharingSoda.png"  style="width: 40%; height: 19vh; cursor: pointer;" @click="playVideo('overlay'); playVideo('media1')" >
                        </div>
                    </div>
                </div>
                <div class="page" id="page8">
                    <p>
                        To name alkenes or alkynes we need to add four things to this process.
                    </p>
                    <ol list-style: disc outside none>
                        <li>We must change the parent name using ene at the end to indicate an alkene and yne at the
                            end to indicate an alkyne.</li>
                        <li>We must change how we identify and number the longest chain. First of all, the longest
                            chain must include both atoms of the double or triple bond, even if there is a longer carbon
                            chain not including those atoms.</li>
                        <li>We must start numbering the chain from the chain closest to the double or triple bond.</li>
                        <li>We must include a number in the name to indicate where the double or triple bond is.</li>
                    </ol>              
                    <p>
                        The number indicating where the double or triple bond is goes either before the parent name
                        or in the middle of the parent name right before ene or yne. As before, we put a dash between
                        this number and the rest of the name.
                    </p>
                    <div style="width: 70%; height: 25vh; margin-left: auto; margin-right: auto; overflow: hidden;">
                        <h6>Animation: Two people sharing soda?</h6>
                        <div class="hover-container">
                            <img src="@/assets/Unit1-ScreenshotOfTwoPeopleSharingSoda.png"  style="width: 40%; height: 19vh; cursor: pointer;" @click="playVideo('overlay'); playVideo('media1')" >
                        </div>
                    </div>
                </div>
                <div class="page" id="page9">
                    <p>
                        As we have seen, some organic compounds contain rings. When a compound contains a ring
                        there are two possibilities for how it must be named. Either the ring will be the parent or the ring
                        will be a substituent. The ring will never be part of a chain of carbons. The ring will be the parent
                        if it has more carbon atoms then any carbon chain in the rest of the molecule. The ring will be a
                        substituent if it has fewer carbons than a chain in the rest of the molecule or if the chain contains
                        a double or triple bond but the ring does not. To name the ring we simply put cyclo in front. So a
                        ring of 5 carbons is cyclopentane. If a 5-carbon ring is connected to a chain longer than 5
                        carbons it is called cyclopentyl. Numbering with rings can get a bit tricky. Watch the video
                        carefully to see how to handle this.
                    </p>
                    <div style="width: 70%; height: 25vh; margin-left: auto; margin-right: auto; overflow: hidden;">
                        <h6>Animation: Two people sharing soda?</h6>
                        <div class="hover-container">
                            <img src="@/assets/Unit1-ScreenshotOfTwoPeopleSharingSoda.png"  style="width: 40%; height: 19vh; cursor: pointer;" @click="playVideo('overlay'); playVideo('media1')" >
                        </div>
                    </div>
                </div>
                <div class="page" id="page10">

                </div>
            </div>
            <div class="progress-container">
                <div class="progress-bar" id="myBar"></div>
            </div> 
        </div>
    </div>
</template>

<script src='@/components/common.js'></script>
<style scoped src="@/components/style.css"></style>