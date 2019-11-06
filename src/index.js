let myData

// After DOM load, fetch dog images
document.addEventListener('DOMContentLoaded', function() {
  fetchImgs();
  fetchBreeds();

  const selectList = document.getElementById("breed-dropdown");
  // Show filtered breed list on select list change
  selectList.addEventListener('change', function(e) {
    // alert(e.target.value);
    fetchBreeds(e.target.value);
  });
})

// Get 4 dog images and call insertImgs
function fetchImgs() {
  let imgs;
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(json => insertImgs(json))  
}

// Insert images from api into DOM
function insertImgs(json){
  // console.log(json)
  const dogImgs = document.querySelector('div#dog-image-container') ;
  json.message.forEach(dogImage => {
    const img = document.createElement('img');
    img.src = dogImage;
    img.style.width = '300px';
    img.style.maxHeight = '300px';
    dogImgs.appendChild(img);
  });
}


// Get breeds and call insertBreeds
function fetchBreeds(selectedBreed = 'all') {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(json => insertBreeds(json, selectedBreed))
}

// Insert breeds into list
function insertBreeds(json, selectedBreed){
  const breeds = Object.keys(json.message)  ;
  const dogList = document.querySelector('ul#dog-breeds');

  // Clear bullet list before writing new one
  dogList.innerHTML = '';

  // Iterate through breeds to display
  breeds.forEach(breed => {
    const li = document.createElement('li');

    // If selectedBreed is a character, only show breed that starts with that character
    if (selectedBreed !== 'all') {
      if (breed.charAt(0) === selectedBreed) {
        li.innerText = breed;
        dogList.appendChild(li);
      }
    } else {
      li.innerText = breed;
      dogList.appendChild(li);
    }
  });

  // Change background color on breed click
  dogList.addEventListener('click', function(e) {
    // myData = e
    e.target.style.background = '#00ff00';
  });
}


