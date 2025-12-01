// Fetch seafood items by type (Fish, Shrimp, Crab, Lobster)
const fetchMealsByType = (mealType) => {
  let foodType = document.getElementById("foodType");
  foodType.innerText = mealType + " Food Items";

  // Using TheMealDB API for seafood items
  // 'Seafood' category gives various seafood items
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`;
  console.log("Fetching seafood: ", apiUrl);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayMeals(data.meals, mealType))
    .catch((error) => console.error("Error fetching seafood: ", error));
};

// Display meals (max 10 items)
const displayMeals = (meals, mealType) => {
  console.log("Meal data received: ", meals);

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear previous cards

  // Show only first 10 items
  meals.slice(0, 10).forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList =
      "card card-compact bg-base-100 w-auto shadow-xl rounded-none";

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
        <div class="mx-auto">
          <a href="${meal.strSource ? meal.strSource : '#'}" target="_blank"
             class="btn btn-outline text-orange-600 h-10 min-h-10">
            VIEW DETAILS
          </a>
        </div>
      </div>
    `;
    cardContainer.appendChild(mealCard);
  });
};

// Initial load: show Seafood by default
fetchMealsByType("Seafood");
