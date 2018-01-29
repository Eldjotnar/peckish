const initState = {
  ingredients: [],
  ingredientsFetched: false,
  ingredientsIsFetching: false,
  recipes: [],
  recipesFetched: false,
  recipesIsFetching: false,
  error: false,
  backupIngredients: [],
  backupRecipes: [],
  selectedIngredients: [],
  groceryList: [],
}

const RecipeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_RECIPES':
      return {
        ...state,
        recipes: [],
        recipesIsFetching: true,
        selectedIngredients: [...state.selectedIngredients, action.selectedIngredients]
      }
    case 'FETCHING_RECIPES_SUCCESS':
      return {
        ...state,
        recipesIsFetching: false,
        recipesFetched: true,
        recipes: [...state.recipes, action.data],
        backupRecipes: [...state.backupRecipes, action.data],
      }
    case 'FETCHING_RECIPES_FAILURE':
      return {
        ...state,
        recipesIsFetching: false,
        error: true,
      }
    case 'FETCHING_INGREDIENTS':
      return {
        ...state,
        ingredients: [],
        ingredientsIsFetching: true
      }
    case 'FETCHING_INGREDIENTS_SUCCESS':
      var myArray = []
      for (var i = 0; i < action.data.ingredientnames.length; i++) {
        myArray.push({key: action.data.ingredientnames[i]})
      }
      return {
        ...state,
        ingredientsIsFetching: true,
        ingredientsFetched: true,
        ingredients: [...state.ingredients, myArray],
        backupIngredients: [...state.backupIngredients, myArray],
      }
    case 'FETCHING_INGREDIENTS_FAILURE':
      return {
        ...state,
        recipesIsFetching: false,
        error: true,
      }
    case 'SORT_INGREDIENTS_BY_CATEGORY':
      return state
    case 'SORT_INGREDIENTS_BY_FREQUENCY':
      return state
    case 'SORT_INGREDIENTS_BY_NAME':
      var alphabetState = []
      alphabetState.push(state.ingredients[0].sort(function(a,b){return a.key > b.key}));
      return {
        ...state,
        ingredients: alphabetState,
      }
    case 'SEARCH_FOR_INGREDIENT':
      //console.log(state.ingredients[0])
      searchedState = []
      searchedState.push(state.backupIngredients[0].filter(s => s.key.includes(action.input)))
      return {
        ...state,
        ingredients: searchedState,
      }
    case 'SORT_RECIPES_BY_NAME':
      var alphabetState = []
      alphabetState.push(state.backupRecipes[0].sort(function(a,b){return a.rname > b.rname}));
      return {
        ...state,
        recipes: alphabetState,
      }
    case 'SORT_RECIPES_BY_RATING':
      var ratingState = []
      ratingState.push(state.backupRecipes[0].sort(function(a,b){return a.rating > b.rating}));
      return {
        ...state,
        recipes: ratingState
      }
    case 'SORT_RECIPES_BY_SOURCE':
      var sourceState = []
      sourceState.push(state.backupRecipes[0].sort(function(a,b){return a.source > b.source}));
      return {
        ...state,
        recipes: sourceState
      }
    case 'SORT_RECIPES_BY_MISSING':
      var missingState = []
      missingState.push(state.backupRecipes[0].sort(function(a,b){return a.missing > b.missing}));
      return {
        ...state,
        recipes: missingState
      }
    case 'SEARCH_FOR_RECIPE':
      searchedRecipes = []
      searchedRecipes.push(state.backupRecipes[0].filter(s => s.rname.toLowerCase().includes(action.input)))
      return {
        ...state,
        recipes: searchedRecipes,
      }
    case 'ADD_TO_GROCERY_LIST':
      var myList = []
      for (var i = 0; i < action.data.length; i++) {
        if(!state.selectedIngredients[0].ingredients.includes(action.data[i].key)){
          if(!["pepper", "water", "salt"].some(el => action.data[i].key.includes(el))){
            myList.push(action.data[i])
          }
        }
      }
      return {
        ...state,
        groceryList: myList
      }
    default:
      return state;
  }
}

export default RecipeReducer;
