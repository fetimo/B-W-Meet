$(document).ready(function() {
	$("#top img").hide();
	window.scrollTo(0, 1);
	scrollCheck();
});

$(window).scroll( function() {
	scrollCheck();
});

function scrollCheck(){
	if ($(window).scrollTop() > 440 && $(window).width() > 665) {
		$('nav').css('position','fixed').css('top','0').css('left','0').css('z-index','10000000');
		if ($('.ribbonLeft').css('display') === 'block')  {
			$('.ribbonLeft').css('display','none');
			$('.ribbonRight').css('display','none');
		}
	} else if ($(window).scrollTop() < 440 && $(window).width() > 665){
		$('nav').css('position','static').css('top','0').css('left','0');
		if ($('.ribbonLeft').css('display') === 'none') {
			$('.ribbonLeft').css('display','block');
			$('.ribbonRight').css('display','block');
		}
    } else if ($(window).width() < 400){
    	$('nav').css('position','fixed').css('top','0').css('left','0').css('z-index','10000000').css('margin-top','0');
    	$('.ribbonLeft').css('display','none');
		$('.ribbonRight').css('display','none');
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
	var source = $("#htmlTemplate").html(),
		template = Handlebars.compile(source),
		theInfo = {date: "3rd April", time: "18:30", place: "The Slug and Lettuce<br>Bournemouth<br>BH2 6HT"};
	$('.eventInfo').html(template(theInfo));
}