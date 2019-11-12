console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"

document.addEventListener("DOMContentLoaded", function() {
    fetchImage()
    fetchBreed()
    addDropDownMenu()
})

function fetchImage() {
    fetch(imgUrl)
    .then(resp => resp.json)
    .then(resp => imgAttach(json))
}


function imgAttach(json) {
    const dogContainer = document.querySelector("dog-image-container")
    const dogImageArr = json.message
    dogImageArr.forEach(img => {
       const imgTag = document.createElement("img")
       imgTag.src = img
       dogContainer.appendChild("img")
    })
}
 

function fetchBreed() {
    fetch(breedUrl)
    .then(resp => resp.json)
    .then(resp => breedList(json))
}

function breedList(json){
    const breedObj = json.message
    const breedContainer = document.querySelector("dog-breeds")
    for (breed in breedObj){
        const breedLi = document.createElement("li")
        breedLi.innerText = breed
        breedContainer.appendChild("breedLi")
        colorSwap(breedLi)
    }
}

function colorSwap(breedLi){
    breedLi.addEventListener("click", (e) => {
        e.target.style.color = "red"
    })
}

function addDropDownMenu(){
    const dropDownMenu = document.querySelector("#breed-dropdown")
    dropDownMenu.addEventListener("change", (e) => {
        const letter = e.target.value
        const breedLi = document.querySelectorAll("li")
        breedLi.forEach(liTag => {
            if (liTag.innerText.startsWith(letter)){
                liTag.hidden = false
            } else {
                liTag.hidden = true
            }
        })

    })
}
