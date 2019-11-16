console.log('%c HI', 'color: firebrick')

// functions to run after everything loads
document.addEventListener("DOMContentLoaded", function(){
  fetchImg();
  fetchBreed();
  // filterBreeds();
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
    // breeds.forEach(breed => {
    //   addBreedToDom(breed);
    // })
    addBreedToDom(breeds);
    filterBreeds(breeds);
  })
}


// adds breed to container ul
function addBreedToDom(breeds){

  let i = 0
  while (i < breeds.length) {
    let ul = document.getElementById("dog-breeds");
    let newEl = document.createElement("li");
    newEl.innerText = breeds[i]
    changeColor(newEl);
    ul.appendChild(newEl);
    i++;
  }
  

  // breeds.forEach(breed => {

  //     let breedContainer = document.getElementById("dog-breeds");
  //     let newEl = document.createElement("li");
  //     newEl.innerText = breed;
  //     changeColor(newEl);
  //     breedContainer.appendChild(newEl);

  // });
}


// change color on click
function changeColor(breed){
  breed.addEventListener("click", (e) => {
    e.target.style.color = 'orange';
    alert("Wubba Lubba Dub Dub!");
  });
}


// NOT WORKING THE WAY I WANT IT..DFASDFASDHFASFHASDFASDKFASDFASDFJKERTT
function filterBreeds(breeds){

  const dropDown = document.getElementById('breed-dropdown');
  dropDown.onchange = () => {
    let letter = dropDown.value;
    let filteredBreeds = breeds.filter(breed => breed[0] === letter);
    // console.log(filteredBreeds)
    const ul = document.getElementById("dog-breeds");
    ul.innerHTML = '';
    addBreedToDom(filteredBreeds);
    
  };
};