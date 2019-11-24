console.log('%c HI', 'color: firebrick')

// on page load....
document.addEventListener('DOMContentLoaded', function() {
   fetchImages()
   fetchDogBreeds()
})


// function to fetch images from api, return them as JSON, pass them in to insert images function
function fetchImages() {
   fetch('https://dog.ceo/api/breeds/image/random/4')
   .then(resp => resp.json())
   .then(results => {
      console.log(results)
      results.message.forEach(imgUrl => insertImages(imgUrl))
   })
}

// function to insert each image from the api into the DOM 
function insertImages(dogPicUrl) {
   // grabs the dog-image-container
   let container = document.getElementById('dog-image-container')
   let newDogImg = document.createElement('img')
   newDogImg.src = dogPicUrl
   container.appendChild(newDogImg)
}

// challenge #2: fetch dog breeds 
function fetchDogBreeds() {
   const breedUrl = 'https://dog.ceo/api/breeds/list/all'
   fetch(breedUrl)
   .then(resp => resp.json())
   .then(results => {
      
      // the breeds are stored in  an object the JSON's message, so we can't just forEach it like with the fetchImages function
      breeds = Object.keys(results.message)
      // console.log(breeds)
      renderBreeds(breeds)
      filterBreeds(breeds)
   })
}

// render the dog breeds
function renderBreeds(array) {
   const ul = document.querySelector('ul#dog-breeds')
   
   // loop thru the array of dog, create an li, then append the li to the ul
   array.forEach(breed => {
      let li = document.createElement('li')
      li.className = "dog-breed"
      li.innerText = breed
      ul.appendChild(li)

      // event listener to change the color of the li text once you click on it
      li.addEventListener('click', function(event) {
         event.target.style.color = 'red'
      })
   })
}

// very annoying.....still gotta finish this piece

const filterBreeds = (breeds) => {
   // grab what we know we have and set it to a variable to be able to manipulate it.
   const drpdn = document.getElementById("breed-dropdown")
   // Used onchange because it works with select elements and it creates an event when the value of the element has changed. 
   drpdn.onchange = function(){
     let letter = drpdn.value;
     // Filter the array, set it to a new variable
     let newArray = breeds.filter(breed => breed[0] === letter)
     // grab existing ul
     const ul = document.querySelector('ul#dog-breeds')
     // clear the existing content of the ul
     ul.innerHTML = ""
     // fill the ul with the new array contents.
     renderBreeds(newArray);
     // this conditional will allow the user to reset the list to show all breeds.
     //a new option was added to the dropdown in index.html for this to work.
     if (letter === "all") {
       renderBreeds(breeds)
     }
  
   }
 }