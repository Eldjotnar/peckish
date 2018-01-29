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
