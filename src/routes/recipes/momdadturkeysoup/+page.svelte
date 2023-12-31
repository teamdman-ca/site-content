<script lang="ts">
	import type { PageData } from "./$types";
	import SvelteMarkdown from "svelte-markdown";

	const content = `
<!DOCTYPE recipe>
# MomDad Turkey Soup

## Part 1 - Boiling the Carcass

![](1.jpg)
![](2.jpg)
![](3.jpg)
![](4.jpg)
![](5.jpg)
![](6.jpg)
![](7.jpg)
![](8.jpg)
![](9.jpg)
![](10.jpg)

1. Keep the carcass of the turkey for soup
2. Fold the bones in half to make it fit in your large soup pot. Fill with water, 3cm from top
3. Shake some salt into the water and onto the bones, approx 1 teaspoon
4. Turn burner on medium high and let it come to a boil. Cover, if you can, otherwise, leave uncovered. Wait for it to boil (20 minutes)
5. If after 20 minutes, it's still not boiling, stir it and set your timer for another 20 minutes
6. If after 40 minutes have passed the water is still not boiling, stir the bones again and set the timer for another 20 minutes. Put the lid on partway, if it fits
7. Once the water starts to boil, you ahve to keep an eye on the pot that it doesn't overflow. Stir and continue to try to break up the bones. Leave the lid on, but not fully -- let the steam out. Set the timer for another 20 minutes.
8. Once you hear the water really boiling and the whole kitchen smells yummy, turn the heat down to medium low (3) and set the timer for 45 minutes.
9. Break up the bones so the lid will fit. Use a tooth pick to vent the lid. Gently boil for 45 minutes.
10. By now, the meat should be easily coming off the bones. Turn off the heat and let the pot cool down so you can separate the meat from the rest of the parts. You might want to leave it overnight, in a cool place (fridge, or garage if it's not too cold out)

## Part 2 - The Rest of the Soup

1. Follow pics 1-11.jpg (part 1)
2. Strain the boiled carcass to separate the liquid from the rest. Retain both, DO NOT STRAIN INTO THE SINK DOWN THE DRAIN!!
3. Pick through the solids, retain the meat placing it into the liquid; discard the bones/tendons/undesirable into the compose
4. Chop 2 onions; cut off ends, cut in half, chop one way (keep in form) then chop the other way
5. Finely chop carrot; cut off ends, slap shop till shredded
6. Chop 2 big (3 small stalks) celery; discard large white base, coin the rest
7. Add 1 can seasoned diced tomatoes
8. Add 1 can tomato sauce (can be substituted with more diced tomatoes)
10. Cook on 2, stirring every 20 minutes to monitor nothing sticking to bottom
11. If it starts to boil, stir and keep lid off
12. If keeps boiling, turn to low
13. Cook until dinner
14. Turn off, let cool
15. When no longer too warm, put in fridge
16. By the end of the 7th day (including day made), freeze remainder in tall cottage cheese/yogurt containers`;
</script>

<svelte:head>
	<title>MomDad Turkey Soup - TeamDman</title>
</svelte:head>
<nav class="fixed right-5 top-1">
	<a class="underline text-xl block text-right" href="/">Home</a>
	<a class="underline text-xl block text-right" href="../">Back to recipes</a>
</nav>

<main>
	<article class="prose m-auto font-serif">
		<SvelteMarkdown source={content} />
	</article>
</main>
