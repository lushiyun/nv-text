<script>
	import {
		OrbitControls,
		Three,
		useFrame,
		useLoader,
		useThrelte,
	} from '@threlte/core';
	import {
		PerspectiveCamera,
		ShaderMaterial,
		RGBAFormat,
		FloatType,
		DataTexture,
		AdditiveBlending,
		AmbientLight,
		Matrix4,
		NearestFilter,
		MathUtils,
		Mesh,
		MeshBasicMaterial,
		Vector4,
	} from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

	import FBO from './lib/fbo';

	import simulationVertex from './shaders/simulation/vertexShader';
	import simulationFragment from './shaders/simulation/fragmentShader';
	import particleVertex from './shaders/particles/vertexShader';
	import particleFragment from './shaders/particles/fragmentShader';
	import { randomPointsInBufferGeometry } from './lib/util.js';

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

	const { renderer, scene } = useThrelte();

	export let sliderValue;

	let textGeometry;

	const fontLoader = useLoader(FontLoader, () => new FontLoader());
	fontLoader.load('src/assets/yahei_bold.json', (f) => {
		textGeometry = new TextGeometry('女', {
			font: f,
			size: 0.5,
			height: 0.1,
			curveSegments: 12,
		});

		init();
	});

	let fbo;

	const init = () => {
		const width = 256;
		const height = 256;

		const data = new Float32Array(width * height * 4);

		//first model
		const points = randomPointsInBufferGeometry(textGeometry, width * height);

		for (let i = 0, j = 0; i < data.length; i += 4, j += 1) {
			data[i] = points[j].x;
			data[i + 1] = points[j].y;
			data[i + 2] = points[j].z;
			data[i + 3] = 1.0;
		}

		const textureA = new DataTexture(
			data,
			width,
			height,
			RGBAFormat,
			FloatType
		);
		textureA.minFilter = NearestFilter;
		textureA.magFilter = NearestFilter;
		textureA.needsUpdate = true;

		//second model
		const dataB = getRandomData(width, height);
		const textureB = new DataTexture(
			dataB,
			width,
			height,
			RGBAFormat,
			FloatType
		);
		textureB.needsUpdate = true;

		const simulationShader = new ShaderMaterial({
			uniforms: {
				textureA: { value: textureA },
				textureB: { value: textureB },
				timer: { value: 0 },
			},
			vertexShader: simulationVertex,
			fragmentShader: simulationFragment,
		});

		const renderShader = new ShaderMaterial({
			uniforms: {
				positions: { value: null },
				pointSize: { value: 10.0 },
				alpha: { value: 1.0 },
			},
			vertexShader: particleVertex,
			fragmentShader: particleFragment,
			transparent: true,
			blending: AdditiveBlending,
		});

		fbo = new FBO(width, height, renderer, simulationShader, renderShader);

		scene.add(fbo.particles);
	};

	useFrame(() => {
		fbo?.update(sliderValue);
	});
</script>

<Three type={PerspectiveCamera} makeDefault position={[0, 0, 2.5]} fov={60}>
	<OrbitControls />
</Three>

<!-- <Three type={Mesh} geometry={textGeometry} material={new MeshBasicMaterial()} /> -->

<Three type={AmbientLight} intensity={0.5} />
