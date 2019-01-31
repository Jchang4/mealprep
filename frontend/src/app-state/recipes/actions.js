import P from "bluebird";
import delay from "delay";
import { getRecipesByIngredientsFromApi } from "api";

import { ADD_N_RECIPES } from "./constants";

import { getRecipes } from "./selectors";

export function getRecipesByIngredients(ingredients, numResults = 7) {
  return async (dispatch, _) => {
    const requests = [];
    for (let i = 0; i < numResults; i += 2) {
      requests.push(
        getRecipesByIngredientsFromApi({
          ingredients,
          numResults: 2,
          offset: i
        })
      );
      await delay(250);
    }
    return P.map(requests, recipes =>
      dispatch({ type: ADD_N_RECIPES, payload: recipes })
    );
  };
}

export const getRecipeById = recipeId => (_, getState) => {
  return getState().recipes[recipeId];
};
