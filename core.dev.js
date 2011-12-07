$(document).ready(function() {
	loadMap();
	$("#top img").hide();
	minimalView();
});

function loadMap(){
	
	
	var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/b9ea2c961c4849ad8a81d9a0e968cb39/22677/256/{z}/{x}/{y}.png',
    	//cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
		minimal = new L.TileLayer(cloudmadeUrl, {maxZoom: 18}, {styleId: 22677}),
		venue = new L.LatLng(50.720903, -1.871071),
		BwIcon = L.Icon.extend({
		    iconUrl: 'marker-images/marker.png',
		    shadowUrl: 'marker-images/marker-shadow.png',
		    iconSize: new L.Point(89, 50),
		    shadowSize: new L.Point(117, 50),
		    iconAnchor: new L.Point(22, 94),
		    popupAnchor: new L.Point(-3, -76)
		}),
		icon = new BwIcon(),
		marker = new L.Marker(new L.LatLng(50.720903, -1.879971), {icon: icon}),
		map = new L.Map('map', {
			layers: [minimal]
		});
	
	map.setView(venue, 15).addLayer(minimal);
	map.addLayer(marker);

	setTimeout("addMapOverlay()", 300);
}

function centerMap(point) {
	map.setCenter(point);
}

function addMapOverlay(){
	$("#map").append("<section id='mapinfo'><section class='info-box'><h3>Where?</h3><p>1st November<br>19:30<br>The Slug and <wbr> Lettuce<br>Bournemouth<br>BH2 6DT</p></section></section>");
	$("#mapinfo").hide();
	$('#mapinfo').fadeIn('slow');
}

$(window).scroll( function() {
	if($(window).scrollTop() > 300) {
		$('#top img').fadeIn('slow');
		$('#top img').css('margin-left:5px');
	} else {
		$('#top img').fadeOut(200);
    }
});

$(window).resize(function() {
	minimalView();
});

function minimalView() {
	if ($(window).width() < 400){
		if ($("#outermap").html() == ""){
			$("#outermap").append("<h3>Where?</h3><p>1st November<br>19:30<br>The Slug and Lettuce<br>Bournemouth<br>BH2 6DT</p>");
		}
		centerMap(new google.maps.LatLng(50.720903, -1.879971));
	} else {
		$("#outermap").html("");
	}
}