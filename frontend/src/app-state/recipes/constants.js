import { createConstant } from "../helpers";

const createRecipesConstant = createConstant("recipes");

// Recipes
export const NEW_RECIPES = createRecipesConstant("NEW_RECIPES");
export const ADD_RECIPE = createRecipesConstant("ADD_RECIPE");
export const REMOVE_RECIPE = createRecipesConstant("REMOVE_RECIPE");
export const UPDATE_RECIPE = createRecipesConstant("UPDATE_RECIPE");
