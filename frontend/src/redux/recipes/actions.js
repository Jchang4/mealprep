import Promise from 'bluebird';
import shuffle from '../../assets/js/shuffle';

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

/**
 * Get first X recipes' ingredients
 * @param  {[type]} query used to search for recipes, i.e. "chicken, spinach"
 * @return {Array<String>} list of ingredients
 */
export function getIngredients(query, numRecipes=4) {
  return (dispatch, getState) => {
    return getRecipes(query)(dispatch, getState)
    .then(res => res.data)
    // get recipe ids, return recipeDetails
    .then(recipes => {
      return shuffle(recipes)
            .slice(0, numRecipes)
            .map(r => r.recipe_id);
    })
    .then(recipeIds => Promise.map(recipeIds, rId => getRecipeDetails(rId)(dispatch, getState)))
    // turn into single array
    .then(recipes => recipes.reduce((arr,r) => arr.concat(r.ingredients), []))
    .catch(err => {
      console.log('Failed to get recipe ingredients from API.');
      throw new Error(err.message);
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
      return recipe
    })
    .catch(err => {
      console.log('Failed to update state with recipe details.');
      throw new Error(err.message);
    })
  }
}
