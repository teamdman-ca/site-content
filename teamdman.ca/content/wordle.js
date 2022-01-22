async function getWords() {
    const req = await fetch("./cain.txt");
    const body = await req.text();
    const words = body.split("\n");
    console.log(`Loaded ${words.length} words.`);
    return words;
}


async function main() {
    const words = await getWords();
    const input = document.getElementById("guess");
    const btn = document.getElementById("add");
    const guesses = document.getElementById("guesses");
    const lookup = document.getElementById("lookup");
    
    function updateLookup() {
        lookup.innerHTML = "";
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
                reg += `[^${bad.concat(close[i] ?? []).join("")}]`;
            }
            i++;
        }
        for (const letter of Object.values(close)) {
            reg += `(?<=.*${letter}.*)`;
        }
        reg += "$";
        document.getElementById("reg").innerText = reg;

        words.filter(w => w.match(reg)).slice(0,1000).forEach(w => {
            const li = document.createElement("li");
            li.innerText = w;
            lookup.appendChild(li);
        })
    }

    btn.addEventListener("click", function() {
        const li = document.createElement("li");
        const x = input.value;
        for (const char of x) {
            const letter = document.createElement("button");
            letter.type = "button"
            letter.innerText = char;
            letter.classList.add("bad");
            letter.classList.add("letter");
            let i=0;
            letter.addEventListener("click", function() {
                letter.classList.remove("bad");
                letter.classList.remove("good");
                letter.classList.remove("close");
                letter.classList.add(["bad","good","close"][++i%3]);
                updateLookup();
            })
            li.appendChild(letter);
        }
        const rm = document.createElement("button");
        rm.type="button";
        rm.innerText = "remove";
        rm.classList.add("rmbtn");
        rm.addEventListener("click", function() {
            guesses.removeChild(li);
            updateLookup();
        })
        li.appendChild(rm);
        guesses.appendChild(li);
        updateLookup();
        input.value = "";
    });
    input.addEventListener("keyup", event => {
        if (event.key !== "Enter") return;
        btn.click();
    })
}
main()