function fetchDogs() {
    // const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    return fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
      return response.json();
    })
    .then(function(dogs) {
      renderDogs(dogs);
    });
  }

function renderDogs(json) {
    const dogImages = document.getElementById('dog-image-container')
    let array = json['message']
    for  (let i = 0; i < array.length; i++) {
        const img = document.createElement('img')
        img.src = `${array[i]}`
        img.height = 150;
        img.width = 150;
        dogImages.appendChild(img)
    }
}
    
function fetchAllDogs() {
    // const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    return fetch('https://dog.ceo/api/breeds/list/all')
    .then(function(response) {
      return response.json();
    })
    .then(function(dogs) {
        listDogs(dogs)
    })
    .then(function(){
        let liList = document.querySelectorAll('li')
        for (let li of liList) {
            li.addEventListener("click", (e) =>  e.target.style.color = 'red')
        } 
    })
}
  
let storedDogs = []


function listDogs(json) {
    const dogList = document.getElementById('dog-breeds')
    let keys = Object.keys(json['message'])
    for (let el of keys) {
        const li = document.createElement('li')
        li.innerHTML = `${el}`
        dogList.appendChild(li)
        storedDogs.push(el)
    }
}


function filterListByLetter() {
    let dropdown = document.getElementById("breed-dropdown");
    dropdown.addEventListener('change', (e) => {
        // alert(`You  selected: ${ e.target.value }`);
        const dogList = document.getElementById('dog-breeds')
        while( dogList.hasChildNodes() ){
            dogList.removeChild(dogList.lastChild);
        }
        // dogList.childNodes.forEach( (li) => li.remove() )
        // for (let dog of storedDogs) {
        //     dogList.removeChild(dogList.childNodes[0])
        // }
        let filteredDogs = storedDogs.filter( dog => dog.startsWith(e.target.value))
        for (let dog of filteredDogs) {
            const li = document.createElement('li')
            li.innerHTML = `${dog}`
            dogList.appendChild(li)
        }
        // console.log(filteredDogs)
    })
}



  // DOMContentLoaded 
  document.addEventListener('DOMContentLoaded', function() {
    fetchDogs()
  })

  document.addEventListener('DOMContentLoaded', function() {
    fetchAllDogs()
  })

  document.addEventListener('DOMContentLoaded', function() {
    filterListByLetter()
  })




// dropdown.addEventListener("change", (event) => event.selectedIndex 

// console.log(e) //re-render tthe list by usinng a fucntion to.....removeChild


//   alert.log(`activities.options[activities.selectedIndex].value = ${ activities.options[activities.selectedIndex].value }`);
