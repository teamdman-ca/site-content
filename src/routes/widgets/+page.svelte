<script lang="ts">
	import type { PageData } from "./$types";
	console.log("benis");
	export let data: PageData;
	console.log(data);
</script>

<p>oh, hi there.</p>
<br />
{#each data.pages as page}
	<a class="underline text-blue-600" href={page}>{page}</a>
	<br />
{/each}
