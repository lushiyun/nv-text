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
  <a href="https://www.radicalnv.com/"><h1>NV /</h1></a>
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
  <a
    href="https://www.buymeacoffee.com/lushiyunL"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Buy me a coffee"
  >
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      ><path
        d="M17 11.6V15a6 6 0 01-6 6H9a6 6 0 01-6-6v-3.4a.6.6 0 01.6-.6h12.8a.6.6 0 01.6.6zM12 9c0-1 .714-2 2.143-2v0A2.857 2.857 0 0017 4.143V3.5M8 9v-.5a3 3 0 013-3v0a2 2 0 002-2V3"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><path
        d="M16 11h2.5a2.5 2.5 0 010 5H17"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
  </a>

  <a
    class="link"
    href="https://www.shiyunlu.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit my website"
  >
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
    z-index: 2;
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 20px;
    padding-inline: 20px;
    z-index: 1;
  }

  .loading {
    font-size: 1rem;
    line-height: 1.25rem;
  }

  .description {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 0;
    align-items: flex-end;
    padding-inline: 20px;
    font-size: 18px;
  }

  .description-item {
    z-index: 1;
  }

  .description-item span {
    margin-right: 15px;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 20px;
    padding-inline: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 1;
  }

  footer > a {
    padding: 10px;
    margin-bottom: -10px;
    border-radius: 8px;
  }

  footer > a:first-child {
    margin-left: -10px;
  }

  footer > a:hover {
    background-color: gray;
  }

  h1 {
    font-size: 48px;
  }

  .scroll-indicator {
    position: fixed;
    bottom: 20px;
    right: 20px;
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
    height: 50px;
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

  @media (min-width: 769px) {
    nav {
      padding-top: 45px;
      padding-inline: 45px;
    }

    .description {
      padding-inline: 45px;
    }

    .description-item span {
      margin-right: 20px;
    }

    footer {
      padding-bottom: 45px;
      padding-inline: 45px;
    }

    .scroll-indicator {
      bottom: 45px;
      right: 45px;
    }

    .scroll-line {
      height: 100px;
    }
  }
</style>
