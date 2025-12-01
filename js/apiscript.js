// Fetch seafood items by type (Fish, Shrimp, Crab, Lobster)
const fetchMealsByType = (mealType) => {
  let foodType = document.getElementById("foodType");
  foodType.innerText = mealType + " Food Items";

  // Using TheMealDB API for seafood items
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`;
  console.log("Fetching seafood: ", apiUrl);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayMeals(data.meals, mealType))
    .catch((error) => console.error("Error fetching seafood: ", error));
};

// Display meals (max 10 items) with random price in INR
const displayMeals = (meals, mealType) => {
  console.log("Meal data received: ", meals);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear previous cards

  meals.slice(0, 10).forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList =
      "card card-compact bg-base-100 w-auto shadow-xl rounded-none";

    // Generate random price in INR between ₹100 and ₹2000
    const randomPriceINR = Math.floor(Math.random() * (2000 - 100 + 1) + 100);

    mealCard.innerHTML = `
      <figure>
        <img style="clip-path: polygon(0% 0%, 100% 0, 100% 85%, 51% 100%, 0 85%);" 
             src="${meal.strMealThumb}" 
             alt="Image of ${meal.strMeal}" />
      </figure>
      <div class="card-body">
        <h2 class="card-title block text-center -mt-3">${meal.strMeal}</h2>
        <p class="text-slate-500 text-xs text-center">
          Category: ${mealType}
        </p>
        <p title="${meal.strInstructions ? meal.strInstructions : ''}">
          ${meal.strInstructions ? meal.strInstructions.slice(0, 100) + "..." : ''}
        </p>
        <div class="divider my-0"></div>
        <div class="flex justify-evenly">
          <a href="${meal.strSource ? meal.strSource : '#'}" target="_blank"
             class="btn btn-outline text-orange-600 h-12 min-h-12 px-6">
            VIEW DETAILS
          </a>
          <button class="btn bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold h-12 min-h-12 px-6 hover:from-yellow-400 hover:to-orange-400 transition-all duration-300">
            ₹${randomPriceINR}
          </button>
        </div>
      </div>
    `;
    cardContainer.appendChild(mealCard);
  });
};

// Initial load: show Seafood by default
fetchMealsByType("Seafood");
