import { createConstant } from "../helpers";

const createRecipesConstant = createConstant("recipes");

// ADD_N_RECIPES
export const ADD_N_RECIPES = createRecipesConstant("ADD_N_RECIPES");
export const ADD_RECIPE = createRecipesConstant("ADD_RECIPE");
export const REMOVE_RECIPE = createRecipesConstant("REMOVE_RECIPE");
export const UPDATE_RECIPE = createRecipesConstant("UPDATE_RECIPE");
export const CLEAR_RECIPES = createRecipesConstant("CLEAR_RECIPES");
