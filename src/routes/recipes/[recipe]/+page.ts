import type { PageLoad } from "./$types";
export const load: PageLoad = async ({ params }) => {
	// must use literal in the import for vite to pick it up
	// can't use intermediate variable for the string path
	console.log(`loading '../markdown/${params.recipe}.md?raw'`)
	const md = await import(`../markdown/${params.recipe}.md?raw`);
	const images = import.meta.glob("../markdown/*.{png,jpg,jpeg,gif,webp}");
	const imageName = Object.keys(images).find((imagePath) => imagePath.includes(params.recipe));
	if (imageName === undefined) {
		throw new Error(`No image found for recipe ${params.recipe}`);
	}
	const imageUrl = ((await images[imageName]()) as {default:string}).default;
	
	return {
		name: params.recipe,
		markdown: md.default,
		imageUrl,
	};
};
