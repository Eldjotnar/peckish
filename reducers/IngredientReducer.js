const initState = {
  ingredients: [],
  ingredientsFetched: false,
  ingredientsIsFetching: false,
  error: false,
}

const IngredientReducer = (state = initState, action) => {
  switch (action.type) {
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
        ingredients: myArray,
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

export default IngredientReducer;
