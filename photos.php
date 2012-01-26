<?php session_start(); 
require_once 'header.php'; ?>
		<header>
			<!--<img src="images/logo.png" alt="The B &amp; W Meet Logo">-->
			<section>
				<p>Peruse images of happier times. It's like being taken by the hand of the ghost of B &amp; W Meet past.</p>
			</section>
		</header>
		<section>
				<?php 
				//unset($_SESSION['pictures']); //for debugging
				if (!isset($_SESSION['pictures'])) {
					$request = simplexml_load_file('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad28dea2b7d8e33ff6becb22475b4781&tags=bwmeet&per_page=12');
					$pictures = Array();
					foreach ($request->photos->photo as $photo) {
						$info = simplexml_load_file('http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=ad28dea2b7d8e33ff6becb22475b4781&photo_id='.$photo[id]);
						$square_url = simplexml_load_file('http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ad28dea2b7d8e33ff6becb22475b4781&photo_id='.$photo[id]);
						array_push($pictures, '<a href="'.$square_url->sizes->size[3][url].'"><img src="'.$square_url->sizes->size[2][source].'" alt="'.$photo[description].'" title="'.$photo[title].'" class="flickr"></a>');
					}
					
					$_SESSION['pictures'] = serialize($pictures);
				}
				
				$pictures = unserialize($_SESSION['pictures']);
				
				foreach($pictures as $pic) {
					echo $pic;
				}				
			?>
		</section>
		<section class="info-box">
			<h3>Sponsors</h3>
				<!--<a href="http://www.campaignmonitor.com/"><img src="images/cm_logo.jpg" alt="The logo for Campaign Monitor, our lovely sponsor." class="sponsor"></a>-->
			<a href="http://www.vealhost.com/"><img src="images/vealhost.gif" alt="Vealhost's logo, our lovely sponsor." class="sponsor"></a>
		</section>
		<footer>
			<p>B &amp; W Meet is brought to you by <a href="http://fetimo.com">Tim Stone</a> and <a href="https://twitter.com/#!/seanmtracey">Sean Tracey</a>. Logo design by <a href="http://oledean.com/">Ole Dean</a>. <q>Stay hungry, stay foolish.</q></p>
		</footer>
	</div><!--Ends content div-->	
	<script src="lib/jquery.js"></script>
	<script src="core.js"></script>
<?php require_once 'footer.php'; ?>