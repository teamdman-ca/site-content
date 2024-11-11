<script>
	const items = [
		{ label: "Alfa", link: "#", year: "2024-present" },
		{ label: "Bravo", link: "#", year: "2022-2023" },
		{ label: "Charlie", link: "#", year: "2021-2022" },
		{ label: "Delta", link: "#", year: "2020-2021" },
		{ label: "Echo", link: "#", year: "2019" },
		{ label: "Foxtrot", link: "#", year: "2018" },
		{ label: "Golf", link: "#", year: "2017" },
		{ label: "Hotel", link: "#", year: "2016" },
		{ label: "India", link: "#", year: "2015" },
		{ label: "Juliett", link: "#", year: "2014" },
	];
</script>

<div class="bg-black w-full h-screen absolute">
	<div class="text-white">
		This is from <a href="https://cubiq.dev/">Cubiq.dev</a>.
	</div>
	<ul>
		{#each items as item}
			<li>
				<a href={item.link} target="_blank" rel="noreferrer">
					<div class="wrapper">
						<div class="link">
							<span aria-label={item.label} />
						</div>
					</div>
				</a>
				<div class="dots" />
				<span class="year">{item.year}</span>
			</li>
		{/each}
	</ul>
</div>

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

	:root {
		--clr-accent: #fff;
		--max-width: 600px;
	}

	ul {
		list-style: none;
		padding: 0;
		max-width: var(--max-width);
		margin: 0 auto;
	}

	li {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}

	a {
		text-decoration: none;
		color: var(--clr-accent);
		font-weight: bold;
		position: relative;
	}

	/* Text glow effect */
	a:hover {
		text-shadow: 0 0 5px var(--clr-accent);
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.link {
		--padding: 0em;
		padding: 0 var(--padding);
		border-radius: 0.2em;
		overflow: hidden;
		position: relative;
		color: transparent;
		--offset: 1.5em;
		max-height: calc(var(--offset) + var(--padding));
		max-width: min-content;
		align-items: flex-start;
	}

	.link > span {
		display: flex;
		flex-direction: column;
		--off: calc(var(--padding) / 2);
		margin: var(--off) 0;
		transition-timing-function: cubic-bezier(0, 0.3, 0.33, 0.95);
		transition-property: opacity, transform, letter-spacing;
		transition-duration: 0.3s, 0.3s, 0.1s;
	}

	.link > span::before,
	.link > span::after {
		pointer-events: none;
		content: attr(aria-label);
		color: var(--clr-accent);
		transition: inherit;
		opacity: 1;
		white-space: nowrap;
		font-weight: bold; /* Higher font weight */
	}

	.link > span::after {
		position: absolute;
		top: 100%;
		left: 0;
	}

	.wrapper:hover .link > span {
		transform: translateY(calc(-1 * var(--offset)));
	}

	.wrapper:hover .link > span::before {
		opacity: 0;
	}

	.wrapper:hover .link > span::after {
		opacity: 0.7;
	}

	/* Dotted line between left and right text */
	.dots {
		flex: 1;
		border-bottom: dotted 2px var(--clr-accent);
		margin: 0 0.5em;
		opacity: 0.5;
	}

	span.year {
		color: var(--clr-accent);
	}
</style>
