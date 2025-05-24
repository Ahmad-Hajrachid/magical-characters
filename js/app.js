const cardContainer = document.getElementById("card-container");
const houseFilter =document.getElementById("houseFilter")
let allCharacters=[];
houseFilter.addEventListener("change",function(){
    const selectedHouse = this.value;
    let filteredCharacters;
    
    if(selectedHouse ==="All"){
        filteredCharacters = allCharacters
    } else {
        filteredCharacters = allCharacters.filter(character => character.house === selectedHouse);
    }
    renderData(filteredCharacters)
})

function fetchData() {

  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => {
      if (!response.ok) {
        throw new Error("the response status is not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Checking what is inside products", data);
      allCharacters= data.slice(0,16);
      renderData(allCharacters);
    })
    .catch((error) => {
      console.log("error catched here", error);
      cardContainer.innerHTML = "<p> error happened in the catch method </p>";
    });
}


function renderData(data) {
    cardContainer.innerHTML ="";
  data.forEach((element) => {
    
    const card = document.createElement("div");
    card.classList.add('card')
    card.setAttribute("data-house", element.house); 
    let renderedImage;

    if(element.image){
        renderedImage = element.image;
    }else {
        renderedImage = "images/not-found.png";
    }
    let BirthDate;

    if(element.dateOfBirth){
        BirthDate = element.dateOfBirth;
    } else {
        BirthDate = "Unknown"
    }

    let house;
    if(element.house == ""){
      house = "Unknown"
      
    } else {
      house = element.house
    }

    
    card.innerHTML = `
<img src="${renderedImage}">
<div class= "card-content">
<p id="name">${element.name}</p>
<p id="house">House: ${house}</p>
<p>Date of Birth: ${BirthDate}</p>
</div>

`;
    cardContainer.appendChild(card);
  });
}

fetchData();