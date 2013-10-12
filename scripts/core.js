var bwMeet = (function(){

	'use strict';

	var nav,
		menuOptions,
		articles;

	var timeGrades = {
			day : {
				r : 120,
				g : 182,
				b : 227,
				cssClass : "day"
			},
			dusk : {
				r : 95,
				g : 81,
				b : 179,
				cssClass : "dusk"
			},
			night : {
				r : 9,
				g : 49,
				b : 117,
				cssClass : "night"
			},
			dawn : {
				r : 235,
				g : 197,
				b : 94,
				cssClass : "dawn"
			}
		}, 
		currentGrade = timeGrades.day;

	function getGrades() {
		return timeGrades;
	}

	function transitionGrade(from, to){

		var length = 3,
			frameRate = 60,
			delay = 1000 / frameRate;

		for(var x = 0; x < (length * frameRate); x += 1){

			(function(delay, x, from, to, max){

				setTimeout(function(){

					var whereAreWe = (x / max) * 100;
					
					var diffR,
						diffG,
						diffB;

					diffR = Math.floor(0 - ((from.r - to.r) / 100) * whereAreWe);
					diffG = Math.floor(0 - ((from.g - to.g) / 100) * whereAreWe);
					diffB = Math.floor(0 - ((from.b - to.b) / 100) * whereAreWe);

					document.getElementById('frame').setAttribute('style', "background-color : rgb(" + (from.r + diffR) + ", " + (from.g + diffG) + ", " + (from.b + diffB) + ")");

					if(to.cssClass == "night"){
						document.getElementById("darkness").style.opacity = 0 + (1 / 100) * whereAreWe;
						document.getElementById("stars").style.opacity = 0 + (1 / 100) * whereAreWe;
					} else if(from.cssClass == "night"){
						document.getElementById("darkness").style.opacity = 1 - (1 / 100) * whereAreWe;
						document.getElementById("stars").style.opacity = 1 - (1 / 100) * whereAreWe;
					}

				}, delay * x);
			
			})(delay, x, from, to, length * frameRate);
		}
	}

	function checkToday(time){

		var timeDate = new Date(),
			hour = timeDate.getHours(),
			check;

		if (hour < 5 || hour >= 21) {
			//console.log("Nighttime");
			check = timeGrades.night;
		} else if(hour >= 5 && hour <= 9) {
			//console.log("Dawn");
			check = timeGrades.dawn;
		} else if(hour > 9 && hour <= 18) {
			//console.log("Day");
			check = timeGrades.day;
		} else if(hour > 18  && hour < 21) {
			//console.log("Dusk");
			check = timeGrades.dusk;
		}

		if (check !== currentGrade){
			transitionGrade(currentGrade, check);
			currentGrade = check;
		}
	}
	
	var prod = 'ontouchend' in window ? 'touchend' : 'click';
	
	function menu(){
		nav = document.getElementsByTagName('nav')[0];
		menuOptions = nav.getElementsByTagName('li');
		articles = document.getElementById('information').getElementsByTagName('article');

		for(var z = 0; z < menuOptions.length; z += 1){

			(function(z){
				menuOptions[z].addEventListener(prod, function(){
					// alert(z);
					for (var za = 0, len = menuOptions.length; za < len; za += 1){
						menuOptions[za].setAttribute('class', '');
						articles[za].setAttribute('class', '');
					}

					menuOptions[z].setAttribute('class', 'active');
					articles[z].setAttribute('class', 'active');
				}, false);
			})(z);
		}
	}

	function init(){
		checkToday();
		menu();
	}

	return {
		init : init
	};
})();

(function(){
	bwMeet.init();
})();