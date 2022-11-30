import type { PageLoad } from "./$types";
export const load: PageLoad = async ({ params }) => {
	// must use literal in the import for vite to pick it up
	// can't use intermediate variable for the string path
	console.log(`loading '../markdown/${params.recipe}.md?raw'`)
	const md = await import(`../markdown/${params.recipe}.md?raw`);
	return {
		name: params.recipe,
		markdown: md.default
	};
};
