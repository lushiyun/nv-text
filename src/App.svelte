<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';

	let sliderValue = 0.5;
</script>

<div>
	<Canvas>
		<Scene {sliderValue} />
	</Canvas>

	<input type="range" min="0" max="1" step="0.01" bind:value={sliderValue} />
</div>

<style>
	div {
		height: 100%;
		width: 100%;
	}

	input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}
</style>
