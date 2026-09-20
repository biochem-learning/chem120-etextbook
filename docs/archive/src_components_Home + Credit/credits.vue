<style scoped src="@/components/Home + Credit/style.css"></style>
<style scoped>
.body {
    background-image: linear-gradient(to top, rgba(64, 65, 46, 0.8), rgba(46, 49, 65, 0.8)), url('../../assets/background4.jpg');
}

/* Features */
.inner {
	flex-direction: column !important;
	width: 80% !important;
}
.major {
	text-align: center
}

p {
	text-align: start;
	margin: 0%;
}

#section-title1, 
#section-title2 {
	color: black !important;
	border-bottom: solid 1px black;
} 

#feature1, #feature2 {
	min-width: 100%;
	justify-content: center;
	display: -moz-flex;
	display: -webkit-flex;
	display: -ms-flex;
	display: flex;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	margin: 0 0 2em 0;
}

.features article {
	display: flex;
	overflow: visible;
	flex-direction: column;
	justify-items: center !important;
	padding: 1em 1em 3em 1em ;
	background-color: #353849;
	border-radius: 5px;
	margin: 1.5em 2em 1.5em 0;
	width: 20%;
}

.features article  img {
	margin-bottom: 1.5em;
	border-radius: 5px 5px 0 0 ;
	width: 100% !important;
}

@media screen and (max-width: 1031px) {
	.features article {
	width: 40%;
	}
}		

@media screen and (max-width: 736px) {
	#inner1, #inner2 {
		align-items: center;
		justify-content: center;
	}
	
	.features article .image {
		margin-bottom: 1.5em;
		margin-left: -1.5em;
		margin-top: -1.5em;
		width: calc(100% + 3em);
	}

}

@media screen and (max-width: 600px) {
	#banner{
		padding: 200px 0 !important;
	}
	.features article {

		margin: 0.875em 1.75em 0.875em 0;
		width: calc(50% - 0.875em - 1px);
	}

	.features {
		display: block;
	}

		.features article {
			width: 100%;
			margin: 0 0 2em 0 !important;
		}

}
		
#footer h2 {
    opacity: 1;
    border-bottom: solid 2px rgba(255, 255, 255, 0.125);
    font-size: 2.5em;
    margin-bottom: 0.8em;
    padding-bottom: 0.4em;
}

@media screen and (max-width: 980px) {

#footer {
	padding: 12em 3em 12.375em 3em ;
	margin-bottom: -4.75em;
}

#footer .inner {
	width: 100%;
}

}

@media screen and (max-width: 736px) {

#footer {
	padding: 6em 0 5.25em 0 ;
	margin-bottom: -2.5em;
}

#footer h2 {
	font-size: 1.5em;
}

#footer p {
	font-size: 0.8em;
}


}
</style>
<template>
  <div class="body">
    <!-- Page Wrapper -->
    <div id="page-wrapper">
    <!-- Banner -->
      <section id="banner">
        <div class="inner">
          <h2>Credit</h2>
          <p class="intro" id="text1" style="text-align: center;">
            Individuals that contributed to our project
          </p>
        </div>
      </section>

    <!-- Wrapper -->
    <section id="wrapper">
        <!-- One -->
		<section id="one" class="wrapper spotlight style1">
            <div class="inner" id="inner1">
              	<h2 class="major" id="section-title1">Website</h2>
				<p></p>
				<section class="features" id="feature1">
					<article>
						<img src="@/assets/Unknown_person.jpg" alt="" />
						<h3 class="major">Name</h3>
						<p>Class of 202?</p>
						<p>Major</p>
						<p><em>name@gmail.com</em></p>
					</article>
					<article>
						<img src="@/assets/Unknown_person.jpg" alt="" />
						<h3 class="major">Name</h3>
						<p>Class of 202?</p>
						<p>Major</p>
						<p><em>name@gmail.com</em></p>
					</article>
					<article>
						<img src="@/assets/Unknown_person.jpg" alt="" />
						<h3 class="major">Name</h3>
						<p>Class of 202?</p>
						<p>Major</p>
						<p><em>name@gmail.com</em></p>
					</article>
					<article>
						<img src="@/assets/Unknown_person.jpg" alt="" />
						<h3 class="major">Name</h3>
						<p>Class of 202?</p>
						<p>Major</p>
						<p><em>name@gmail.com</em></p>
					</article>
				</section>
            </div>
        </section>
		<!-- Two -->
        <section id="two" class="wrapper spotlight style2">
			<div class="inner" id="inner2">
				<h2 class="major" id="section-title2">3D Design</h2>
				<p></p>
				<section class="features"  id="feature2">
					<article>
						<img src="@/assets/Unknown_person.jpg" alt="" />
						<h3 class="major">Name</h3>
						<p>Class of 202?</p>
						<p>Major</p>
						<p><em>name@gmail.com</em></p>
					</article>
					<article>
						<img src="@/assets/Unknown_person.jpg" alt="" />
						<h3 class="major">Name</h3>
						<p>Class of 202?</p>
						<p>Major</p>
						<p><em>name@gmail.com</em></p>
					</article>
					<article>
						<img src="@/assets/Unknown_person.jpg" alt="" />
						<h3 class="major">Name</h3>
						<p>Class of 202?</p>
						<p>Major</p>
						<p><em>name@gmail.com</em></p>
					</article>
					<article>
						<img src="@/assets/Unknown_person.jpg" alt="" />
						<h3 class="major">Name</h3>
						<p>Class of 202?</p>
						<p>Major</p>
						<p><em>name@gmail.com</em></p>
					</article>
				</section>
			</div>
		</section>

		<!-- Footer -->
		<section id="footer">
			<div class="inner">
				<h2 class="major">Special thanks</h2>
				<ul class="copyright">
					<li>Copyright &copy;  2024 Dr. Jeffrey A. Hansen -  All Rights Reserved.</li><li>Template: <a href="http://html5up.net">HTML5 UP</a></li>
				</ul>
			</div>
		</section>
      </section>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
</style>
