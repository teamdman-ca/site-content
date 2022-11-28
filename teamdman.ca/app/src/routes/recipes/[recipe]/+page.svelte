<script lang="ts">
	import type { PageData } from "./$types";
	import SvelteMarkdown from "svelte-markdown";

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.name} - TeamDman</title>
</svelte:head>
<nav class="fixed right-5 top-1">
	<a class="underline text-xl block text-right" href="/">Home</a>
	<a class="underline text-xl block text-right" href="../">Back to recipes</a>
</nav>

<main>
	<article class="prose m-auto font-serif">
		<SvelteMarkdown source={data.markdown} />
	</article>
</main>
