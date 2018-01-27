const initState = {
  ingredients: [],
  ingredientsFetched: false,
  ingredientsIsFetching: false,
  recipes: [],
  recipesFetched: false,
  recipesIsFetching: false,
  error: false,
}

const RecipeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHING_RECIPES':
      return {
        ...state,
        recipes: [],
        recipesIsFetching: true
      }
    case 'FETCHING_RECIPES_SUCCESS':
      return {
        ...state,
        recipesIsFetching: false,
        recipesFetched: true,
        recipes: [...state.recipes, action.data]
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
      //console.log(action.data.ingredientnames)
      return {
        ...state,
        ingredientsIsFetching: true,
        ingredientsFetched: true,
        ingredients: [...state.ingredients, action.data.ingredientnames]
      }
    case 'FETCHING_INGREDIENTS_FAILURE':
      return {
        ...state,
        recipesIsFetching: false,
        error: true,
      }
    default:
      return state;
  }
}

export default RecipeReducer;
