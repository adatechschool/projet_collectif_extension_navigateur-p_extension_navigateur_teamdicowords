document.addEventListener("mouseup", selectWord);
let wordToDefine

function selectWord() {
    wordToDefine = window.getSelection().toString();
    console.log(wordToDefine)
}