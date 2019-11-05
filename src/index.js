console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"


document.addEventListener('DOMContentLoaded', function () {
    fetchImages()
    fetchBreed()
    addDropDown()
})

function fetchImages() {
    fetch(imgUrl)
      .then(resp => resp.json())
      .then(json => renderImages(json))
  }
  
function renderImages(json) {
    const div = document.getElementById('dog-image-container')
    json.message.forEach(image => {
        const img = document.createElement('img')
        img.src = image
        img.style = "width:25%;"
        //debugger
        div.appendChild(img)
    })
}

function fetchBreed() {
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => renderBreeds(json))
}

function renderBreeds(json) {
    const ul = document.querySelector('#dog-breeds');
    const object1 = json.message
    for ( name in object1) {
        const li = document.createElement('li')
        if (object1[name] != "") {
            li.innerHTML = ` ${name}: sub types => ${object1[name]} `
            ul.appendChild(li)
        } else {
            li.innerHTML = `${name}`
            ul.appendChild(li) 
        }
        li.addEventListener('click', function() {this.style.color = 'red';})
    }
}
function addDropDown(){
    const dropDownBox = document.querySelector("#breed-dropdown");
    dropDownBox.addEventListener("change", (e) => {
        const letter = e.target.value;
        const breedList = document.querySelectorAll("li");
        breedList.forEach(liTag => {
            if (liTag.innerText.startsWith(letter)){
                liTag.hidden = false;
            } else {
                liTag.hidden = true;
            }
        });
    });
}






