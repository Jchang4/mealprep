import {
  getAllRecipes,
  getRecipe,
} from '../../api/f2f';

import {
  ADD_N_RECIPES,
  ADD_RECIPE,
  REMOVE_RECIPE,
  UPDATE_RECIPE,
} from './constants';

// Add recipe to redux
export function addRecipe(recipe) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_RECIPE,
      payload: recipe
    });
  }
}

// Remove recipe by id from redux
export function removeRecipe(recipeId) {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_RECIPE,
      payload: recipeId
    });
  }
}

// Get f2f recipes and add to redux
export function getRecipes(query) {
  return (dispatch, getState) => {
    return getAllRecipes(query)
    .then(recipes => {
      dispatch({
        type: ADD_N_RECIPES,
        payload: recipes.data,
      });
      
      return recipes;
    })
    .catch(err => {
      console.log('Failed to get all recipes from API.');
      console.log(err);
    });
  }
}

// Get recipe details - i.e. ingredients
export function getRecipeDetails(recipeId) {
  return (dispatch, getState) => {
    return getRecipe(recipeId)
    .then(recipe => {
      dispatch({
        type: UPDATE_RECIPE,
        payload: recipe
      });
    });
  }
}
