//since we are calling this function from within the fetch images function,
// our dogImgUrl variable already has the value of an individual image url.

const renderImg = (dogImgUrl) => {
  let images = document.querySelector('div#dog-image-container')
  let img = document.createElement("img")
  //here we use the .src = to set the value of the address 
  //or URL of the a media resource that is to be considered.
 
  img.src = dogImgUrl
  images.appendChild(img)
} 

const renderBreeds = (breeds) => {
  //We know that we have a ul with an id of dog-breeds so we select that and assign it to a ul variable.
  const ul = document.querySelector('ul#dog-breeds')
  //Since the number of breeds may change I set the while loop to run through to the passed in array's length. 
  //This way if we need to add a new breed we don't have to change this code.
  let i = 0
  while ( i < breeds.length ) {
    //Since the existing ul was empty we want to fill it with all the breed names. 
    //First we create the li element
    let li = document.createElement("li")
    //Then we set the value of the inner text of the li to an individual breed.
    li.innerText = breeds[i]
    //We insert or append the new li element to the existing ul. 
    ul.appendChild(li)
    //Once appended to the ul we add an event listener to the li to listen for clicks and change the 
    //color of the text to blue when a user clicks on one of the li's
    li.addEventListener("click", function(event){
     event.target.style.color = "blue"
    })
    //Here we are incrementing the counter by 1 each pass.
    i++;

  }
}

const filterBreeds = (breeds) => {
  //Again we grab what we know we have and set it to a variable to be able to manipulate it.
  const drpdn = document.getElementById("breed-dropdown")
  //Here I used onchange because it works with select elements and it creates an event when the value of the element has changed. 
  drpdn.onchange = function(){
    let letter = drpdn.value;
    //Here I filter the aray and assign it to a variable
    let newArray = breeds.filter(breed => breed[0] === letter)
    //grab existing ul
    const ul = document.querySelector('ul#dog-breeds')
    //clear the existing content of the ul
    ul.innerHTML = ""
    //fill the ul with the new array contents.
    renderBreeds(newArray);
    //this conditional will allow the user to reset the list to show all breeds.
    //a new option was added to the dropdown in index.html for this to work.
    if (letter === "all") {
      renderBreeds(breeds)
    }
 
  }
}


function fetchImages(imagesUrl) {
  //Here we are fetching our data from a remote API
  return fetch("https://dog.ceo/api/breeds/image/random/4")
  //here we take the response JSON data from the fetch request and convert it to an objec calling .json() on the response.
  .then(resp => resp.json())
  .then(json => {
    //At this point we have an object we can work with so we iterate over the objects properties
    //using the .forEach method and call the renderImg() function on each property thus rendering each image to the screen.
    json.message.forEach(imgUrl => renderImg(imgUrl)) 
    
  });
}

function fetchBreeds(breedUrl) {
  
  return fetch('https://dog.ceo/api/breeds/list/all')
  .then(resp => resp.json())
  .then(json => {
    //here we are creating a new array called breeds that will have only the breed names.
    //We do so with the help of Object.keys() method. 
    //This returns a new array made up of the passed in objects own enumerable property names. 
    let breeds = Object.keys(json.message)
    //here we continue the flow by calling the renderBreeds() and filterBreeds functions and passing them the breeds array.
    renderBreeds(breeds)
    filterBreeds(breeds)
  });
}


// It all starts here. Listen for the document to be loaded.
document.addEventListener("DOMContentLoaded", function() {
//Call fetch functions to start the process.
//fetchBreeds() as the name implies fetches the breeds and passes the json to the 
//renderBreeds() and filterBreeds() functions.
  fetchBreeds()
//fetchImages does just that it fetchesh the images and passes the json to the renderImg() function.
  fetchImages()

});
