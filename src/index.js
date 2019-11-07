console.log('%c HI', 'color: firebrick')

// functions to run after everything loads
document.addEventListener("DOMContentLoaded", function(){
  fetchImg();
  fetchBreed();
  filterBreeds();
})

// urls for the doggo stuff
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';


// fetches the image url
function fetchImg(){
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => json.message.forEach(element => 
    addImgToDom(element)
  ));
}


// add image to the container
function addImgToDom(image){
  let imgContainer = document.getElementById("dog-image-container");
  let newImage = document.createElement("img");
  newImage.src = image;
  imgContainer.appendChild(newImage);
}


// Fetches their breed using the url
function fetchBreed(){
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(json => {
    breeds = Object.keys(json.message);
    breeds.forEach(breed => {
      addBreedToDom(breed);
    });
  })
}


// adds breed to container ul
function addBreedToDom(breed){
  let breedContainer = document.getElementById("dog-breeds");
  let newEl = document.createElement("li");
  newEl.innerText = breed;
  changeColor(newEl);
  breedContainer.appendChild(newEl);
}


// change color on click
function changeColor(breed){
  breed.addEventListener("click", (e) => {
    e.target.style.color = 'orange';
    alert("Wubba Lubba Dub Dub!");
  });
}


// NOT WORKING THE WAY I WANT IT..DFASDFASDHFASFHASDFASDKFASDFASDFJKERTT
function filterBreeds(){
  
  const dropDown = document.getElementById('breed-dropdown');
  // console.log(allBreeds);

  dropDown.addEventListener("change", (e) => {
    const allBreeds = document.querySelectorAll('li');
    allBreeds.forEach(breed => {
      // console.log(e.target.innerText)
      if (breed.innerText.charAt(0) ===  e.target.value) {
        breed.style.visibility = 'visable';
      } else {
        breed.style.visibility = 'hidden';
      }
    })
  })
}