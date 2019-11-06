let dogArray = [];

// After DOM load, fetch dog images
document.addEventListener('DOMContentLoaded', function() {
  fetchImgs();
  fetchBreeds();

  const selectList = document.getElementById("breed-dropdown");
  // Display filtered breed list on select list change
  selectList.addEventListener('change', function(e) {
    displayBreeds(e.target.value);
  });

  // Change background color on breed click
  const dogListThree = document.querySelector('ul#dog-breeds');
  dogListThree.addEventListener('click', function(e) {
    e.target.style.background = '#00ff00';
  });

})

// Get 4 dog images and call insertImgs
function fetchImgs() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(results => insertImgs(results))  
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
  .then(results => insertBreeds(results))
}

// Insert breeds into list
function insertBreeds(json){
  const breeds = Object.keys(json.message);
  const dogList = document.querySelector('ul#dog-breeds');

  // Iterate through breeds to display
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.innerText = breed;
    dogList.appendChild(li);
    dogArray.push(li);
  });
}

// Display filtered list
function displayBreeds(selectedBreed){
  // const breeds = Object.keys(json.message) ;
  const dogListTwo = document.querySelector('ul#dog-breeds');

  // Clear bullet list before writing new one
  dogListTwo.innerHTML = '';

  dogArray.forEach(breed => {
    // If selectedBreed is a character, only show breed that starts with that character
    if (selectedBreed !== 'all') {
      if (breed.innerText.charAt(0) === selectedBreed) {
        dogListTwo.appendChild(breed);
      }
    } else {
      dogListTwo.appendChild(breed);
    }
  });
}