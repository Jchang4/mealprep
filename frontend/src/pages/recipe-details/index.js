import magicConnect from "app-state/magic-connect";

// Actions & Selectors
import { getRecipeById } from "app-state/recipes/actions";

import RecipeDetailsView from "./view";

export default magicConnect({
  actions: {
    getRecipeById
  }
})(RecipeDetailsView);
