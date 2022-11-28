import type { PageLoad } from "./$types";
export const load: PageLoad = async ({ params }) => {
	const path = `../markdown/${params.recipe}.md?raw`;
	console.log("Loading from '"+path+"'");
	const md = await import(path);
	return {
		name: params.recipe,
		markdown: md.default
	};
};
