<script lang="ts">
	import { onMount } from "svelte";
	import { handleMouseMove, resizeCanvasToWindowAndInitSquares, mountHandler } from "./squares";
	import type { SquareGridContext } from "./squares";

	let myDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let context: SquareGridContext;
	let motionAllowed = true;

	// Check for prefers-reduced-motion setting
	onMount(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		motionAllowed = !mediaQuery.matches; // Disable if reduce is preferred

		if (motionAllowed) {
			let x = mountHandler(canvas, myDiv);
			if (x) {
				context = x;
			}
		}
	});

	function handleMouseMoveWrapper(event: MouseEvent) {
		if (motionAllowed && context) {
			handleMouseMove(event, context);
		}
	}
</script>

<div>
	<script async src="widgets/purple-confetti/confetti.js"></script>
</div>
<svelte:window on:resize={() => resizeCanvasToWindowAndInitSquares(context)} />

<!-- Parent element with relative positioning to create a stacking context -->
<main class="p-5 relative min-h-screen" id="purple">
	<!-- Canvas with lower z-index -->
	<canvas class="fixed inset-0 z-10" bind:this={canvas} on:mousemove={handleMouseMoveWrapper} />

	<!-- Article with higher z-index -->
	<article class="prose prose-xl m-auto font-serif relative z-20">
		<h1 class="text-center max-w-full block">TeamDman</h1>
		<hr />
		<p>Welcome to my site.</p>

		<section>
			<h2>Get in touch</h2>
			<p>
				I have a <a href="https://discord.gg/5mbUY3mu6m" class="underline">Discord server</a>, and
				you can also
				<a href="mailto:TeamDman9201@gmail.com" class="underline">email me</a> I guess.
			</p>
		</section>

		<section>
			<h2>Look around</h2>
			<ul>
				<li><a href="wordle">Wordle assistant</a></li>
				<li><a href="recipes/">Recipes</a></li>
				<li><a href="interesting">A collection of interesting links</a></li>
				<li><a href="vehicle-risk/index.html">Vehicle risk estimation tool</a></li>
				<li><a href="shapememory.html">Martensite-Austenite Phase Transition</a></li>
				<li><a href="encoding">Encoding helper</a></li>
				<li><a href="vanced">Youtube Vanced APK</a></li>
				<li><a href="widgets/">Widgets by other sites</a></li>
			</ul>
		</section>

		<section>
			<h2>Things not here</h2>
			<ul>
				<li><a href="https://www.curseforge.com/members/teamdman/projects">Minecraft Mods</a></li>
				<li>
					<a href="https://github.com/teamdman-ca/site-content/tree/master"
						>Source code for this website</a
					>
				</li>
			</ul>
		</section>

		<section>
			<h2>Site health</h2>
			<a
				href="https://github.com/teamdman-ca/site-content/actions/workflows/deploy-root.yml"
				target="_blank"
				rel="noreferrer"
			>
				<img
					src="https://github.com/teamdman-ca/site-content/actions/workflows/deploy-root.yml/badge.svg"
					alt="github actions status badge"
				/>
			</a>
		</section>
	</article>
</main>

<svelte:head>
	<title>Home - TeamDman</title>
</svelte:head>

<style>
	h1 {
		@apply text-yellow-700;
	}
	h2 {
		@apply text-yellow-800;
	}
	hr {
		@apply border-yellow-800;
	}
	ul ::marker {
		@apply text-yellow-800;
	}
	main {
		background-color: rgb(215, 197, 154);
		transition: background-color 0.3s ease, color 0.3s ease;
		background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, rgba(0, 0, 0, 0) 1px);
		background-size: 10px 10px;
	}
	article {
		@apply p-2 bg-black;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	article.prose {
		--tw-prose-body: #adadad;
		--tw-prose-links: #f8b95d;
	}
</style>
