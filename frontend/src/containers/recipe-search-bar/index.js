import magicConnect from "app-state/magic-connect";

// Actions & Selectors
// import { getRecipes } from "app-state/recipes/selectors";

// View
import RecipeSearchBar from "./view";

export default magicConnect({
  selectors: {
    // recipes: getRecipes
  },
  actions: {}
})(RecipeSearchBar);
