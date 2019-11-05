console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

document.addEventListener("DOMContentLoaded", function(){
    fetchImg();
    fetchBreed();
    addDropDown();
});

function fetchImg(){
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => renderImg(json));
}

function renderImg(json){
    const imgContainer = document.querySelector("#dog-image-container");
    const imgArray = json.message;
    // console.log(imgArray); // array
    imgArray.forEach(img => {
        const imgTag = document.createElement("img");
        imgTag.src = img;
        imgContainer.appendChild(imgTag);
    });
}

function fetchBreed(){
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => renderBreed(json));
}

function renderBreed(json){
    const breedObject = json.message;
    const breedContainer = document.querySelector("#dog-breeds");
    // console.log(breedObject); // object
    for (breed in breedObject){
        // console.log(breed)
        const breedList = document.createElement("li");
        breedList.innerText = breed;
        breedContainer.appendChild(breedList);
        changeColor(breedList);
    }
}

function changeColor(breedList){
    breedList.addEventListener("click", (e) =>{
        // console.log(e.target);
        e.target.style.color = "red";
    });
}

function addDropDown(){
    const dropDownBox = document.querySelector("#breed-dropdown");
    // console.log(dropDownBox);
    dropDownBox.addEventListener("change", (e) => {
        // console.log(e.target.value);
        const letter = e.target.value;
        const breedList = document.querySelectorAll("li");
        // console.log(breedList);
        breedList.forEach(liTag => {
            if (liTag.innerText.startsWith(letter)){
                liTag.hidden = false;
            } else {
                liTag.hidden = true;
            }
        });
    });
}