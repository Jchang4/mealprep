import magicConnect from "app-state/magic-connect";

// Actions & Selectors
import { getRecipes } from "app-state/recipes/selectors";

// View
import RecipesView from "./view";

export default magicConnect({
  selectors: {
    recipes: getRecipes
  },
  actions: {}
})(RecipesView);
