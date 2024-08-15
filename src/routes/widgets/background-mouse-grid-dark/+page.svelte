<script lang="ts">
	import { onMount } from "svelte";
	import { handleMouseMove, resizeCanvasToWindowAndInitSquares, mountHandler } from "./stuff";
	import type { SquareGridContext } from "./stuff";

	let myDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let context: SquareGridContext;

	onMount(() => {
		let x = mountHandler(canvas, myDiv);
		if (x) {
			context = x;
		}
	});
</script>

<svelte:window on:resize={() => resizeCanvasToWindowAndInitSquares(context)} />

<div class="absolute">
	<a class="underline text-blue-400 bg-black" href="https://retool.com/visual-basic/">source</a>
	<a class="underline text-blue-400 bg-black" href="..">back</a>
</div>

<div class="ml-48 mt-20 absolute bg-slate-300 p-4">There was some blog content in the original</div>

<div
	bind:this={myDiv}
	id="mouseBgEffect"
	style="--bg-hue: 0;"
	on:mousemove={(e) => handleMouseMove(e, context)}
>
	<div class="MouseBGEffectBackground" />
	<canvas bind:this={canvas} />
</div>

<style>
	#mouseBgEffect {
		background-image: url("./Gandalf-30497766af4dd82cb3fa40d009e3f77d.jpg");
		background-size: cover;
		background-blend-mode: overlay;
		transition-duration: 1s;
		transition-timing-function: ease-in;
		transition-delay: 0s;
		transition-property: background-color;
	}
</style>
