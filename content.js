const bouton = document.getElementById("btn");
let word = document.getElementById("theWord");
const theDef = document.getElementById("def");
const theSyn = document.getElementById("syn");

function displayBtn() {
    fetchImage()
    theDef.style.display = "none"
    theSyn.style.display = "none"
    word = document.getElementById("theWord").value
    bouton.style.display = "flex";

}

function displayWord() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(data => data.json())
        .then(data => displayDef(data))
        // .then(data => theDef.innerHTML = data[0].meanings[0].definitions[0].definition)
}

function fetchSyn() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(data => data.json())
        .then(data => displaySyn(data))
}

function fetchImage() {
    fetch(`https://api.unsplash.com/search/photos?query=${word}&client_id=gRivuJjAxGZyKBffMs2pZ9YtavAJpxS4YRgHCE9BgBE`)
    .then(data => data.json())
    .then(data => console.log(data))
}

function displayImg(result) {
    let picture = document.getElementById('image');
    picture.innerHTML = `<img src="${result.results[0].urls.thumb}"/>`
}

function displaySyn(result) {
    let lengthOfSynonyms = result[0].meanings[0].synonyms.length
    theSyn.innerHTML = " "
    
    if (lengthOfSynonyms === 0) {
        theSyn.innerHTML = "Sorry, there is no synonym..."
    } else if (lengthOfSynonyms < 5) {
        for (i = 0; i < lengthOfSynonyms; i++) {
            if (result[0].meanings[0].synonyms[i] !== "") {
                theSyn.innerHTML += `<li>${result[0].meanings[0].synonyms[i]}</li>` + "<br>"
            } else {
                theSyn.innerHTML = "Sorry, there is no synonym..."
            }
        }
    } else if (lengthOfSynonyms > 5) {
        for (i = 0; i < 5; i++) {
            if (result[0].meanings[0].synonyms[i] !== "") {
                theSyn.innerHTML += `<li>${result[0].meanings[0].synonyms[i]}</li>` + "<br>"
            } else {
                theSyn.innerHTML = "Sorry, there is no synonym..."
            }
        }
    }
}

function displayDef(result) {
    let lengthOfDef = result[0].meanings[0].definitions.length
    theDef.innerHTML = " "

    if (lengthOfDef === 0) {
        theDef.innerHTML = "Sorry, there is no definition..."
    } else if (lengthOfDef < 5) {
        for (i = 0; i < lengthOfDef; i++) {
            if (result[0].meanings[0].definitions[i] !== "") {
                theDef.innerHTML += `<li>${result[0].meanings[0].definitions[i].definition}</li>` + "<br>"
            } else {
                theDef.innerHTML = "Sorry, there is no definition..."
            }
        }
    } else if (lengthOfDef > 5) {
        for (i = 0; i < 5; i++) {
            if (result[0].meanings[0].definitions[i] !== "") {
                theDef.innerHTML += `<li>${result[0].meanings[0].definitions[i].definition}</li>` + "<br>"
            } else {
                theDef.innerHTML = "Sorry, there is no definition..."
            }
        }
    }
}

function displaySynonyms() {
    theSyn.style.display = "flex"
    theSyn.style.padding = "20px"
    fetchSyn()
}

function displayDefinition() {
    theDef.style.display = "flex"
    theDef.style.padding = "20px"
    displayWord();
}

const send = document.getElementById("valid");
if(send) {
    send.addEventListener("click", displayBtn);
}

const defDescription = document.getElementById('defBtn');
defDescription.addEventListener("click", displayDefinition);

const synDescription = document.getElementById('synBtn');
synDescription.addEventListener("click", displaySynonyms);


function myDate() {
    var now = new Date();
    var mo = now.getMonth();
    var dy = now.getDate();
    var yr = now.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('day').innerHTML =
        months[mo] + " " + dy + "," + " " + yr
}
myDate()

function myTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var ms = today.getMilliseconds();
    m = checkTime(m);
    s = checkTime(s);
    ms = checkTime(ms);
    document.getElementById('time').innerHTML =
        h + ":" + m + ":" + s + ":" + ms;
    var t = setTimeout(myTime, 20);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}
myTime();

var input = document.getElementById("theWord");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("valid").click();
    }
});