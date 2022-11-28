import type { Load } from "@sveltejs/kit";
export const load: Load = async () => {
	const markdown = import.meta.glob("./markdown/*.md", { as: "raw"});
	// const images = import.meta.glob("./markdown/*.png");
    const pattern = /\/([^/]*?)\..*$/
    const baseName = (path: string) => path.match(pattern)?.[1] || path;
	return {
        recipes: await Promise.all(Object.keys(markdown).map(async (mdPath) => {
            const name = baseName(mdPath);
            console.log(name);
            const imageUrl = (await import(`./markdown/${name}.png`)).default;
            console.log(imageUrl);
            return {
                name,
                imageUrl,
            };
        })),
    }
};
