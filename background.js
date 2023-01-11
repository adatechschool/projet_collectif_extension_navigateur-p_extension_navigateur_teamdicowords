// document.addEventListenner("mouseup", selectWord);

function selectWord() {
    let selectText = window.getSelection().toString();
    console.log(selectText);
}