export const recipeAdded = (data) => {
  return {
    type: 'ADD_RECIPE',
    data
  };
};

export function getData() {
  return {
    type: 'FETCHING_RECIPES'
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
    dispatch(getData())
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
