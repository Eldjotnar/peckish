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
        myArray.push({key: action.data.ingredientnames[i], freq: action.data.freqs[i], type: action.data.types[i]})
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
      case 'SORT_INGREDIENTS_BY_CATEGORY':
        return {
          ...state,
          ingredients: state.ingredients.sort(function(a,b){return a.type > b.type})
        }
      case 'SORT_INGREDIENTS_BY_FREQUENCY':
        return {
          ...state,
          ingredients: state.ingredients.sort(function(a,b){return a.freq < b.freq})
        }
      case 'SORT_INGREDIENTS_BY_NAME':
        return {
          ...state,
          ingredients: state.ingredients.sort(function(a,b){return a.key > b.key})
        }
    default:
      return state;
  }
}

export default IngredientReducer;
