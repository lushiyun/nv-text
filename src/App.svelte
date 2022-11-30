<script>
	import { Canvas } from '@threlte/core';
  import Description from './Description.svelte';
	import Scene from './Scene.svelte';

	let scrollY = 0.1;
	let innerHeight = 0;
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div style="height: {`${innerHeight * 26}px`}" />

<nav>
	<h1>女 /NV</h1>
</nav>

<div class="wrapper">
	<Canvas>
		<Scene timer={scrollY / innerHeight} />
	</Canvas>
</div>

<Description timer={scrollY / innerHeight} />

<footer>
	<a href="https://www.shiyunlu.com" target="_blank" rel="noopener noreferrer">
		Made by Shiyun.
	</a>

</footer>

<style>
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: 45px;
		padding-inline: 45px;
	}

	p {
		position: fixed;
		bottom: 60px;

	}

	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: 45px;
		padding-inline: 45px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	h1 {
		font-weight: 38px;
	}
</style>
