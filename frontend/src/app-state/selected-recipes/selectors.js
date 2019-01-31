import { createSelector } from "reselect";

const getSelectedRecipeState = state => state.selectedRecipes;

export const getSelectedRecipes = createSelector(
  getSelectedRecipeState,
  selectedRecipes => Object.keys(selectedRecipes)
);
