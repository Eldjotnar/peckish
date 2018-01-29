import { combineReducers } from 'redux'

import GroceryReducer from './GroceryReducer'
import IngredientReducer from './IngredientReducer'
import RecipeReducer from './RecipeReducer'

const RootReducer = combineReducers({
    groceries: GroceryReducer,
    ingredients: IngredientReducer,
    recipes: RecipeReducer
})

export default RootReducer
