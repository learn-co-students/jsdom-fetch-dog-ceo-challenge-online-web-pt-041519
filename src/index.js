console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = "https://dog.ceo/api/breeds/list/all"
 
function fetchPicture(){
    fetch(imgUrl)
    .then(response => response.json())
    .then(results => pictures(results)) 
}

//fetches 4 images
function pictures(imgs) {
    //console.log(json)
    let dogContainer = document.getElementById("dog-image-container")
    imgs.message.forEach(image => {
        let li = createNode('li'),
            img = createNode('img')  
        img.src = image 
        img.style.width = '300px';
        append(li, img)  
        append(dogContainer, li) 
    });
}
//on page load, fetch all the dog breeds
function breeds(){
     fetch(breedUrl)
     .then(respone => respone.json())
     .then(results => breedsofdog(results)) 
}

function breedsofdog(breedimg){
    let dogBreedContainer = document.getElementById("dog-breeds")
 //   console.log(breedimg.message)
    breeds =  Object.keys(breedimg.message);
    breeds.forEach(name => {
        let li = createNode('li') //create li
            div = createNode('div') //create div
            div.innerText = name  //put name inside div
        append(li, div)  //li inside div
        append(dogBreedContainer, li)  //li inside ul of the id dog-breeds
    });
}

function changeColor(){
    const breeds = document.querySelector("ul#dog-breeds") 
    breeds.addEventListener('click', function(e) {
        e.target.style.color = "magenta";
    })
}

function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
    return parent.appendChild(el);
} 


document.addEventListener('DOMContentLoaded', function() {
    fetchPicture();
    breeds();
    changeColor();
})