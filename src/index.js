// console.log('%c HI', 'color: firebrick')

// document.addEventListener('DOMContentLoaded', (event) => {
//     dogsImageFetch()
//     dogsBreedFetch()

//     const input = document.getElementById('dog-breeds');
//     input.addEventListener('click', colorChange)

//     function colorChange(e){
//         e.target.style.color = "red"
//     };
//     });


//     function dogsImageFetch() {
//         const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
//         const container = document.querySelector("#dog-image-container")
//         fetch(imgUrl)
//         .then(res => res.json())
//         .then(json => {
//             container.innerHTML = dogsHTML(json.message)
//         })
//         const dogPhoto = (dogObj) => {
//             return (`
//                 <img src="${dogObj}">
//             `)
//         }
//         const dogsHTML= (dogArr) => {
//             return dogArr.map(d => dogPhoto(d)).join('')
//         }
//     }


    
//     function dogBreedsFetch() {
//         const breedUrl = 'https://dog.ceo/api/breeds/list/all'
//         const container = document.querySelector()
//         fetch(breedUrl)
//         .then(res => res.json())
//         .then(json => {
//             container.innerHTML = breedsHTML(json.message)
//         })

//     }
        
    
    
    
    
    
    
//     // const breedsHTML = 




const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

document.addEventListener("DOMContentLoaded", () => {
    fetchDogPhoto()
    fetchBreeds()
})


async function fetchDogPhoto(){
    try{
        let response = await fetch(imgUrl)
        const dogJson = await response.json()
        dogJson.message.forEach(el => {
            renderImage(el)
        })
    }catch(error){
        console.log(error)
    }
}


function renderImage(el){
    const dogImage = document.getElementById("dog-image-container")
    const imageElement = document.createElement("img")
    imageElement.src = el
    dogImage.appendChild(imageElement)
}



const breedUrl = 'https://dog.ceo/api/breeds/list/all'
// const dogBreed = document.getElementById("dog-breeds")

async function fetchBreeds(){
    try{
        const breedResponse = await fetch(breedUrl)
        const breedJson = await breedResponse.json()
        const breeds = Object.keys(breedJson.message)
        breeds.forEach(breed =>{
            renderBreed(breed)
        })
        filterWithDropdown(breeds)
    }catch(error){
        console.log(error)
    }
}

function renderBreed(el){
    const dogBreed = document.getElementById("dog-breeds")
    const breedElement = document.createElement("li")
    breedElement.innerText = el
    changeColor(breedElement)
    dogBreed.appendChild(breedElement)
}

function changeColor(breed){
    breed.addEventListener("click", (e) => {
        e.target.style.color = "#bada55"
    })
}


function filterWithDropdown(breeds){
    const breedDropdown = document.getElementById("breed-dropdown")
    const dogBreed = document.getElementById("dog-breeds")
    breedDropdown.onchange = () => {
        let letterSelected = breedDropdown.value
        let filteredBreeds = breeds.filter(breed => {
            return breed[0] === letterSelected
        })
        dogBreed.innerHTML = ""
        console.log(dogBreed.innerHTML)
        
        filteredBreeds.forEach(breed => {
            renderBreed(breed)
            console.log(breed)
        })
    }
}