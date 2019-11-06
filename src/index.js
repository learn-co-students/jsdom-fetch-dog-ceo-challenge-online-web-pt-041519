console.log('%c HI', 'color: firebrick')

function images() {
    return fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => addImageElement(json));
}

function addImageElement(json) {
    const body = document.querySelector('body')
    json.message.forEach(image => {
        const imageElement = document.createElement('img')
        imageElement.src = `${image}`
        body.appendChild(imageElement)
    })
}

function breeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(json => addBreeds(json));
}

function addBreeds(json) {
    ul = document.getElementById('dog-breeds')
    hash = json.message

    for(var index in hash) {
        li = document.createElement('li')
        li.textContent = `${index}`
        ul.appendChild(li)
      }
    }


function filterBreeds() {    
    let breedDropDown = document.getElementById("breed-dropdown")
    let selectedOption = breedDropDown.options[breedDropDown.selectedIndex].text
    
    document.querySelectorAll('#dog-breeds li').forEach(li => {
        li.style.visibility = 'visible'
    })

    document.querySelectorAll('#dog-breeds li').forEach(li => {
        if (!li.textContent.startsWith(selectedOption)) {
            li.style.visibility = 'hidden'
                }
            })
        }


function change() {
    document.getElementById('breed-dropdown').onchange = function() {filterBreeds()}
}

function changeColor() {
    document.getElementById('dog-breeds').addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "LI") {
            e.target.style.color = "red"
        }
    })
}

function changeLiColor() {
    console.log("test")
}

document.addEventListener('DOMContentLoaded', function() {
    images()
    breeds()
    change()
    changeColor()
  })