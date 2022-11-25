<script type="ts">
	import { browser } from "$app/env";
	import { dev } from "$app/env";

	type State = "good" | "close" | "bad";
	type Guess = {
		char: string;
		state: State;
	}[];
	let guesses: Guess[] = [];
	let guess = "";

	function addGuess(value: string) {
		console.log("Adding guess", value);
		const entry: Guess = [];
		for (let i = 0; i < value.length; i++) {
			const char = value[i];
			const existingStates = guesses.flatMap((guess) =>
				guess.filter((ch, j) => j === i && ch.char === char),
			);
			let state: State = existingStates.length > 0 ? existingStates[0].state : "bad";
			entry.push({
				char,
				state,
			});
		}
		guesses.push(entry);
		guesses = guesses;
		updateRegex();
		guess = "";
	}

	function deleteGuess(index: number) {
		guesses = guesses.filter((_, i) => i !== index);
		updateRegex();
	}

	function cycleState(guessIndex: number, charIndex: number) {
		console.log("Cycling guess", guessIndex, charIndex);
		function getNext(state: State): State {
			switch (state) {
				case "bad":
					return "good";
				case "good":
					return "close";
				case "close":
					return "bad";
			}
		}
		const ch = guesses[guessIndex][charIndex];
		ch.state = getNext(ch.state);
		for (const g of guesses) {
			if (g?.[charIndex].char === ch.char) {
				g[charIndex].state = ch.state;
			}
		}
		guesses = guesses;
		updateRegex();
	}
	const wordleWordListPath = "wordle.txt";
	const cainWordListPath = "cain.txt";
	let activeWordListUrl = wordleWordListPath;
	let wordListCache: Record<string, string> = {};
	let delimeter = "[\\n;,]";
	function updateWordList(body: string, delim: string) {
		let exp: string | RegExp;
		try {
			exp = new RegExp(delim);
		} catch (e) {
			exp = delim;
		}
		return body.split(exp) ?? [];
	}
	async function loadWordlist(name: string) {
		if (!browser) return;
		if (name in wordListCache) return;
		const resp = await fetch(name);
		let body = await resp.text();
		if (resp.status !== 200) {
			body = "error_loading_wordlist_status_" + resp.status;
		}
		console.log(`Received body length ${body.length} response from ${activeWordListUrl}`);
		wordListCache[name] = body.trim();
		wordListCache = wordListCache;
		activeWordListUrl = activeWordListUrl;
	}
	$: {
		loadWordlist(activeWordListUrl);
	}
	$: activeList = updateWordList(wordListCache[activeWordListUrl] ?? "", delimeter);

	let autoRegex = true;
	let regex = "";
	function updateRegex() {
		if (!autoRegex) return;

		const longestWordLength = guesses.map((x) => x.length).reduce((a, b) => Math.max(a, b), 0);
		let reg = "^";
		let i = 0;

		while (i < longestWordLength) {
			const pos = guesses.flatMap((g) => g.filter((y, j) => j === i));
			// good.length _should_ be length 0 or 1, if not the user messed up lol
			const good = [...new Set(pos.filter((x) => x.state === "good").map((x) => x.char))];
			const close = [...new Set(pos.filter((x) => x.state === "close").map((x) => x.char))];
			if (good.length > 0) {
				reg += good.join("");
			} else if (close.length > 0) {
				reg += `[^${close.join("")}]`;
			} else {
				reg += ".";
			}
			i++;
		}

		const close = [
			...new Set(guesses.flatMap((g) => g.filter((y) => y.state === "close").map((g) => g.char))),
		];
		const bad = [
			...new Set(guesses.flatMap((g) => g.filter((y) => y.state === "bad").map((g) => g.char))),
		];
		reg += "$";
		if (close.length > 0) {
			for (const ch of close) {
				reg += `(?<=.*${ch}.*)`;
			}
		}
		if (bad.length > 0) reg += `(?<!.*[${bad.join("")}].*)`;
		regex = reg;
	}

	$: results = activeList.filter((x) => x.match(new RegExp(regex, "i")));

	if (dev) {
		addGuess("beans");
		cycleState(0, 1);
		cycleState(0, 1);
		cycleState(0, 2);
	}
</script>

<div id="container">
	<main class="muh-main pb-80">
		<h1>Wordle Assistant</h1>
		<section class="mb-2">
			<h2>Links</h2>
			<a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
			<br />
			<a href="https://twitter.com/SeppahBaws/status/1484712004447350790"
				>Interesting Twitter thread</a
			>
			<br />
			<a href="https://qntm.org/wordle">Absurdle</a>
		</section>

		<section>
			<h2>Config</h2>

			<div class="my-2">
				<label for="active-url" class="muh-label">Wordlist URL</label>
				<div class="flex">
					<span
						class="inline-flex items-center px-3  rounded-l-md border border-r-0  border-gray-600 text-white focus:ring-4 focus:outline-none  font-medium text-sm text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
					>
						<button type="button" class="" on:click={() => (activeWordListUrl = wordleWordListPath)}
							>Wordle</button
						>
					</span>
					<span
						class="inline-flex items-center px-3 border border-r-0 border-l-0  border-gray-600 text-white focus:ring-4 focus:outline-none  font-medium text-sm text-center bg-orange-600 hover:bg-orange-700 focus:ring-orange-800"
					>
						<button type="button" on:click={() => (activeWordListUrl = cainWordListPath)}
							>Cain</button
						>
					</span>
					<input
						bind:value={activeWordListUrl}
						type="text"
						id="active-url"
						class="rounded-none rounded-r-lg  border  block flex-1 min-w-0 w-full text-sm  p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
			</div>

			<label for="delim" class="muh-label">Delimeter regex</label>
			<input id="delim" class="muh-input" bind:value={delimeter} />
			<span>Identified {activeList.length} words.</span>
		</section>

		<section>
			<h2>Guesses</h2>
			<div>
				<form on:submit|preventDefault={() => addGuess(guess)}>
					<label for="guess" class="muh-label">
						<span>Guess</span>
					</label>
					<input id="guess" class="muh-input" bind:value={guess} />
					<button type="submit" class="mt-2 muh-button">Add</button>
				</form>
			</div>

			<ul>
				{#each guesses as guess, guessIndex}
					<li>
						{#each guess as char, charIndex}
							<button
								type="button"
								class="char"
								class:good={char.state === "good"}
								class:close={char.state === "close"}
								class:bad={char.state === "bad"}
								on:click={() => cycleState(guessIndex, charIndex)}>{char.char}</button
							>
						{/each}
						<button type="button" class="muh-button" on:click={() => deleteGuess(guessIndex)}
							>Remove</button
						>
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<h2>Results</h2>

			<div>
				<label class="muh-label">
					<span>Auto regex: </span>
					<input class="muh-checkbox" type="checkbox" bind:checked={autoRegex} />
				</label>
			</div>
			<div>
				<span>Regex</span>
				<input
					id="reg"
					type="text"
					class:muh-input-disabled={autoRegex}
					class="border text-sm rounded-lg block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 text-green-500 bg-black font-mono"
					bind:value={regex}
					disabled={autoRegex}
				/>
			</div>

			<ul>
				{#each results.slice(0, 100) as word}
					<li>{word}</li>
				{/each}
			</ul>
		</section>
	</main>
</div>

<style>
	.char {
		@apply border-black border-2 rounded-xl p-4 text-xl mx-0.5;
	}

	.good {
		@apply bg-green-500 text-white;
	}
	.close {
		@apply bg-yellow-500 text-white;
	}
	.bad {
		/* background-color: darkslategrey; */
		@apply bg-red-800 text-white;
	}
</style>
