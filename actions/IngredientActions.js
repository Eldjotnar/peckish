export function getIngredients() {
  return {
    type: 'FETCHING_INGREDIENTS'
  }
}

export function getIngredientsSuccess(data) {
  return {
    type: 'FETCHING_INGREDIENTS_SUCCESS',
    data
  }
}

export function getIngredientsFailure(data) {
  return {
    type: 'FETCHING_INGREDIENTS_FAILURE'
  }
}

export function fetchIngredients() {
  return (dispatch) => {
    dispatch(getIngredients())
    fetch("http://rns203-8.cs.stolaf.edu:28488/getallingredients")
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        dispatch(getIngredientsSuccess(data));
      })
      .catch((err) => console.log('ERROR: ' + err))
  }
}

export function sortIngredientsByName() {
  return {
    type: 'SORT_INGREDIENTS_BY_NAME'
  }
}

export function sortIngredientsByCategory() {
  return {
    type: 'SORT_INGREDIENTS_BY_CATEGORY'
  }
}

export function sortIngredientsByFrequency() {
  return {
    type: 'SORT_INGREDIENTS_BY_FREQUENCY'
  }
}

export function searchForIngredient(input) {
  return {
    type: 'SEARCH_FOR_INGREDIENT',
    input
  }
}
