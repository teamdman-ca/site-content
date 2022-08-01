<script type="ts">
	import { browser } from "$app/env";

	type State = "good" | "close" | "bad";
	type Guess = {
		char: string;
		state: State;
	}[];
	let guesses: Guess[] = [];

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

	const availableWordListUrls = ["wordle.txt", "cain.txt", "http://example.com/words.txt"];
	let delimeter = "[\\n;,-]";
	let wordListCache: Record<string, string[]> = {};
	let activeWordListUrl = availableWordListUrls[0];
	$: activeList = wordListCache[activeWordListUrl] ?? [];
	async function loadWordlist(name: string) {
		if (!browser) return;
		if (name in wordListCache) return;
		const resp = await fetch(name);
		const body = await resp.text();
		const list = body.trim().split("\n");
		console.log("Got list with " + list.length + " entries.");
		wordListCache[name] = list;
		wordListCache = wordListCache;
	}
	$: {
		loadWordlist(activeWordListUrl);
	}

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
	let guess = "";

	$: results = activeList.filter((x) => x.match(new RegExp(regex, "i")));
</script>

<div id="container">
	<main>
		<a href="..">Home</a>
		<section>
			<h1>Wordle Assistant</h1>

			<a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
			<br />
			<a href="https://twitter.com/SeppahBaws/status/1484712004447350790"
				>Interesting Twitter thread</a
			>
			<br />
			<a href="https://qntm.org/wordle">Absurdle</a>
		</section>

		<section>
			<h2>Wordlists</h2>
			<ul>
				{#each availableWordListUrls as url}
					<li>
						<input bind:value={url} />
					</li>
				{/each}
			</ul>
		</section>

		<section>
			<h2>Select wordlist</h2>
			<span>Wordlist:</span>
			<select bind:value={activeWordListUrl}>
				{#each availableWordListUrls as name}
					<option value={name}>{name}</option>
				{/each}
			</select>
			<br />
			<label>
				Delimeter regex:
				<input bind:value={delimeter} />
			</label>
			<br />
			<br />
			<span>Identified {activeList.length} words.</span>
		</section>

		<section>
			<h2>Guess</h2>
			<div>
				<form on:submit|preventDefault={() => addGuess(guess)}>
					<label>
						<span>Enter a guess:</span>
						<input bind:value={guess} />
					</label>
					<button type="submit">Add</button>
				</form>
			</div>

			<div>
				<label>
					<span>Auto regex</span>
					<input type="checkbox" bind:checked={autoRegex} />
				</label>
			</div>

			<div>
				<span>Regex:</span>
				<input id="reg" bind:value={regex} disabled={autoRegex} />
			</div>
		</section>
		<section>
			<h2>Guesses</h2>

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
						<button type="button" on:click={() => deleteGuess(guessIndex)}>Remove</button>
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<h2>Results</h2>
			<ul>
				{#each results.slice(0, 100) as word}
					<li>{word}</li>
				{/each}
			</ul>
		</section>
	</main>
</div>

<style>
	:root {
		background-color: #18181a;
		color: #d7d7c0;
	}

	main {
		padding: 10px;
	}

	a {
		color: rgb(133, 133, 133);
	}

	@media only screen and (max-width: 632px) {
		h1 {
			text-align: center;
		}
	}

	#reg {
		background-color: black;
		color: rgb(0, 255, 0);
		display: inline-block;
		width: 30rem;
		max-width: 100%;
	}

	.char {
		border-radius: 3px;
		border: 3px solid black;
	}

	.good {
		background-color: green;
	}
	.close {
		background-color: hsl(60, 100%, 50%);
	}
	.bad {
		/* background-color: darkslategrey; */
		background-color: maroon;
	}
</style>
