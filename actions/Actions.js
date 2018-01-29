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

export function addToGroceryList(data) {
  return {
    type: 'ADD_TO_GROCERY_LIST_FROM_RECIPE',
    data
  }
}

export function addCustomToGroceryList(data) {
  return {
    type: 'ADD_CUSTOM_TO_GROCERY_LIST',
    data
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

export function getData(selectedIngredients) {
  console.log("fetching recipes...")
  return {
    type: 'FETCHING_RECIPES',
    selectedIngredients
  }
}

export function getDataSuccess(data) {
  return {
    type: 'FETCHING_RECIPES_SUCCESS',
    data
  }
}

export function getDataFailure() {
  return {
    type: 'FETCHING_RECIPES_FAILURE'
  }
}

export function fetchData(selectedIngredients) {
  return (dispatch) => {
    dispatch(getData(selectedIngredients))
    fetch("http://rns203-8.cs.stolaf.edu:28488", {
      method: "POST",
      body: JSON.stringify(selectedIngredients),
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        dispatch(getDataSuccess(data));
      })
      .catch((err) => console.log('ERROR: ' + err))
  }
}
