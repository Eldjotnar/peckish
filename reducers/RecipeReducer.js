const initState = {
  recipes: [],
  recipesFetched: false,
  recipesIsFetching: false,
  selectedIngredients: [],
  error: false,
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
    default:
      return state;
  }
}

export default RecipeReducer;
