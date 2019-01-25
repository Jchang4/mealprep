import * as R from "ramda";
import { createSelector } from "reselect";

const getRecipesState = state => state.recipes;

export const getRecipes = createSelector(
  getRecipesState,
  recipes => {
    return R.pipe(
      R.values,
      R.sort((a, b) => {
        if (b && a) {
          return b.fiveStarRating - a.fiveStarRating;
        } else if (b) {
          return b;
        } else {
          return a;
        }
      })
    )(recipes);
  }
);
