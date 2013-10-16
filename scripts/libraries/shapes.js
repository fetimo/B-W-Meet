var shapes = (function(){
	
	function createLine(coords){
		
		var lineMaterial = new THREE.LineBasicMaterial({
			color : 0x000000
		})

		var geometry = new THREE.Geometry();

		for(var u = 0; u < coords.length; u += 1){

			geometry.vertices.push(new THREE.Vector3(coords[u].x, coords[u].y, coords[u].z));
		
		}

		line = new THREE.Line(geometry, lineMaterial);

		return line;

	}

	function createSphere(radius, segments, rings, color){

		var sphereMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: true, transparent : false});

		var sphere = new THREE.Mesh( new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);

		return sphere;

	}

	function createCube(width, height, depth, color){
	
		geometry = new THREE.CubeGeometry(width, height, depth);
		material = new THREE.MeshPhongMaterial( { color: color, wireframe: false } );
		mesh = new THREE.Mesh( geometry, material );

		return mesh;

	}

	function createCircle(resolution, amplitude, size){

		var geometry = new THREE.Geometry();
		var material = new THREE.LineBasicMaterial( { color: 0xFFFFFF, opacity: 1.0, linewidth : 1} );
		for(var i = 0; i <= resolution; i++) {
		    var segment = ( i * size ) * Math.PI / 180;
		    geometry.vertices.push( new THREE.Vector3( Math.cos( segment ) * amplitude, 0, Math.sin( segment ) * amplitude ) );         
		}

		var circle = new THREE.Line( geometry, material );

		return circle;

	}

	function createPlane(options){

		var material = new THREE.MeshBasicMaterial(options.meshOptions);
	    var plane = new THREE.Mesh(new THREE.PlaneGeometry(options.width, options.height), material);

	    return plane;

	}

	return {
		line : createLine,
		sphere : createSphere,
		cube : createCube,
		circle : createCircle,
		plane : createPlane
	};

})();