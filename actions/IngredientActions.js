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
