// @flow
import P from "bluebird";

import { SELECT_RECIPE_BY_ID, REMOVE_SELECTED_RECIPE_BY_ID } from "./constants";

export const selectRecipeById = (recipeId: string) => dispatch =>
  dispatch({
    type: SELECT_RECIPE_BY_ID,
    payload: recipeId
  });

export const unselectRecipeById = (recipeId: string) => dispatch =>
  dispatch({
    type: REMOVE_SELECTED_RECIPE_BY_ID,
    payload: recipeId
  });
