let listOfTxt = [];
let inputBox = document.querySelector('#input-el');
let inputSubmit = document.querySelector('#input-btn');
let refreshSubmit = document.querySelector('#refresh-btn');
let inputList = document.querySelector('#input-list')

inputBox.addEventListener("keypress", function(e){
    if (e.key == "Enter"){
        runMain();
    }
})

inputSubmit.addEventListener("click", function(e){
    runMain();
})

refreshSubmit.addEventListener("click", function(e){
    listOfTxt = JSON.parse(localStorage.getItem("saveExList"));
    inputList.innerHTML = "";
    addText(listOfTxt);
})

function addText(listOfTxt){
    for(let i=0; i<(listOfTxt.length); i++){
        if((listOfTxt[i].startsWith("https://"))){
            inputList.innerHTML += "<li><a href='"+listOfTxt[i]+"' target='_blank'>"+listOfTxt[i]+"</a></li>"
        }else if((listOfTxt[i].startsWith("www."))){
            inputList.innerHTML += "<li><a href='https://"+listOfTxt[i]+"' target='_blank'>"+listOfTxt[i]+"</a></li>"
        }else{
            inputList.innerHTML += "<li>"+listOfTxt[i]+"</li>"
        }
    }
}

function runMain(){
    if (inputBox.value){
        if(listOfTxt.length == 10){listOfTxt.shift()}
        listOfTxt.push(inputBox.value);
        localStorage.setItem("saveExList", JSON.stringify(listOfTxt));
        listOfTxt = JSON.parse(localStorage.getItem("saveExList"));
        inputList.innerHTML = "";
        addText(listOfTxt);
        inputBox.value = "";
    }
}