(function(){

	var nav = document.getElementsByTagName('nav')[0],
		menuOptions = nav.getElementsByTagName('li'),
		articles = document.getElementById('information').getElementsByTagName('article'),
		prod = 'ontouchend' in window ? 'touchend' : 'click';

	var z = 0;

	while (z < menuOptions.length) {

		(function(z) {
			menuOptions[z].addEventListener(prod, function() {

				for (var za = 0, len = menuOptions.length; za < len; za += 1){
					menuOptions[za].classList.remove('active');
					articles[za].classList.remove('active');
				}

				menuOptions[z].classList.add('active');
				articles[z].classList.add('active');
			}, false);
		})(z);

		z += 1;
	}
})();