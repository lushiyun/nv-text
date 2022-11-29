import {
	Vector3,
	MathUtils,
	RGBAFormat,
	FloatType,
	DataTexture,
	NearestFilter,
} from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

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

const getRandomData = (width, height) => {
	// we need to create a vec4 since we're passing the positions to the fragment shader
	// data textures need to have 4 components, R, G, B, and A
	const length = width * height * 4;
	const data = new Float32Array(length);

	for (let i = 0; i < length; i++) {
		const stride = i * 4;

		const distance = Math.sqrt(Math.random() - 0.5) * 2.0;
		const theta = MathUtils.randFloatSpread(360);
		const phi = MathUtils.randFloatSpread(360);

		data[stride] = distance * Math.sin(theta) * Math.cos(phi);
		data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi);
		data[stride + 2] = distance * Math.cos(theta);
		data[stride + 3] = 1.0; // this value will not have any impact
	}

	return data;
};

const getTextTexture = (text, font) => {
	const textGeo = new TextGeometry(text, {
		font,
		size: 0.5,
		height: 0.1,
		curveSegments: 12,
	});

	textGeo.center();

	const data = new Float32Array(256 * 256 * 4);
	const points = randomPointsInBufferGeometry(textGeo, 256 * 256);

	for (let i = 0, j = 0; i < data.length; i += 4, j += 1) {
		data[i] = points[j].x;
		data[i + 1] = points[j].y;
		data[i + 2] = points[j].z;
		data[i + 3] = 1.0;
	}

	const texture = new DataTexture(data, 256, 256, RGBAFormat, FloatType);
	texture.minFilter = NearestFilter;
	texture.magFilter = NearestFilter;
	texture.needsUpdate = true;

	return texture;
};

const getRandomTexture = () => {
	const points = getRandomData(256, 256);
	const texture = new DataTexture(
		points,
		256,
		256,
		RGBAFormat,
		FloatType
	);
	texture.needsUpdate = true;

	return texture;
}
export { getTextTexture, getRandomTexture };
