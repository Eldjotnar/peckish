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

export function sortRecipesByMissing() {
  return {
    type: 'SORT_RECIPES_BY_MISSING'
  }
}

export function sortRecipesByName() {
  return {
    type: 'SORT_RECIPES_BY_NAME'
  }
}

export function sortRecipesByRating() {
  return {
    type: 'SORT_RECIPES_BY_RATING'
  }
}

export function sortRecipesBySource() {
  return {
    type: 'SORT_RECIPES_BY_SOURCE'
  }
}

export function searchForRecipe(input) {
  return {
    type: 'SEARCH_FOR_RECIPE',
    input
  }
}
