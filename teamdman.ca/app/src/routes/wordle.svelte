<script type="ts">
	import { browser } from "$app/env";
	const availableListNames = ["wordle.txt", "cain.txt"];
	let activeListName: string;
	let wordLists: Record<string, string[]> = {};
	let autoRegex = true;
	let regex = "";
	let guess = "";
	let guesses: string[] = [];

	let good: Record<number, string> = {};
	let close: Record<number, string> = {};
	let bad: string[] = [];

	function cycle(index: number, value: string, fresh: boolean = false) {
		if (index in good && good[index] === value) {
			if (!fresh) {
				bad.push(value);
				delete good[index];
			}
		} else if (bad.includes(value)) {
			if (!fresh) {
				close[index] = value;
				bad = bad.filter((x) => x !== value);
			}
		} else if (index in close && close[index] === value) {
			if (!fresh) {
				good[index] = value;
				delete close[index];
			}
		} else {
			bad.push(value);
		}
		good = good;
		close = close;
		bad = bad;
	}

	async function loadWordlist(name: string) {
		if (!browser) return;
		if (name in wordLists) return;
		const resp = await fetch(name);
		const body = await resp.text();
		const list = body.split("\n");
		console.log("Got list with " + list.length + " entries.");
		wordLists[name] = list;
		wordLists = wordLists;
	}

	function addGuess(value: string) {
		guesses.push(value);
		for (var i = 0; i < value.length; i++) {
			cycle(i, value[i], true);
		}
		guesses = guesses;
	}

	$: activeList = wordLists?.[activeListName]?.filter((x) => x.match(regex)) ?? [];
	$: wordcount = activeList.length;
	$: longestWordLength = guesses.map((x) => x.length).reduce((a, b) => Math.max(a, b), 0);

	$: {
		loadWordlist(activeListName);
	}

	$: {
		if (autoRegex) {
			let reg = "^";
			let i = 0;
			while (i < longestWordLength) {
				if (i in good) {
					reg += good[i];
				} else {
					reg += `[^${[...new Set(bad.concat(close[i] ?? []))].join("")}]`;
				}
				i++;
			}
			for (const letterSet of Object.values(close)) {
				for (const letter of [...new Set(letterSet)]) {
					reg += `(?<=.*${letter}.*)`;
				}
			}
			reg += "$";
			regex = reg;
		}
	}

	activeListName = availableListNames[0];
</script>

<div id="container">
	<main>
		<!-- <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
        <br/>
        <a href="https://twitter.com/SeppahBaws/status/1484712004447350790">Interesting Twitter thread</a>
        <br/>
        <a href="https://qntm.org/wordle">Absurdle</a>
        <br/>
        <br/> -->
		<h1>Wordle Assistant</h1>
		<span>Wordlist:</span>
		<select bind:value={activeListName}>
			{#each availableListNames as name}
				<option value={name}>{name}</option>
			{/each}
		</select>
		<span>containing {wordcount} words.</span>

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

		<div>
			<p>Guesses</p>
			<ul>
				{#each guesses as g}
					<li>
						{#each g as char, i}
							<button
								type="button"
								class="char"
								class:good={good[i] === char}
								class:close={close[i] === char}
								class:bad={bad.includes(char)}
								on:click={() => cycle(i, char)}>{char}</button
							>
						{/each}
					</li>
				{/each}
			</ul>
		</div>

		<div id="results">
			<p>Matching words:</p>
			<ul>
				{#each activeList.slice(0, 100) as word}
					<li>{word}</li>
				{/each}
			</ul>
		</div>
	</main>
</div>

<style>
	#container {
		width: 100%;
		height: 100%;
		background-color: #18181a;
		color: #d7d7c0;
	}

	main {
		padding: 10px;
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

	#results ul {
		display: flex;
		flex-wrap: wrap;
	}

	#results li {
		margin-right: 25px;
		min-width: 80px;
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
		background-color: darkslategrey;
	}
</style>
