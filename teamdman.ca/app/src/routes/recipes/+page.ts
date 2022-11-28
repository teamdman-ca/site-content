import type { Load } from "@sveltejs/kit";
export const load: Load = async () => {
	const markdown = import.meta.glob("./markdown/*.md", { as: "raw" });
	// import.meta.glob("./markdown/*.png", { as: "raw" });
    const pattern = /\/([^/]*?).md$/
	return {
        recipes: Object.keys(markdown).map((k) => {
            const name = k.match(pattern)?.[1];
            const url = `./markdown/${name}.png`;
            return {
                name,
                imageUrl: new URL(url, import.meta.url).href
            }
        }),
    }
};
