import type { Load } from "@sveltejs/kit";
export const load: Load = async () => {
	const pages = import.meta.glob("./*/+page.svelte")
	return {
        // return pages without +page.svelte suffix
        pages: Object.keys(pages).map((page) => page.replace("+page.svelte", "")),
    };
};
