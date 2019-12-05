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
  }
  
  function listDogs(json) {
    const dogList = document.getElementById('dog-breeds')
    let keys = Object.keys(json['message'])
    for (let el of keys) {
        const li = document.createElement('li')
        li.innerHTML = `${el}`
        dogList.appendChild(li)
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    fetchDogs()
  })

  document.addEventListener('DOMContentLoaded', function() {
    fetchAllDogs()
  })


let listItems = document.querySelectorAll('li')
listItems.foreach(el => el.addEventListener('click', (e) => e.target.style.color = 'red'))

// document.getElementsByTagName('ul').addEventListener('click', (e) => e.target.style.color = 'red')


let list = document.querySelectorAll('li')

console.log(list)


// let e = document.querySelectorAll("#breed-dropdown option");
// let result = e.options[e.selectedIndex].value;
// 	alert(`You selected: ${result}`);
