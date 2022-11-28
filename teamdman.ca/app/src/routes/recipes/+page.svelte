<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	console.dir(data);
</script>

<svelte:head>
	<title>Recipes - TeamDman</title>
</svelte:head>
<a class="underline text-xl fixed right-5 top-1 block" href="/">Home</a>

<main>
	<article class="prose m-auto font-serif">
		<h1>Recipes</h1>
		<ul>
			{#each data.recipes as recipe}
				<li>
					<a class="underline" href="recipes/{recipe.name}"
						>{recipe.name}
						<img src={recipe.imageUrl} alt="recipe preview" />
					</a>
				</li>
			{/each}
		</ul>
	</article>
</main>
