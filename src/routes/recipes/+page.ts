import type { Load } from "@sveltejs/kit";
export const load: Load = async () => {
	const markdown = import.meta.glob("./markdown/*.md", { as: "raw" });
	const images = import.meta.glob("./markdown/*.{png,jpg,jpeg,gif,webp}");
    const pattern = /\/([^/]*?)\..*$/
    const baseName = (path: string) => path.match(pattern)?.[1] || path;
	return {
        recipes: await Promise.all(Object.keys(markdown).map(async (mdPath) => {
            const recipeName = baseName(mdPath);
            console.log(`Discovered recipe for ${recipeName}`);
            const imageName = Object.keys(images).find((imagePath) => imagePath.includes(recipeName));
            if (imageName === undefined) {
                throw new Error(`No image found for recipe ${recipeName}`);
            }
            const imageUrl = ((await images[imageName]()) as {default:string}).default;
            return {
                name: recipeName,
                imageUrl,
            };
        })),
    }
};
