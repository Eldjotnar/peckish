import { combineReducers } from 'redux'

import IngredientReducer from './IngredientReducer'
import RecipeReducer from './RecipeReducer'

const RootReducer = combineReducers({
    ingredients: IngredientReducer,
    recipes: RecipeReducer
})

export default RootReducer
