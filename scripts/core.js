var __bwMeet13 = (function(){

	'use strict';

	var WebGL = {
		scene : undefined,
		camera : undefined,
		lights : [],
		renderer : undefined,
		context : undefined
	},
	frame = document.getElementById('frame'),
	objects = [],
	spaceDown = false;

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame; 
		window.requestAnimationFrame = requestAnimationFrame;

	function drawScene(){

		var xx = 0;

		while(xx < objects.length){
		
			if(xx % 2 === 0){
				objects[xx].rotation.x += Math.random() / 100;
				objects[xx].rotation.y += Math.random() / 100;
				objects[xx].rotation.z += Math.random() / 100;

				objects[xx].position.x += Math.random() / 100;
				objects[xx].position.y += Math.random() / 100;
				objects[xx].position.z += Math.random() / 100;

				if(spaceDown){
					objects[xx].material.opacity = 0.8;
				} else {
					objects[xx].material.opacity = 0.2;
				}
			} else {
				objects[xx].rotation.x -= Math.random() / 100;
				objects[xx].rotation.y -= Math.random() / 100;
				objects[xx].rotation.z -= Math.random() / 100;

				objects[xx].position.x -= Math.random() / 100;
				objects[xx].position.y -= Math.random() / 100;
				objects[xx].position.z -= Math.random() / 100;
			}

			xx += 1;

		}

		WebGL.renderer.render(WebGL.scene, WebGL.camera);

		requestAnimationFrame(drawScene);

	}

	function buildScene(){

		var Max = 88;

		for(var x = 0; x < Max; x += 1){

			var nObj = shapes.cube(5 ,5, 5, 0xFF00FF);
				nObj.position.set(x - Math.random() * Max, x - Math.random() * Max, x - Math.random() * Max);

				if(x < Max / 3){
					nObj.material.color.setHex(0xFF0000);	
				} else if(x > Max / 3 && x < (Max / 3) * 2){
					nObj.material.color.setHex(0x0000FF);
				} else {
					nObj.material.color.setHex(0xFFFF00);
				}

			nObj.material.needsUpdate = true;
			nObj.material.opacity = 0.2;

			objects.push(nObj);
				
			WebGL.scene.add(objects[x]);

		}

		drawScene();

	}

	function init(){
		
		WebGL.camera = new THREE.PerspectiveCamera(75, frame.offsetWidth / frame.offsetHeight, 1, 500);
		WebGL.camera.position.z = 100;
		WebGL.scene = new THREE.Scene();

		WebGL.lights.push(new THREE.DirectionalLight(0xffffff, 1));
		WebGL.lights[0].position.set(0, 20,50);
		WebGL.scene.add(WebGL.lights[0])

		WebGL.renderer = new THREE.WebGLRenderer({antialias :  true,  preserveDrawingBuffer: true});
		WebGL.renderer.setSize(frame.offsetWidth, frame.offsetHeight);
		WebGL.renderer.setClearColor(0xFFFFFF, 1);

		WebGL.renderer.domElement.setAttribute('id', 'WebGL');

		frame.appendChild(WebGL.renderer.domElement);

		buildScene();

		document.addEventListener('keydown', function(e){
			e.preventDefault();
			if(e.keyCode == 32){
				spaceDown = true;
			}
		}, false);

		document.addEventListener('keyup', function(e){
			e.preventDefault();
			if(e.keyCode == 32){
				spaceDown = false;
			}
		}, false);

	}

	return {
		init : init,
		objects : objects
	};
})();

(function(){
	__bwMeet13.init();
})();