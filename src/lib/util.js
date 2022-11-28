/**
 * from https://github.com/mrdoob/three.js/blob/92db041e370f241f59aa1ea351b139cc0be997f4/examples/js/utils/GeometryUtils.js#L187
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

import { Color, Vector3 } from 'three';

// Get triangle area (half of parallelogram)
// http://mathworld.wolfram.com/TriangleArea.html

const triangleArea = (() => {
	var vector1 = new Vector3();
	var vector2 = new Vector3();

	return function (vectorA, vectorB, vectorC) {
		vector1.subVectors(vectorB, vectorA);
		vector2.subVectors(vectorC, vectorA);
		vector1.cross(vector2);

		return 0.5 * vector1.length();
	};
})();

const randomPointInTriangle = (() => {
	var vector = new Vector3();

	return function (vectorA, vectorB, vectorC) {
		var point = new Vector3();

		var a = Math.random();
		var b = Math.random();

		if (a + b > 1) {
			a = 1 - a;
			b = 1 - b;
		}

		var c = 1 - a - b;

		point.copy(vectorA);
		point.multiplyScalar(a);

		vector.copy(vectorB);
		vector.multiplyScalar(b);

		point.add(vector);

		vector.copy(vectorC);
		vector.multiplyScalar(c);

		point.add(vector);

		return point;
	};
})();

const randomPointsInBufferGeometry = (geometry, n) => {
	var i,
		vertices = geometry.attributes.position.array,
		totalArea = 0,
		cumulativeAreas = [],
		vA,
		vB,
		vC;

	// precompute face areas
	vA = new Vector3();
	vB = new Vector3();
	vC = new Vector3();

	// geometry._areas = [];
	var il = vertices.length / 9;

	for (i = 0; i < il; i++) {
		vA.set(vertices[i * 9 + 0], vertices[i * 9 + 1], vertices[i * 9 + 2]);
		vB.set(vertices[i * 9 + 3], vertices[i * 9 + 4], vertices[i * 9 + 5]);
		vC.set(vertices[i * 9 + 6], vertices[i * 9 + 7], vertices[i * 9 + 8]);

		totalArea += triangleArea(vA, vB, vC);

		cumulativeAreas.push(totalArea);
	}

	// binary search cumulative areas array

	function binarySearchIndices(value) {
		function binarySearch(start, end) {
			// return closest larger index
			// if exact number is not found

			if (end < start) return start;

			var mid = start + Math.floor((end - start) / 2);

			if (cumulativeAreas[mid] > value) {
				return binarySearch(start, mid - 1);
			} else if (cumulativeAreas[mid] < value) {
				return binarySearch(mid + 1, end);
			} else {
				return mid;
			}
		}

		var result = binarySearch(0, cumulativeAreas.length - 1);
		return result;
	}

	// pick random face weighted by face area

	var r,
		index,
		result = [];

	for (i = 0; i < n; i++) {
		r = Math.random() * totalArea;

		index = binarySearchIndices(r);

		// result[ i ] = THREE.GeometryUtils.randomPointInFace( faces[ index ], geometry, true );
		vA.set(
			vertices[index * 9 + 0],
			vertices[index * 9 + 1],
			vertices[index * 9 + 2]
		);
		vB.set(
			vertices[index * 9 + 3],
			vertices[index * 9 + 4],
			vertices[index * 9 + 5]
		);
		vC.set(
			vertices[index * 9 + 6],
			vertices[index * 9 + 7],
			vertices[index * 9 + 8]
		);
		result[i] = randomPointInTriangle(vA, vB, vC);
	}

	return result;
};

//returns a Float32Array buffer of random 3D coordinates
function getRandomData( width, height, size ){
	var len = width * height * 3;
	var data = new Float32Array( len );
	while( len-- )data[len] = ( Math.random() -.5 ) * size ;
	return data;
}

//returns a Float32Array buffer of spherical 3D points
function getPoint(v, size) {
	v.x = Math.random() * 2 - 1;
	v.y = Math.random() * 2 - 1;
	v.z = Math.random() * 2 - 1;
	if (v.length() > 1) return getPoint(v, size);
	return v.normalize().multiplyScalar(size);
}

function getSphere(count, size) {
	var len = count * 3;
	var data = new Float32Array(len);
	var p = new Vector3();
	for (var i = 0; i < len; i += 3) {
		getPoint(p, size);
		data[i] = p.x;
		data[i + 1] = p.y;
		data[i + 2] = p.z;
	}
	return data;
}

export { randomPointsInBufferGeometry, getRandomData, getSphere };
