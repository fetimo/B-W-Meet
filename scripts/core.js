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

	function getGrades(){
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
					} else if(from.cssClass){
						document.getElementById("darkness").style.opacity = 1 - (1 / 100) * whereAreWe;
						document.getElementById("stars").style.opacity = 1 - (1 / 100) * whereAreWe;
					}

				}, delay * x);
			
			})(delay, x, from, to, length * frameRate);
		}
	}

	function checkToday(time){
		$.ajax({
		    type: 'POST',
		    dataType: 'jsonp',
		    url: 'http://api.openweathermap.org/data/2.5/weather?q=Bournemouth,uk&callback=?',
		    success: function(data) {
		        console.log(data);
		        var time = data.weather[0].id;
		        
		    },
		    error : function(errorData) {
				console.log('could not get weather data');
		    }
		});
		
		var timeDate = new Date(),
			hour = timeDate.getHours(),
			check;

		if (hour < 5 || hour >= 21){
			//console.log("Nighttime");
			check = timeGrades.night;
		} else if(hour >= 5 && hour <= 9){
			//console.log("Dawn");
			check = timeGrades.dawn;
		} else if(hour > 9 && hour <= 18){
			//console.log("Day");
			check = timeGrades.day;
		} else if(hour > 18  && hour < 21){
			//console.log("Dusk");
			check = timeGrades.dusk;
		}

		if(check !== currentGrade){
			transitionGrade(currentGrade, check);
			currentGrade = check;
		}
	}
	
	var weather = (function() {
		var get = function() {
			$.ajax({
			    type: 'POST',
			    dataType: 'jsonp',
			    url: 'http://api.openweathermap.org/data/2.5/weather?q=Bournemouth,uk&callback=?',
			    success: function(data) {
			        //console.log(typeof data.weather[0].id);
			        /* wind = data.wind.deg & data.wind.speed */
			        /* status id's found at http://openweathermap.org/wiki/API/Weather_Condition_Codes */
			        var condition = data.weather[0].id;
			        if (condition >= 801 && condition <= 804) {
			        	//cloudy
			        } else if ((condition >= 300 && condition <= 321) || (condition >= 500 && condition <= 522)) {
			        	//drizzle/rain
			        } else if (condition >= 200 && condition <= 232) {
			        	//thunder
			        } else {
			        	//clear
			        }
			    },
			    error : function(errorData) {
					console.log('could not get weather data');
			    }
			});
		};
		
		var set = function() {
			console.log(arguments);
		};
		
		return {
			get: get,
			set: set
		};
	})();
	

	function menu(){
		nav = document.getElementsByTagName('nav')[0];
		menuOptions = nav.getElementsByTagName('li');
		articles = document.getElementById('information').getElementsByTagName('article');

		for(var z = 0; z < menuOptions.length; z += 1){

			(function(z){
				menuOptions[z].addEventListener('click', function(){
					// alert(z);
					for(var za = 0; za < menuOptions.length; za += 1){
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
		init: init,
		weather: weather
	};

})();

(function(){
	bwMeet.init();
})();