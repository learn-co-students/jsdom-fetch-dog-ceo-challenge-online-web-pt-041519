console.log('%c HI', 'color: firebrick')
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', function() {
    sortBreeds()
 
// Fetch images from imgUrl
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => showImgs(json))

// Render images from imgUrl in the DOM
    function showImgs(json) {
        const imgDiv = document.querySelector('div#dog-image-container')
        json.message.forEach(image => {
            const img = document.createElement('img')
            img.src = image
            img.style.width = '200px'
            imgDiv.appendChild(img)
        })
    }

// Fetch all breeds from breedUrl
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => showBreeds(json))

// Render list of all breeds from breedUrl in the DOM
    function showBreeds(json) {
        const breedUl = document.querySelector('ul#dog-breeds')
        for (breed in json.message) {
            const newLi = document.createElement('li')
            if (json.message[breed] != '') {
                newLi.innerText = `${breed} (${json.message[breed]})`
                breedUl.appendChild(newLi)
            } else {
                newLi.innerText = `${breed}` 
                breedUl.appendChild(newLi)
            }
            newLi.addEventListener('click', function() {
                this.style.color = 'lightgray'
            })
        }
    }

// Sort breeds alphabetically based on dropdown selection
    function sortBreeds() {
        const dropdown = document.querySelector('#breed-dropdown')
        dropdown.addEventListener('change', function(e) {
            const letter = e.target.value 
            const listBreeds = document.querySelectorAll('li')
            listBreeds.forEach(item => {
                if (item.innerText.startsWith(letter)) {
                    item.hidden = false
                } else {
                    item.hidden = true
                }
            })
        })
    }    

})
