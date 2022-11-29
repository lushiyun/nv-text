<script>
	import { OrbitControls, Three, useFrame, useThrelte } from '@threlte/core';
	import {
		PerspectiveCamera,
		ShaderMaterial,
		RGBAFormat,
		FloatType,
		DataTexture,
		AdditiveBlending,
		AmbientLight,
	} from 'three';

	import FBO from './lib/fbo';

	import simulationVertex from './shaders/simulation/vertexShader';
	import simulationFragment from './shaders/simulation/fragmentShader';
	import particleVertex from './shaders/particles/vertexShader';
	import particleFragment from './shaders/particles/fragmentShader';

	export let sliderValue;

	//returns a Float32Array buffer of random 3D coordinates
	const getRandomData = (width, height) => {
		// we need to create a vec4 since we're passing the positions to the fragment shader
		// data textures need to have 4 components, R, G, B, and A
		const length = width * height * 4;
		const data = new Float32Array(length);

		for (let i = 0; i < length; i++) {
			const stride = i * 4;
			data[stride] = Math.random() * 2.0 - 1.0;
			data[stride + 1] = Math.random() * 2.0 - 1.0;
			data[stride + 2] = Math.random() * 2.0 - 1.0;
			data[stride + 3] = Math.random() * 2.0 - 1.0;
		}

		return data;
	};

	const width = 256;
	const height = 256;

	const { renderer, scene } = useThrelte();

	//first model
	var dataA = getRandomData(width, height);
	var textureA = new DataTexture(dataA, width, height, RGBAFormat, FloatType);
	textureA.needsUpdate = true;

	//second model
	var dataB = getRandomData(width, height);
	var textureB = new DataTexture(dataB, width, height, RGBAFormat, FloatType);
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
			pointSize: { value: 1 },
			alpha: { value: 0.5 },
		},
		vertexShader: particleVertex,
		fragmentShader: particleFragment,
		transparent: true,
		blending: AdditiveBlending,
	});

	const fbo = new FBO(width, height, renderer, simulationShader, renderShader);

	scene.add(fbo.particles);

	useFrame(() => {
		fbo.update(sliderValue);
	});
</script>

<Three type={PerspectiveCamera} makeDefault position={[1.5, 1.5, 2.5]} fov={60}>
	<OrbitControls />
</Three>

<Three type={AmbientLight} intensity={0.5} />
