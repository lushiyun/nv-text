<script>
  import { Canvas } from "@threlte/core";
  import { useProgress } from "@threlte/extras";
  import { fade } from "svelte/transition";
  import Scene from "./Scene.svelte";
  import data from "./data.json";

  const { loaded } = useProgress();

  let scrollY = 0.1;
  let innerHeight = 0;
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div style="height: {`${innerHeight * 26}px`}" />

<nav>
  <h1>NV /</h1>
</nav>

<ul
  class="description"
  style="margin-top: {innerHeight / 2}px; gap: {innerHeight * 2}px"
>
  {#each data as item}
    <li class="description-item">
      <span>/ {item.hanzi}</span>
      <span>/ {item.pinyin}</span>
      <span>/ {item.english}</span>
    </li>
  {/each}
</ul>

<footer>
  <a href="https://www.shiyunlu.com" target="_blank" rel="noopener noreferrer">
    Shiyun Lu.
  </a>
</footer>

<aside class="scroll-indicator" class:hidden={scrollY >= innerHeight / 2}>
  <small class="scroll-text">scroll</small>
  <div class="line-wrapper"><span class="scroll-line" /></div>
</aside>

<div class="wrapper">
  <Canvas>
    <Scene timer={scrollY / innerHeight} />
  </Canvas>
</div>

{#if !$loaded}
  <div
    transition:fade|local={{
      duration: 200,
    }}
    class="wrapper progress"
  >
    <p class="loading">Loading...</p>
  </div>
{/if}

<style>
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .progress {
    display: grid;
    place-items: center;
    background-color: #0f1115;
    color: #f5f5f5;
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 45px;
    padding-inline: 45px;
  }

  .loading {
    font-size: 1rem;
    line-height: 1.25rem;
  }

  .description {
    pointer-events: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 0;
    align-items: flex-end;
    padding-inline: 45px;
    font-size: 18px;
  }

  .description-item span {
    margin-right: 20px;
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
    font-size: 48px;
  }

  .scroll-indicator {
    position: fixed;
    bottom: 45px;
    right: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .hidden {
    display: none;
  }

  .scroll-text {
    writing-mode: vertical-rl;
  }

  .line-wrapper {
    overflow: hidden;
  }

  .scroll-line {
    display: block;
    width: 1px;
    height: 100px;
    background-color: #f5f5f5;
    animation: drop 3s cubic-bezier(0.2, 0.65, 0.6, 1) infinite;
  }

  @keyframes drop {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
