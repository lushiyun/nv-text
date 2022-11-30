<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';

	let scrollY = 0.1;

	// const onScroll = () => {
	// 	scrollY = window.scrollY;
	// 	console.log(scrollY);
	// };
</script>

<svelte:window bind:scrollY={scrollY} />

<div style="height: 10000px" on:click={onscroll} />

<div>
	<Canvas>
		<Scene {scrollY} />
	</Canvas>
</div>

<style>
	div {
		height: 100%;
		width: 100%;
	}
</style>
