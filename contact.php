<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>
	<!-- Basic Page Needs
	================================================== -->
	<meta charset="utf-8">
	<title>Lance Laughlin - New Media Developer</title>
	<meta name="description" content="">
	<meta name="author" content="">
	<!-- Mobile Specific Metas
	================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<!-- CSS
	================================================== -->
	<link rel="stylesheet" href="stylesheets/base.css">
	<link rel="stylesheet" href="stylesheets/skeleton.css">
	<link rel="stylesheet" href="stylesheets/styles.css">


	<!-- FONTS
	================================================== -->
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	</head>
	<body>
		<!-- Primary Page Layout
		================================================== -->
		<!-- Delete everything in this .container and get started on your own site! -->
		<div class="row" id="nav-back">
			<div class="container">
				<div id="nav" class="sixteen columns">
					<ul>
						<li><a href="index.html">Portfolio</a></li>
						<li><a href="resumeLance.pdf" target="_blank">Resume</a></li>
						<li><a href="http://www.github.com/explosivehippo" target="_blank">Github</a></li>
						<li><a href="http://explosivehippo.wordpress.com/" target="_blank">Blog</li>
						<li><a href="contact.php">Contact</a></li>
					</ul>
				</div>
				</div><!-- container -->
			</div>
			<div class="row" id="hero-back">
				<div class="container">
					<div class="eight columns" id="hero">
						<h1>Lance Laughlin</h1>
						<h2>New Media Developer</h2>
						<div id="hero-about">
							<p>RIT Senior Studying New Media Interactive Development.</p>
							<p>Active Contributor to the Open-Source Community.</p>
							<p>Primary Focus: Front-End & Back-End Web Development.</p>
							<p>Currently Residing in Rochester, NY. Willing to relocate.</p>
						</div>
					</div>
					<div class="eight columns ">
						<img src="images/lance.jpg" id="hero-picture"/>
					</div>
					</div><!-- container -->
			</div>
			<div class="container" id="work-layout">
				<div class="row">
					<div class="eight columns">
						<h1>Message Me</h1>

						<?php
						    $name = $_POST['name'];
						    $email = $_POST['email'];
						    $message = $_POST['message'];
						    $from = 'lancealaughlin.com contact form'; 
						    $to = 'lancealaughlin@gmail.com'; 
						    $subject = 'Message from lancealaughlin.com';
						    $human = $_POST['human'];
									
						    $body = "From: $name\n E-Mail: $email\n Message:\n $message";
										
						    if ($_POST['submit'] && $human == '4') {				 
						        if (mail ($to, $subject, $body, $from)) { 
							    echo '<p class="green">Your message has been sent!</p>';
							} else { 
							    echo '<p class="red">Something went wrong, go back and try again!</p>'; 
							} 
						    } else if ($_POST['submit'] && $human != '4') {
							echo '<p class="red">You answered the anti-spam question incorrectly!</p>';
						    }
						?>
						<form method="post" action="contact.php">
						    <label>Name</label>
						    <input name="name" placeholder="Full Name Please">
						            
						    <label>Email</label>
						    <input name="email" type="email">
						            
						    <label>Message</label>
						    <textarea name="message" placeholder="What should we talk about?"></textarea>
						    <label>*What is 2+2? (Anti-spam)</label>
							<input name="human">
							<p>
						    	<input id="submit" name="submit" type="submit" value="Submit">
							</p>
						</form>
					</div>

					<div class="eight columns">
						<h1>Reach Me Elsewhere</h1>
						<div id="other-contacts">
							<h3>607-769-8729</h3>
							<h3><a href="http://www.linkedin.com/profile/view?id=115389019" target="_blank">Linkedin</a></h3>
							<h3><a href="http://www.twitter.com/LanceLaughlin" target="_blank">Twitter</h3>
						</div>
					</div>

				</div>
			</div>
			<div class="row" id="footer-back">
				<div class="container">
					<div class="eight columns">					
					</div>
					<div class="eight columns ">
					</div>
				</div><!-- container -->
			</div>
					
			<!-- End Document
			================================================== -->
			<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
			<script type="text/javascript" src="js/jquery.easing.min.js"></script>	
			<script type="text/javascript" src="js/jquery.quicksand.min.js"></script>
			<script type="text/javascript" src="js/jquery.sortportfolio.min.js"></script>
			<script type="text/javascript">
				$(document).ready(function(){
					$('#portfolio').filterPortfolio({
						initFilter: '#all', 
						itemUL: '#itemUL',
						sortOption: {
							easeIn: 'twirlIn',
							easeOut: 'twirlOut'
						}
					});			
				});
			</script>
	</body>
</html>