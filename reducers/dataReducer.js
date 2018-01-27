const initState = {
  ingredients: [],
  selectedIngredients: [],
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
    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.data]
      }
    default:
      return state;
  }
}

export default RecipeReducer;
