export function getRecipes(selectedIngredients) {
  return {
    type: 'FETCHING_RECIPES',
    selectedIngredients
  }
}

export function getRecipesSuccess(data) {
  return {
    type: 'FETCHING_RECIPES_SUCCESS',
    data
  }
}

export function getRecipesFailure() {
  return {
    type: 'FETCHING_RECIPES_FAILURE'
  }
}

export function fetchRecipes(selectedIngredients) {
  return (dispatch) => {
    dispatch(getRecipes(selectedIngredients))
    fetch("http://rns203-8.cs.stolaf.edu:28488", {
      method: "POST",
      body: JSON.stringify(selectedIngredients),
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        dispatch(getRecipesSuccess(data));
      })
      .catch((err) => console.log('ERROR: ' + err))
  }
}
