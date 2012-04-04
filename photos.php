<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type">	
	<meta name="description" content="B &amp; W Meet is a Bournemouth-based pub meet for digital creatives. Fit the bill&#63; Join Us.">
	<title>B &amp; W Meet | A meet for like-minded digital creatives.</title>
	<link href="styles.css" rel="stylesheet">
	<link rel="shortcut icon" href="favicon.ico">
	<meta name="viewport" content="initial-scale=1.0">
</head>
<body>
	<div id="content">
		<nav>
			<div class="ribbonLeft"></div>
			<div class="ribbonRight"></div>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="about">About</a></li>
				<li><a href="photos">Photos</a></li>
				<li><a href="contact">Contact</a></li>
			</ul>
		</nav>
		
		<section class="photos">
			<h2>Photos</h2>
				<?php 
				//unset($_SESSION['pictures']); //uncomment this for debugging
				if (!isset($_SESSION['pictures'])) {
					$request = simplexml_load_file('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad28dea2b7d8e33ff6becb22475b4781&tags=bwmeet&per_page=24');
					$pictures = Array();
					foreach ($request->photos->photo as $photo) {
						$info = simplexml_load_file('http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=ad28dea2b7d8e33ff6becb22475b4781&photo_id='.$photo[id]);
						$square_url = simplexml_load_file('http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ad28dea2b7d8e33ff6becb22475b4781&photo_id='.$photo[id]);
						array_push($pictures, '<a href="'.$square_url->sizes->size[7][url].'"><img src="'.$square_url->sizes->size[1][source].'" alt="'.$photo[description].'" title="'.$photo[title].'" class="flickr"></a>');
					}
					
					$_SESSION['pictures'] = serialize($pictures);
				}
				
				if (!isset($pictures)) {
					$pictures = unserialize($_SESSION['pictures']);
				}
				
				foreach ($pictures as $pic) {
					echo $pic;
				}
			?>
		</section>
		<footer>
			<p>B &amp; W Meet is brought to you by <a href="http://fetimo.com">Tim Stone</a> and <a href="https://twitter.com/#!/seanmtracey">Sean Tracey</a>. <q>Stay hungry, stay foolish.</q></p>
		</footer>
	</div><!--Ends content div-->
	<script src="lib/jquery.js"></script>
	<script src="core.js"></script>
	<script>
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-11418004-2']);
		_gaq.push(['_trackPageview']);
		
		(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>	
</body>
</html>
