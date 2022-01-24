async function getWords(url) {
    const req = await fetch(url);
    const body = await req.text();
    const words = body.split("\n");
    console.log(`Loaded ${words.length} words.`);
    return words;
}


async function main() {
    const input = document.getElementById("guess");
    const btn = document.getElementById("add");
    const guesses = document.getElementById("guesses");
    const lookup = document.getElementById("lookup");
    const regInput = document.getElementById("reg");
    const wordlist = document.getElementById("wordlist");
    const wordlistInfo = document.getElementById("wordlist-info");

    let latest = null;
    let words = [];

    async function spoiler() {
        if (!confirm("This will spoil today's Wordle answer, continue?")) return;
        // https://twitter.com/SeppahBaws/status/1484713151287414788/photo/1
        const startDate = new Date(2021, 5, 19, 0,0,0);
        const today = new Date().setHours(0,0,0,0);
        const diff = Math.round((today - startDate)/ 864e5);
        const words = await getWords("./wordle.txt");
        alert(`Today's word is "${words[diff]}".`);
    }

    async function updateWordList() {
        console.log("Updating word list");
        if (latest != wordlist.value) {
            latest = wordlist.value;
            words = await getWords(latest);
            wordlistInfo.innerText = `Loaded ${words.length} words.`;
        }
        lookup.innerHTML = "";
        words.filter(w => w.match(regInput.value)).slice(0,1000).forEach(w => {
            const li = document.createElement("li");
            li.innerText = w;
            lookup.appendChild(li);
        })
    }

    async function updateLookup() {
        const good = {};
        const bad = [];
        const close = {};
        let longest = 0;
        for (const guess of guesses.getElementsByTagName("li")) {
            let i=0;
            for (const letter of guess.getElementsByClassName("letter")) {
                if (letter.classList.contains("good")) {
                    good[i] = letter.innerText;
                }
                if (letter.classList.contains("bad")) {
                    bad.push(letter.innerText);
                }
                if (letter.classList.contains("close")) {
                    close[i] = close[i] ?? [];
                    close[i].push(letter.innerText);
                }
                i++;
            }
            longest = Math.max(longest, guess.getElementsByClassName("letter").length);
        }
        let reg = "^";
        let i=0;
        while (i < longest) {
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
        regInput.value = reg;
        await updateWordList();
    }

    btn.addEventListener("click", async function() {
        const li = document.createElement("li");
        const x = input.value;
        for (const char of x) {
            const letter = document.createElement("button");
            letter.type = "button"
            letter.innerText = char;
            letter.classList.add("bad");
            letter.classList.add("letter");
            let i=0;
            letter.addEventListener("click", async function() {
                letter.classList.remove("bad");
                letter.classList.remove("good");
                letter.classList.remove("close");
                letter.classList.add(["bad","good","close"][++i%3]);
                await updateLookup();
            })
            li.appendChild(letter);
        }
        const rm = document.createElement("button");
        rm.type="button";
        rm.innerText = "remove";
        rm.classList.add("rmbtn");
        rm.addEventListener("click", async function() {
            guesses.removeChild(li);
            await updateLookup();
        })
        li.appendChild(rm);
        guesses.appendChild(li);
        await updateLookup();
        input.value = "";
    });
    input.addEventListener("keyup", event => {
        if (event.key !== "Enter") return;
        btn.click();
    })
    regInput.addEventListener("input", ()=>updateWordList());
    regInput.addEventListener("change", ()=>updateWordList());
    wordlist.addEventListener("change", ()=>updateWordList());

    document.getElementById("spoiler").addEventListener("click", spoiler);
    await updateWordList();
}
window.addEventListener("load", main);