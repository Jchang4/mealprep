import {
  ADD_RECIPE_ID_TO_PLANNER,
  REMOVE_RECIPE_ID_FROM_PLANNER,
} from './constants';

export function addToPlanner(recipeId) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_RECIPE_ID_TO_PLANNER,
      payload: recipeId
    });
  }
}

export function removeFromPlanner(recipeId) {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_RECIPE_ID_FROM_PLANNER,
      payload: recipeId
    });
  }
}

/**
 * Make sure all recipes in planner have recipe details
 * Get all ingredients
 * Combine like ingredient units
 */
