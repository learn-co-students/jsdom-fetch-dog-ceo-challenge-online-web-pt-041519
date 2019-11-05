console.log('%c HI', 'color: firebrick')

//on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchDogs(), fetchBreeds()
})

// fetch the images using the url
function fetchDogs() {
    return fetch('https://dog.ceo/api/breeds/image/random/4')
    // parse the response as JSON
    .then(resp => resp.json())
    .then(json => renderDogs(json))
    }

// add image elements to the DOM for each🤔 image in the array
function renderDogs(json) {
    const div = document.getElementById('dog-image-container')
    let dogs = json.message

    for(let i = 0; i < dogs.length; i++) {
        const img = document.createElement('IMG')
        img.setAttribute("src", `${dogs[i]}`)
        img.setAttribute("width", "150")
        div.appendChild(img)
    }
}

// fetch all the dog breeds using the url
function fetchBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
    // parse the response as JSON
    .then(resp => resp.json())
    .then(json => renderBreeds(json))
}

// add the breeds to the page in an <ul>
function renderBreeds(json) {
    const ul = document.getElementById('dog-breeds')
    let breeds = json.message
    let breed = ""

    for(var i in breeds) {
        let li = document.createElement('li')
        li.innerHTML = `${i}`
        ul.appendChild(li)
    }
}

// font color of a particular <li> changes on click
let color = document.querySelectorAll('li')
    function colorChange () {

    }


    color.addEventListener('click', colorChange);

