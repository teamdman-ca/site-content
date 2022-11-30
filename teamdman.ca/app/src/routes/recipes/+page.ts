import type { Load } from "@sveltejs/kit";
export const load: Load = async () => {
	const markdown = import.meta.glob("./markdown/*.md", { as: "raw" });
	// const images = import.meta.glob("./markdown/*.png");
    const pattern = /\/([^/]*?)\..*$/
    const baseName = (path: string) => path.match(pattern)?.[1] || path;
	return {
        recipes: await Promise.all(Object.keys(markdown).map(async (mdPath) => {
            const name = baseName(mdPath);
            console.log(`Discovered recipe for ${name}`);
            const supportedExtensions = ["png","jpg","jpeg","gif","webp"];
            let imageUrl = undefined as string | undefined;
            for (const ext of supportedExtensions) {
                try {
                    console.log(`Importing ${name} image as ${ext}`);
                    imageUrl = (await import(`./markdown/${name}.${ext}`)).default;
                    break
                } catch (e){
                    // ignore
                }
            }
            if (imageUrl === undefined) {
                throw new Error(`couldn't find image for ${name} recipe`);
            }
            return {
                name,
                imageUrl,
            };
        })),
    }
};
