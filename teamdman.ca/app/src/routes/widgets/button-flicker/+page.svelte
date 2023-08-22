<div class="bg-black w-full h-screen absolute">
	<div class="text-white">
		This is from <a href="https://sinewave.cyou/index.html">sinewave.cyou</a>.
	</div>

	<div id="nav" class="m-4">
		<a href="https://sinewave.cyou/index.html">ABOUT</a>
		<a href="https://sinewave.cyou/tech.html">TECH</a>
		<a href="https://sinewave.cyou/art.html">ART</a>
		<a href="https://sinewave.cyou/food.html">FOOD</a>
	</div>
</div>

<!-- todo: reduced motion preference compliance -->
<style>
	:root {
		/* Colours */
		--blue-bright: #aaaaff;
		--pink-bright: #ff6ffa;
		/*    --pink-bright       : #ff355e;*/

		--app-bg: #0005;
		--app-fg: white;
		--app-title-bg: var(--pink-bright);
		--app-title-fg: black;

		--nav-fg: white;
		--nav-bg: black;
		--nav-fg-hover: black;
		--nav-bg-hover: var(--pink-bright);

		/* Shadows and glows */
		--app-glow: 0 0 10px var(--pink-bright);

		--nav-glow-hover: 0 0 12px var(--pink-bright);

		--link-glow: 0 0 5px white;

		/* Borders */
		--app-border: 1px solid var(--pink-bright);

		--nav-border: 1px solid var(--pink-bright);
	}

	#nav {
		display: flex;
		position: relative;
		height: 20pt;
		padding: 0px;
		margin-left: 20px;
		margin-right: 20px;

		overflow-y: hidden;
		overflow-x: hidden;

		background: transparent;

		align-content: middle;
		justify-content: center;
		flex-wrap: nowrap;
	}

	#nav a {
		position: relative;
		display: inline-block;
		width: 75pt;
		height: 16pt;
		padding-top: 2pt;
		margin: 0px;
		margin-left: 10pt;
		margin-right: 10pt;

		color: var(--nav-fg);
		border: var(--nav-border);

		text-decoration: none;

		transition: all 0.2s;
	}
	#nav a:hover {
		color: var(--nav-fg-hover);
		background: var(--nav-bg-hover);
		box-shadow: 0 0 15pt var(--fg-pink);
		animation: flick_a 5s infinite linear, flick_b 7s infinite reverse linear,
			ee_fx_a 5s linear 0s 1 normal forwards;
	}

	@keyframes flick_a {
		31.25% {
			transform: skew(0deg);
			background: var(--nav-bg-hover);
		}
		32% {
			transform: skew(90deg);
			background: white;
		}
		32.75% {
			transform: skew(0deg);
			background: var(--nav-bg-hover);
		}
	}

	@keyframes flick_b {
		31.25% {
			transform: skew(0deg);
			background: var(--nav-bg-hover);
		}
		32% {
			transform: skew(-90deg);
			background: white;
		}
		32.75% {
			transform: skew(0deg);
			background: var(--nav-bg-hover);
		}
	}
</style>
