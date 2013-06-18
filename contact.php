<!DOCTYPE html>
<html lang="en">
<head>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type">	
	<meta name="description" content="B &amp; W Meet is a Bournemouth-based pub meet for digital creatives. Fit the bill&#63; Join Us.">
	<title>Contact B &amp; W Meet | A meet for like-minded digital creatives.</title>
	<link href="css/style.css" rel="stylesheet">
	<link rel="shortcut icon" href="favicon.ico">
	<meta name="viewport" content="initial-scale=1.0">
</head>
<body>
	<div id="content">
		<nav>
		<div class="ribbonLeft"></div><div class="ribbonRight"></div>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="about">About</a></li>
				<li><a href="bwmeetten">&#35;BWMeet10</a></li>
				<li><a href="photos">Photos</a></li>
				<li><a href="contact">Contact</a></li>
			</ul>
		</nav>		
		<h2>Send Us A Message</h2>
		<section id="mailer">
			<form method="post" name="member" id="theFormBit" action="mailIt.php" onsubmit="return validateForm()"> 
				<input type="text" name="realname" size="20" placeholder="Name" required><br>
				<input type="text" name="subject" size="20" placeholder="Subject" required ><br>
				<input type="email" name="senderemail" size="20" placeholder="Your Email" required ><br>
				<textarea rows="8" name="message" placeholder="What's up?" cols="35" required ></textarea><br>
				<input type="submit" name="submit" value="Send Message" class="btn primary">
			</form>
			<p>Hey There!<br>We always love to chat and answer questions, so shoot us a message and we'll always do our best to get back to you :)</p>	
		</section>
		
			<?
			if (isset($_GET['message']) && ($_GET['message'] == "sent")){
				echo "<div class=\"dialogue med-box\"><strong>Great Success!</strong><br>Thanks!<br>That was a tasty message :D</div>" ;
			} else if ($_GET['message'] == "failed"){
				echo "<div class=\"dialogue med-box\">Sorry, There was an error, we're working on it.</div>" ;
			}
		?>
		
		<footer>
			<p>B &amp; W Meet is brought to you by <a href="http://fetimo.com">Tim Stone</a> and <a href="https://twitter.com/#!/seanmtracey">Sean Tracey</a>. <q>Stay hungry, stay foolish.</q></p>
		</footer>
	</div><!--Ends content div-->
	
	<!--Javascript Files-->
	<script src="js/core.js"></script>
	<script src="js/libs/jquery.js"></script>
	<script>
	$(document).ready(function() {
		setTimeout(hideDialogue, 4000);
	});
	
	function hideDialogue(){	
		$('.dialogue').hide("fast");
	}
	</script>
	<script>
    var _gaq=[['_setAccount','UA-11418004-2'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
	</script>
</body>
</html>
