
document.addEventListener('DOMContentLoaded', function() {
	//document.getElementById('top').style.display = 'none';
	window.scrollTo(0, 1);
	scrollCheck();
});

function isModernBrowser() {
	return (
		'querySelector' in document &&
		'addEventListener' in document
	);
}

if (isModernBrowser()) {
	window.addEventListener('scroll', function() {
		scrollCheck();
	});
}

function scrollCheck(){
	
	var nav = document.querySelector('nav');
	if(document.getElementById('map') !== null){
		var mapDiv = document.getElementById('map');
	}

	if (window.scrollY > 410 && window.innerWidth > 665) {
		
		nav.style.position = 'fixed';
		nav.style.top = 0;
		nav.style.left = 0;
		nav.style.zIndex = 1000;
		if(mapDiv){
			mapDiv.style.marginTop = "60px";
		}

		if (document.querySelector('.ribbonLeft').style.display === 'block')  {
			document.querySelector('.ribbonLeft').style.display = 'none';
			document.querySelector('.ribbonRight').style.display = 'none';
		}

	} else if (window.scrollY < 400 && window.innerWidth > 665){
		
		document.querySelector('nav').style.position = 'static';
		
		if(mapDiv){
			mapDiv.style.marginTop = "0px";
		}

		if (document.querySelector('.ribbonLeft').style.display === 'none')  {
			document.querySelector('.ribbonLeft').style.display = 'block';
			document.querySelector('.ribbonRight').style.display = 'block';
		}

    } else if (window.innerWidth < 400){
		
		nav.style.position = 'fixed';
		nav.style.top = 0;
		nav.style.left = 0;
		nav.style.zIndex = 1000;
		nav.style.marginTop = 0;
		document.querySelector('.ribbonLeft').style.display = 'none';
		document.querySelector('.ribbonRight').style.display = 'none';
    
    }

}

/* Handlerbars stuff below 
 * ---QUICK BREAKDOWN---
 * The same divs that existed before to serve the responsive nature of the site still exist - as such, 
 * loading and animation behaviour remains unchanged. Now, instead of writing the code manually in 3 places, 
 * we adjust the JSON object found in the handleBarsGo() function named theInfo. When the page is loaded, 
 * the HTML will be generated from that JSON and placed in the 3 locations that the information is needed 
 * (the elements with the eventInfo CSS class) based on the template found in the index.html file script 
 * element with the htmlTemplate ID. Swish ;) The need for 3 divs will be removed in a future release - just 
 * need to get Google Maps to play nice...
 */

function setEventInfo(){

	var source = document.getElementById("mapInfoTemplate").innerHTML,
		template = Handlebars.compile(source),
		theInfo = {
			date: "25th June",
			time: "18:00",
			place: "The Slug and Lettuce<br>Bournemouth<br>BH2 6HT"
		};

	document.getElementsByClassName('eventInfo')[0].innerHTML = template(theInfo);

	var eventbriteLinks = document.querySelectorAll('a[href*="eventbrite"]');

	for (var i = 0, len = eventbriteLinks.length; i < len; i++) {
		eventbriteLinks[i].setAttribute('href', 'http://bwmeet10.eventbrite.co.uk/');
	}
}