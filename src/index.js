console.log('%c HI', 'color: firebrick')


const imgURL = "https://dog.ceo/api/breeds/image/random/4"
const breedsURL = 'https://dog.ceo/api/breeds/list/all'
let breedsMemo = []

const breedsHTML = (name) => {
    return `<li>${name}</li>`
}

const imgHTML = (src) => {
    return `<img src=${src}>`
}


const renderBreeds = () => {
    fetch(breedsURL)
        .then(res => res.json())
        .then(json => {
            breeds = Object.keys(json.message)
            displayBreeds(breeds)
        })
}

const displayBreeds = (breeds) => {
    const breedElements = breeds.map(name => breedsHTML(name)).join('')
    const ul = document.querySelector('#dog-breeds')
    ul.innerHTML = breedElements
}

const renderImages = () => {
    fetch(imgURL)
        .then(res => res.json())
        .then(json => {
            const elements = json.message.map(src => {
                return imgHTML(src)
            }).join('')
            const container = document.querySelector('#dog-image-container')
            container.innerHTML = elements
        })
}




document.addEventListener('DOMContentLoaded', () => {

    renderImages()
    renderBreeds()

    const dropdown = document.querySelector('select#breed-dropdown')
    const ul = document.querySelector('#dog-breeds')
    ul.addEventListener('click', (e) => {
        if(e.target.tagName == "LI"){
            e.target.style.color = "blue"
        }
    })

    dropdown.onchange = (e) => {
        displayBreeds(breeds.filter(b => b.toLowerCase()[0] === e.target.value))
    }



})
