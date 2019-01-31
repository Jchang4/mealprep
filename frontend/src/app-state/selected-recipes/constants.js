import { createConstant } from "../helpers";

const createRecipesConstant = createConstant("selectedRecipes");

// ADD_N_RECIPES
export const SELECT_RECIPE_BY_ID = createRecipesConstant("SELECT_RECIPE_BY_ID");
export const REMOVE_SELECTED_RECIPE_BY_ID = createRecipesConstant(
  "REMOVE_SELECTED_RECIPE_BY_ID"
);
