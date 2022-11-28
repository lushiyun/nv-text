<script>
	import { OrbitControls, Three, useFrame, useThrelte } from '@threlte/core';
	import {
		PerspectiveCamera,
		ShaderMaterial,
		RGBAFormat,
		FloatType,
		DataTexture,
	} from 'three';

	import { getRandomData, getSphere } from './lib/util';
	import FBO from './lib/fbo';

	import simulationVertex from './shaders/simulation/vertexShader';
	import simulationFragment from './shaders/simulation/fragmentShader';
	import particleVertex from './shaders/particles/vertexShader';
	import particleFragment from './shaders/particles/fragmentShader';
	import { AdditiveBlending } from 'three';

	const params = {
		width: 256,
		height: 256,
	};

	const { renderer, scene } = useThrelte();

	//first model
	var dataA = getRandomData(params.width, params.height, 256);
	var textureA = new DataTexture(
		dataA,
		params.width,
		params.height,
		RGBAFormat,
		FloatType
	);
	textureA.needsUpdate = true;

	//second model
	var dataB = getRandomData(params.width * params.height, 256);
	var textureB = new DataTexture(
		dataB,
		params.width,
		params.height,
		RGBAFormat,
		FloatType
	);
	textureB.needsUpdate = true;

	const simulationMaterial = new ShaderMaterial({
		vertexShader: simulationVertex,
		fragmentShader: simulationFragment,
		uniforms: {
			uTime: { value: 0 },
			textureA: { value: textureA },
			textureB: { value: textureB },
		},
	});

	const particleMaterial = new ShaderMaterial({
		depthWrite: false,
		blending: AdditiveBlending,
		vertexColors: true,
		transparent: true,
		vertexShader: particleVertex,
		fragmentShader: particleFragment,
		uniforms: {
			uPositions: { value: null },
			uSize: { value: 1.0 },
		},
	});

	const fbo = new FBO(
		params.width,
		params.height,
		renderer,
		simulationMaterial,
		particleMaterial
	);

	scene.add(fbo.particles);

	useFrame(({ clock }) => {
		fbo.update(1.0);
	});
</script>

<Three type={PerspectiveCamera} makeDefault position={[0, 0, 500]} fov={60}>
	<OrbitControls />
</Three>
<!-- <Three type={fbo.particles} /> -->
