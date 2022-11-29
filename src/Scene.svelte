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
		AdditiveBlending,
		AmbientLight,
	} from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

	import FBO from './lib/fbo';
	import { getRandomTexture, getTextTexture } from './lib/util.js';
	import data from './data.json';

	import simulationVertex from './shaders/simulation/vertexShader';
	import simulationFragment from './shaders/simulation/fragmentShader';
	import particleVertex from './shaders/particles/vertexShader';
	import particleFragment from './shaders/particles/fragmentShader';

	const { renderer, scene } = useThrelte();

	export let sliderValue;
	let fbo;

	let font;
	const fontLoader = useLoader(FontLoader, () => new FontLoader());
	fontLoader.load('src/assets/yahei_bold.json', (f) => {
		font = f;
		init();
	});

	const init = () => {
		const textTextures = data.map((item) => getTextTexture(item.hanzi, font));

		const randomTexture = getRandomTexture();

		const simulationShader = new ShaderMaterial({
			uniforms: {
				randomTexture: { value: randomTexture },
				texture0: { value: textTextures[0] },
				texture1: { value: textTextures[1] },
				texture2: { value: textTextures[2] },
				texture3: { value: textTextures[3] },
				texture4: { value: textTextures[4] },
				texture5: { value: textTextures[5] },
				texture6: { value: textTextures[6] },
				texture7: { value: textTextures[7] },
				texture8: { value: textTextures[8] },
				texture9: { value: textTextures[9] },
				texture10: { value: textTextures[10] },
				texture11: { value: textTextures[11] },
				texture12: { value: textTextures[12] },
				texture13: { value: textTextures[13] },
				timer: { value: 0 },
			},
			vertexShader: simulationVertex,
			fragmentShader: simulationFragment,
		});

		const renderShader = new ShaderMaterial({
			uniforms: {
				positions: { value: null },
				pointSize: { value: 5.0 },
				alpha: { value: 1.0 },
			},
			vertexShader: particleVertex,
			fragmentShader: particleFragment,
			transparent: true,
			blending: AdditiveBlending,
		});

		fbo = new FBO(256, 256, renderer, simulationShader, renderShader);

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
