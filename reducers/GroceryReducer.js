const initState = {
  groceryList: []
}

const GroceryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TO_GROCERY_LIST_FROM_RECIPE':
      var myList = []
      for (var i = 0; i < action.data.length; i++) {
        if(!state.selectedIngredients[0].ingredients.includes(action.data[i].key)){
          if(!["pepper", "water", "salt"].some(el => action.data[i].key.includes(el))){
            //TODO: revoke multiple instances
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
      return state
  }
}

export default GroceryReducer
