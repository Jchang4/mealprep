import P from "bluebird";
import delay from "delay";
import { getRecipesByIngredientsFromApi } from "api";

import { ADD_N_RECIPES } from "./constants";

export function getRecipesByIngredients(ingredients, numResults = 7) {
  return async (dispatch, _) => {
    const recipes = await getRecipesByIngredientsFromApi({
      ingredients,
      numResults,
      offset: 0
    });

    return dispatch({
      type: ADD_N_RECIPES,
      payload: recipes
    });
  };
}

export const getRecipeById = recipeId => (_, getState) => {
  return getState().recipes[recipeId];
};
