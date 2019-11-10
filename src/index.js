console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    loadBreeds();
})
function loadImages() {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
    fetch(imgUrl)
        .then(res => res.json())
        .then(json => {
            json.message.forEach(url => addImage(url))
        })

}

function addImage(url) {
    let dogContainer = document.getElementById('dog-image-container');
    let newImage = document.createElement('img');
    newImage.src = url;
    dogContainer.appendChild(newImage);
}

function loadBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(res => res.json())
    .then(json => {
        breeds = Object.keys(json.message)
        updateBreedList(breeds);
        filterDogBreeds();
    })
}

function addBreedToList(dogName) {
    let list = document.getElementById('dog-breeds');
    let newLI = document.createElement('li');
    newLI.innerText = dogName;
    list.appendChild(newLI);
    newLI.addEventListener('click', changeColor)
}

function changeColor(event) {
    event.target.style.color = 'blue'
}

function filterDogBreeds() {
    let dropDown = document.getElementById('breed-dropdown');
    dropDown.addEventListener('change', function(e) {
        selectBreedsStartingWith(event.target.value);
    });
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function updateBreedList(breeds)  {
    let list = document.getElementById('dog-breeds');
    removeChildren(list); 
    breeds.forEach(breed => addBreedToList(breed));
}

function removeChildren(list) {
    let child = list.lastElementChild; 
    while (child) {
        list.removeChild(child); 
        child = list.lastElementChild;
    }
}