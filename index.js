let listOfTxt = [];
let inputBox = document.querySelector('#input-el');
let inputSubmit = document.querySelector('#input-btn');
let inputList = document.querySelector('#input-list');
let clrSubmit = document.querySelector('#clr-btn');
let urlBtn = document.querySelector('#url-btn');

inputBox.addEventListener("keypress", function(e){
    if (e.key == "Enter"){
        runMain();
    }
})

inputSubmit.addEventListener("click", function(e){
    runMain();
})

function addText(listOfTxt){
    for(let i=0; i<(listOfTxt.length); i++){
        if((listOfTxt[i].startsWith("https://"))){
            inputList.innerHTML += `<li><a href='${listOfTxt[i]}' target='_blank'>${listOfTxt[i]}</a></li>`;
        }else if((listOfTxt[i].startsWith("www."))){
            inputList.innerHTML += `<li><a href='https://${listOfTxt[i]}' target='_blank'>${listOfTxt[i]}</a></li>`;
        }else if((listOfTxt[i].startsWith("http://"))){
            inputList.innerHTML += `<li><a href='${listOfTxt[i]}' target='_blank'>${listOfTxt[i]}</a></li>`;
        }else{
            inputList.innerHTML += `<li> ${listOfTxt[i]} </li>`;
        }
    }
}

function runMain(){
    if (inputBox.value){
        setItemToSave(inputBox.value);
    }
}

function setItemToSave(item){
    if(!listOfTxt){
        listOfTxt = [];
    }
    if(listOfTxt.length == 10){listOfTxt.shift()}
    listOfTxt.push(item);
    localStorage.setItem("saveExList", JSON.stringify(listOfTxt));
    listOfTxt = JSON.parse(localStorage.getItem("saveExList"));
    inputList.innerHTML = "";
    addText(listOfTxt);
    inputBox.value = "";
}

function runRefresh(){
    listOfTxt = JSON.parse(localStorage.getItem("saveExList"));
    inputList.innerHTML = "";
    addText(listOfTxt);
}

clrSubmit.addEventListener('dblclick', function(e){
    listOfTxt = [];
    localStorage.setItem("saveExList", JSON.stringify(listOfTxt));
    inputList.innerHTML = "";
})
window.addEventListener("load", function(){
    runRefresh();
})

urlBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url = tabs[0].url;
        setItemToSave(url);
    });
});