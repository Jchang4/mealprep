import magicConnect from "app-state/magic-connect";

// Actions & Selectors
import { getRecipesByIngredients } from "app-state/recipes/actions";

// View
import RecipeSearchBar from "./view";

export default magicConnect({
  selectors: {},
  actions: {
    getRecipesByIngredients
  }
})(RecipeSearchBar);
