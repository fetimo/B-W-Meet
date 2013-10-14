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

	function handleAudio(data){

		var buff = new Uint8Array(data.target.result);
		var blob = new Blob([buff], {type: 'audio/mpeg'});

		var aud = new Audio();
		aud.src = URL.createObjectURL(blob);
		aud.load();
		document.body.appendChild(aud);

		aud.addEventListener('canplaythrough', function(){
			aud.play();
			document.getElementById('tint').setAttribute('class', 'fadeOut');
		}, true);


	}

	function loadFile(e){
		var file = e.dataTransfer.files[0];

		var reader = new FileReader();

		reader.onload = handleAudio;

		reader.readAsArrayBuffer(file);
	}

	function drawScene(){

		var xx = 0;

		while(xx < objects.length){
		
			if(xx % 2 === 0){
				objects[xx].rotation.x += objects[xx].custom.spin.x;
				objects[xx].rotation.y += objects[xx].custom.spin.y;
				objects[xx].rotation.z += objects[xx].custom.spin.z;

			} else {
				objects[xx].rotation.x -= objects[xx].custom.spin.x;
				objects[xx].rotation.y -= objects[xx].custom.spin.y;
				objects[xx].rotation.z -= objects[xx].custom.spin.z;

				if(spaceDown){
					objects[xx].material.color.setHex(objects[xx].custom.color);
					objects[xx].scale.x = objects[xx].scale.y = objects[xx].scale.z = 2;
				} else {
					//objects[xx].material.color.setHex(0x000000);
				}

			}

			if(objects[xx].material.color.r > 0){
				objects[xx].material.color.r -= 0.1;
			}

			if(objects[xx].material.color.g > 0){
				objects[xx].material.color.g -= 0.1;
			}

			if(objects[xx].material.color.b > 0){
				objects[xx].material.color.b -= 0.1;
			}

			if(objects[xx].scale.x > 1){
				objects[xx].scale.x = objects[xx].scale.y = objects[xx].scale.z -= 0.1;
			}
			// objects[xx].scale.x = objects[xx].scale.y = objects[xx].scale.z = Math.random() * 2;

			xx += 1;

		}

		WebGL.renderer.render(WebGL.scene, WebGL.camera);

		requestAnimationFrame(drawScene);

	}

	function buildScene(){

		var Max = 88;

		for(var x = 0; x < Max; x += 1){

			var nObj = shapes.cube(5 ,5, 5, 0xFF00FF);
				nObj.custom = {};
				nObj.position.set(x - Math.random() * Max, x - Math.random() * Max, x - Math.random() * Max);

				if(x < Max / 3){
					nObj.custom.color = 0xFF0000;
				} else if(x > Max / 3 && x < (Max / 3) * 2){
					nObj.custom.color = 0x0000FF;
				} else {
					nObj.custom.color = 0xFFFF00;
				}

			nObj.material.color.setHex(0x000000);

			nObj.material.needsUpdate = true;
			nObj.geometry.verticesNeedUpdate = true;
			nObj.custom.spin = {x : Math.random() / 100, y : Math.random() / 100, z : Math.random() / 100}

			objects.push(nObj);
				
			WebGL.scene.add(objects[x]);

		}

		drawScene();

	}

	function addEvents(){

		frame.addEventListener('dragover', function(e){
			e.stopPropagation();
			e.preventDefault();
			console.log("Drag");
		}, true);

		frame.addEventListener('drop', function(e){
			e.stopPropagation();
			e.preventDefault();
			console.log(e);
			loadFile(e);
		}, true);

		document.addEventListener('keydown', function(e){
			if(e.keyCode == 32){
				e.preventDefault();
				spaceDown = true;
			}
		}, false);

		document.addEventListener('keyup', function(e){
			if(e.keyCode == 32){
				e.preventDefault();
				spaceDown = false;
			}
		}, false);
	

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

		addEvents();

		buildScene();

	}

	return {
		init : init,
		objects : objects
	};
})();

(function(){
	__bwMeet13.init();
})();

function sections(number){

	/*var range = 88,
		sections = 88,
		setSize = range / sections,
		answer = Math.ceil(number / setSize);*/
	
	return answer;	

}