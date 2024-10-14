const searchDrink = document.getElementById("input");
const search = document.getElementById("search");
const details = document.getElementById("details");
const noDrink = document.getElementById("noDrink");
const drinkWrapper = document.querySelector(".drink-wrapper");

search.addEventListener("click", fetchDrink);

function fetchDrink() {
  if (searchDrink.value) {
    console.log(searchDrink.value);
    let URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchDrink.value}`;
    fetch(URL)
      .then((res) => res.json())
      .then((drinks) => showDrink(drinks.drinks));
    noDrink.style.display = "none";
    drinkWrapper.innerHTML = "";
  } else {
    alert("Search a drink first");
    noDrink.style.display = "block";
  }
}

function showDrink(drinks) {
  console.log("Show Drink:", drinks);
  for (let drink of drinks) {
    drinkWrapper.innerHTML += `
      <div class="drinks-name border border-gray-500">
        <img
          src=${drink.strDrinkThumb}
          alt=${drink.strDrink}
          class="rounded h-[200px] w-full object-cover"
        />
        <div class="p-3">
          <h3 class="heading">${drink.strDrink}</h3>
          <p class="text-gray-300 my-2">
          ${drink.strInstructions.slice(0, 60)}....
          </p>
          <p class="italic text-black">
            ${drink.strGlass}
          </p>
          <div class="mt-5 my-4">
            <a href=${drink.strYoutube} target="_blank" class="btn">Watch</a>
            <button class="px-5 text-white" onclick="lookUpDetails('${
              drink.idDrink
            }')" >View Drink</button>
          </div>
        </div>
      </div>
    `;
  }
}

function lookUpDetails(id) {
  console.log("Look Up:", id);
  let URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((drinks) => showDrinkDetails(drinks.drinks[0]));
}

function showDrinkDetails(drink) {
  console.log(drink);
  details.classList.add("visible");
  details.classList.remove("invisible");

  details.innerHTML = `
    <div class="popup bg-white w-[70%] min-h-[500px] p-10">
      <h2 class="text-2xl font-bold mb-4  ">Drinks Name: ${drink.strDrink}</h2>
      <h3 class="text-2xl font-semi-bold italic mb-4">Drinks Ingradiants: ${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}, ${drink.strIngredient4}, ${drink.strIngredient5}.... </h3>
  
      <p class="mb-6">Instructions: ${drink.strInstructions}</p>
      
      
      <a href=${drink.strYoutube}
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Watch
      </a>
      <button class="ml-[20px]" onclick="closeDetails()">Close</button>
    </div>
  `;
}

function closeDetails() {
  details.classList.add("invisible");
  details.classList.remove("visible");
}
