const initState = {
  recipes: [],
  recipesFetched: false,
  recipesIsFetching: false,
  selectedIngredients: [],
  groceryList: [],
  backupRecipes: [],
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
      console.log('fetching recipes success')
      return {
        ...state,
        recipesIsFetching: false,
        recipesFetched: true,
        recipes: action.data,
        backupRecipes: action.data
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
      return {
        ...state,
        recipes: state.backupRecipes.filter(s => s.rname.toLowerCase().includes(action.input)),
      }
    case 'ADD_TO_GROCERY_LIST_FROM_RECIPE':
      var myList = []
      for (var i = 0; i < action.data.length; i++) {
        if(!state.selectedIngredients.ingredients.includes(action.data[i].key)){
          if(!["pepper", "water", "salt"].some(el => action.data[i].key.includes(el))){
            myList.push(action.data[i])
          }
        }
      }
      return {
        ...state,
        groceryList: myList
      }
    case 'ADD_CUSTOM_TO_GROCERY_LIST':
      return {
        ...state,
        groceryList: [...state.groceryList, action.data]
      }
    default:
      return state;
  }
}

export default RecipeReducer;
