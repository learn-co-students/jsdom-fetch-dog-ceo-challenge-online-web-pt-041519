console.log('%c HI', 'color: firebrick')
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'


document.addEventListener('DOMContentLoaded', function() {
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => showImgs(json))

    function showImgs(json) {
        const imgDiv = document.querySelector('div#dog-image-container')
        json.message.forEach(image => {
            const img = document.createElement('img')
            img.src = image
            img.style.width = '200px'
            imgDiv.appendChild(img)
        })
    }

    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => showBreeds(json))

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

    function sortBreeds() {
        const dropDown = document.querySelector('#breed-dropdown')
        dropDown.addEventListener('change', function(e) {
            const letter = e.target.value 
            const breedByLetter = document.querySelectorAll('li')
            breedByLetter.forEach(item => {
                if (item.innerText.startsWith(letter)) {
                    item.hidden = false
                } else {
                    item.hidden = true
                }
            })
        })
    }

})



