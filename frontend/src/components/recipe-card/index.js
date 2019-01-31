import magicConnect from "app-state/magic-connect";

import RecipeCardView from "./view";

// Actions & Selectors
import { getSelectedRecipes } from "app-state/selected-recipes/selectors";

export default magicConnect({
  selectors: {
    selectedRecipeIds: getSelectedRecipes
  }
})(RecipeCardView);
