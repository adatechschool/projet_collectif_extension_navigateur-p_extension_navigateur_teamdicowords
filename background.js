const bouton = document.getElementById("btn");
let word = document.getElementById("theWord");
const theDef = document.getElementById("def");
const theSyn = document.getElementById("syn")

function displayDefinition() {
    theDef.style.display = "flex"
    theDef.style.padding = "20px"
    displayWord();
}

function displayBtn() {
    word = document.getElementById("theWord").value
    bouton.style.display = "flex";

}

function displayWord() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(data => data.json())
        .then(data => theDef.innerHTML = data[0].meanings[0].definitions[0].definition)
}

function fetchSyn() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(data => data.json())
        .then(data => displaySyn(data))
}

function displaySyn(result) {
    let lengthOfSynonyms = result[0].meanings[0].synonyms.length
    theSyn.innerHTML = " "
    if (lengthOfSynonyms === 0) {
        theSyn.innerHTML = "Sorry, there is no synonym..."
    } else {
        for (i = 0; i < lengthOfSynonyms; i++) {
            if (result[0].meanings[0].synonyms[i] !== "") {
                theSyn.innerHTML += `<li>${result[0].meanings[0].synonyms[i]}</li>` + "<br>"
            } else {
                theSyn.innerHTML = "Sorry, there is no synonym..."
            }
        }
    }
}

function displaySynonyms() {
    theSyn.style.display = "flex"
    theSyn.style.padding = "20px"
    fetchSyn()
}

const send = document.getElementById("valid");
send.addEventListener("click", displayBtn);

const defDescription = document.getElementById('defBtn');
defDescription.addEventListener("click", displayDefinition);

const synDescription = document.getElementById('synBtn');
synDescription.addEventListener("click", displaySynonyms);