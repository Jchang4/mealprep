import { createConstant } from '../helpers';

const createRecipeOtherConstant = createConstant('recipeOther');

// Planner
export const ADD_RECIPE_ID_TO_PLANNER = createRecipeOtherConstant('ADD_RECIPE_TO_PLANNER');
export const REMOVE_RECIPE_ID_FROM_PLANNER = createRecipeOtherConstant('REMOVE_RECIPE_FROM_PLANNER');
