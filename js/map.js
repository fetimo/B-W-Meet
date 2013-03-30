document.addEventListener('DOMContentLoaded', function() {
	map.init();
	recenterMap();
});

var map = (function() {
	var mapOptions = {
		zoom: 20,
		center: new google.maps.LatLng(50.720903, -1.871071),
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	function init() {
		var point = new google.maps.LatLng(50.720903, -1.879971);

		var image = new google.maps.MarkerImage(
			'images/marker.png',
			new google.maps.Size(89,50),
			new google.maps.Point(0,0),
			new google.maps.Point(45,50)
		);

		var shadow = new google.maps.MarkerImage(
			'images/marker-shadow.png',
			new google.maps.Size(117,50),
			new google.maps.Point(0,0),
			new google.maps.Point(45,50)
		);

		var shape = {
			coord: [87,0,87,1,87,2,87,3,87,4,86,5,86,6,86,7,86,8,85,9,85,10,85,11,84,12,84,13,84,14,84,15,83,16,83,17,83,18,82,19,82,20,82,21,82,22,81,23,81,24,81,25,80,26,80,27,80,28,79,29,77,30,79,33,88,34,88,35,86,36,85,37,84,38,83,39,81,40,83,41,85,42,87,43,88,44,88,45,58,47,60,48,60,49,29,49,29,48,29,47,1,45,1,44,3,43,4,42,6,41,8,40,7,39,5,38,4,37,3,36,1,35,1,34,1,33,32,30,0,29,0,28,0,27,0,26,0,25,0,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,0,2,0,1,0,0,87,0],
			type: 'poly'
		};

		var marker = new google.maps.Marker({
			draggable: false,
			raiseOnDrag: false,
			icon: image,
			shadow: shadow,
			shape: shape,
			map: map,
			position: point
		});

		setTimeout(appendIt, 900);

		return this;
	}

	function getMap() {
		return map;
	}

	return {
		init: init,
		getMap: getMap
	};
})();

function centerMap(point) {
	map.getMap().setCenter(point);
}

function appendIt() {
	var mapInfo = document.createElement('section');
	mapInfo.className = 'mapinfo';
	mapInfo.id = 'wideMapInfo';

	var eventInfo = document.createElement('section');
	eventInfo.className = 'eventInfo';
	mapInfo.appendChild(eventInfo);

	document.getElementById("map").appendChild(mapInfo);
	setEventInfo();
}

if (isModernBrowser()) {
	window.addEventListener('resize', function() {
		recenterMap();
	});
}

function recenterMap() {
	if (window.innerWidth < 400) {
		centerMap(new google.maps.LatLng(50.720903, -1.879971));
	}
}