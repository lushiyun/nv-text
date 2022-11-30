<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';

	let scrollY = 0.1;
	let innerHeight;
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div style="height: {`${innerHeight * 26}px`}" />

<div class="wrapper">
	<Canvas>
		<Scene timer={scrollY / innerHeight} />
	</Canvas>
</div>

<style>
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 1;
	}
</style>
