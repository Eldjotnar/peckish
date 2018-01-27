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
    data,
  }
}

export function getDataFailure() {
  return {
    type: 'FETCHING_RECIPES_FAILURE'
  }
}

export function fetchData() {}
