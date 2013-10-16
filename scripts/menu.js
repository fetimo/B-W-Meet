(function(){

	var nav = document.getElementsByTagName('nav')[0],
		menuOptions = nav.getElementsByTagName('li'),
		articles = document.getElementById('information').getElementsByTagName('article'),
		prod = 'ontouchend' in window ? 'touchend' : 'click';

	var z = 0

	while(z < menuOptions.length){

		(function(z){
			menuOptions[z].addEventListener(prod, function(){

				for (var za = 0, len = menuOptions.length; za < len; za += 1){
					menuOptions[za].setAttribute('class', '');
					articles[za].setAttribute('class', '');
				}

				menuOptions[z].setAttribute('class', 'active');
				articles[z].setAttribute('class', 'active');
			}, false);
		})(z);

		z += 1;

	}

})();