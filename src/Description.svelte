<script>
	import data from './data.json';

	export let timer;

	let index = Math.floor(timer / 2);
	let hanzi = data?.[index]?.hanzi;
	let pinyin = data?.[index]?.pinyin;
	let english = data?.[index]?.english;
</script>

<p>
	<span>/ {hanzi}</span>
	<span>/ {pinyin}</span>
	<span>/ {english}</span>
</p>

<style>
	p {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
	}

	span {
		display: block;
	}
</style>