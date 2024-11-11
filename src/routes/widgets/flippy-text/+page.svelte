<script>
	const items = [
		{ label: "Alfa", link: "#" },
		{ label: "Bravo", link: "#" },
		{ label: "Charlie", link: "#" },
		{ label: "Delta", link: "#" },
		{ label: "Echo", link: "#" },
		{ label: "Foxtrot", link: "#" },
		{ label: "Golf", link: "#" },
		{ label: "Hotel", link: "#" },
		{ label: "India", link: "#" },
		{ label: "Juliett", link: "#" },
	];
</script>

<div class="text-white">
	This is from <a href="https://cubiq.dev/">Cubiq.dev</a>.
</div>

<ul>
	{#each items as item}
		<li>
			<a href={item.link} target="_blank">
				<div class="wrapper">
					<div class="link">
						<span aria-label={item.label} />
					</div>
				</div>
			</a>
			<span class="year">2024-present</span>
		</li>
	{/each}
</ul>

<style>
	:root {
		--clr-accent: #fff;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}

	a {
		text-decoration: none;
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

	span.year {
		margin-left: auto;
		color: var(--clr-accent);
	}
</style>
