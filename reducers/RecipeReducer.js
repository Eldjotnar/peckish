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
        selectedIngredients: action.selectedIngredients
      }
    case 'FETCHING_RECIPES_SUCCESS':
      return {
        ...state,
        recipesIsFetching: false,
        recipesFetched: true,
        recipes: action.data
      }
    case 'FETCHING_RECIPES_FAILURE':
      return {
        ...state,
        recipesIsFetching: false,
        error: true,
      }
    case 'SORT_RECIPES_BY_NAME':
      return {
        ...state,
        recipes: state.recipes.sort(function(a,b){return a.rname > b.rname})
      }
    case 'SORT_RECIPES_BY_RATING':
      return {
        ...state,
        recipes: state.recipes.sort(function(a,b){return a.rating > b.rating})
      }
    case 'SORT_RECIPES_BY_SOURCE':
      return {
        ...state,
        recipes: state.recipes.sort(function(a,b){return a.source > b.source})
      }
    case 'SORT_RECIPES_BY_MISSING':
      return {
        ...state,
        recipes: state.recipes.sort(function(a,b){return a.missing > b.missing})
      }
    case 'SEARCH_FOR_RECIPE':
      searchedRecipes = []
      //searchedRecipes.push(state.backupRecipes[0].filter(s => s.rname.toLowerCase().includes(action.input)))
      return {
        ...state,
        recipes: searchedRecipes,
      }
    default:
      return state;
  }
}

export default RecipeReducer;
