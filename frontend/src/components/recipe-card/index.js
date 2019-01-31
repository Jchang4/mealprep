import * as R from "ramda";
import magicConnect from "app-state/magic-connect";
import { withRouter } from "react-router-dom";

import RecipeCardView from "./view";

// Actions & Selectors
import { getSelectedRecipes } from "app-state/selected-recipes/selectors";

export default R.pipe(
  magicConnect({
    selectors: {
      selectedRecipeIds: getSelectedRecipes
    }
  }),
  withRouter
)(RecipeCardView);
