console.log('%c HI', 'color: firebrick')

let myData = []

//on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchDogs(), fetchBreeds(), filterDropdown()
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

    for(var i = 0 in breeds) {
        let li = document.createElement('li')
        li.innerHTML = `${i}`
        // font color of a particular <li> changes on click
        li.addEventListener('click', () => li.style.color = "green")
        ul.appendChild(li)
        myData.push(li)
    }
} 

// dropdown filters breeds that start with a particular letter
function filterDropdown() {
    // capture the drop down
    const dropdown = document.getElementById("breed-dropdown");
    const ulAgain = document.getElementById('dog-breeds')

    // capture the selection in the drop down on click
    dropdown.addEventListener("change", (e) => {
        ulAgain.innerHTML = ""

        // iterate through each li breed
        for(const breed of myData) {
            // if the drop down selection value === first letter of li value
            if ( breed.innerText.charAt(0) === e.target.value ) {
                // return list of li's
                ulAgain.appendChild(breed)
            } 
        }
    })
}       
    





