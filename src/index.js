document.addEventListener("DOMContentLoaded", function() {

    // CHALLENGE 1 - SHOW 4 RANDOM DOG IMAGES 

    // Set API url && grab container to be modified.
    const imgUrl = "https://dog.ceo/api/breeds/image/random/7";
    const imgContainer = document.getElementById('dog-image-container');

    // Fetch images from API && append each image to the imgContainer.
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => {
            for (let i = 0; i < json.message.length; i++) { 
                let newImg = document.createElement('img');
                newImg.src = json.message[i];
                newImg.style.width = '200px';
                imgContainer.appendChild(newImg);
            }
        });



    // CHALLENGE TWO - GET ALL DOG BREEDS
    // CHALLENGE THREE - CHANGE TEXT COLOR OF BREED ON CLICK (integrated)

    // set API url && grab elements to be modified.
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    const breedSelect = document.getElementById('dog-breeds'); // element for list of dogs
    const filterSelection = document.getElementById('breed-dropdown'); // element for selection dropdown menu
    const pageBody = document.querySelector('body'); // page body (to erase 'no breeds' child if necessary)

    // Function to generate a random color (from preseleced list) to change font color on click.
    function randomColor() {
        const colors = ["palevioletred", "lightsalmon", "gold", "mediumaquamarine", "powderblue", "plum", "pink"]
        let index = Math.floor(Math.random() * (7 - 0)) + 0; // Generate a random number between 0 - 6
        return colors[index];
    };

    // Function to turn the selected index (from the filterSelection dropdown) into the corresponding letter.
    function getLetter(selectedIndex) {
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        return alphabet[selectedIndex - 1]; // must subtract 1 because index 0 is "all".
    };

    // Function to clear previously listed breeds or "no breed" message.
    function clearBreedList() {
        while (breedSelect.firstChild) {
            breedSelect.removeChild(breedSelect.firstChild);
        }
        if (pageBody.lastChild.tagName == 'P') { 
            pageBody.removeChild(pageBody.lastChild); 
        }
    };

    // Function to fetch all breeds and return an array of all breeds as strings.
    async function fetchBreedList() {
        let response = await fetch(breedUrl);
        let data = await response.json();
        
        let breedArray = [];
        for (ea in data.message) {
            if (data.message[`${ea}`].length == 0) {
                breedArray.push(`${ea}`);
            } else { // breed contains sub-breeds; must extract and concatenate to include all sub breeds
                let subBreeds = `${data.message[ea]}`.split(",");
                for (variation of subBreeds) { breedArray.push(`${ea} - ${variation}`); }
            }
        }
        return breedArray;
    };

    // Function to create a new <li> element in preparation adding breeds to the list.
    function createNewBreedLi(breed) {
        let newLi = document.createElement('li');
        newLi.innerText = breed;
        return newLi;
    };

    // Function to append a new breed <li> to the list of breeds.
    // Include listener to change color of breed on click - using #randomColor()
    function createNewBreedChild(breed) {
        let newChild = createNewBreedLi(breed);
        newChild.addEventListener("click", function() { this.style.color = randomColor(); });
        breedSelect.appendChild(newChild);
    };


    // CHALLENGE FOUR - ADD FILTERING ABILITY

    // Fetch the full list of breeds, then use #createNewBreedChild() to append all breeds to list.
    function listAllBreeds() {
        fetchBreedList().then(value => { 
            for (breed of value) { createNewBreedChild(breed) } 
        });
    };

    // Fetch full list of breeds, then filter by the selected letter and append matching breeds to breed list using #createNewBreedChild().
    // If no breeds match selected letter, append <p> to body with appropriate message.
    function listFilteredBreeds(letter) {
        fetchBreedList().then(value => {
            let breedCount = 0;

            for (breed of value) {
                if (breed[0] == letter) { 
                    createNewBreedChild(breed);
                    breedCount += 1;
                }
            }
            if (breedCount == 0) {
                let newChild = document.createElement('p');
                newChild.innerText = `No breeds begin with the letter "${letter}".`
                pageBody.appendChild(newChild);
            }
        })
    }

    // Add event listener for a change in the filter dropdown.
    // First clear all previously listed items, then add new items based on selection.
    filterSelection.addEventListener("change", function(e) {
        if (filterSelection.selectedIndex == 0) {
            clearBreedList();
            listAllBreeds();
        } else {
            let selectedLetter = getLetter(filterSelection.selectedIndex);
            clearBreedList();
            listFilteredBreeds(selectedLetter);  
        }
    });

    // Initial call to list all breeds so that first page load has breeds listed.
    listAllBreeds();
        
})