import React from "react";
import magicConnect from "app-state/magic-connect";

// Actions & Selectors
import { getSelectedRecipes } from "app-state/selected-recipes/selectors";
import {
  selectRecipeById,
  unselectRecipeById
} from "app-state/selected-recipes/actions";

// Components
import Button from "@material-ui/core/Button";

const SelectRecipeButton = ({
  // App State
  selectedRecipeIds,
  selectRecipeById,
  unselectRecipeById,
  // Props
  recipeId,
  classes,
  className = "",
  style = {},
  children = "Select"
}) => (
  <Button
    variant="outlined"
    color="secondary"
    className={className}
    style={style}
    onClick={e => {
      e.stopPropagation();
      const isSelected = selectedRecipeIds.includes(recipeId);
      if (isSelected) {
        unselectRecipeById(recipeId);
      } else {
        selectRecipeById(recipeId);
      }
    }}
  >
    {children}
  </Button>
);

export default magicConnect({
  actions: {
    selectRecipeById,
    unselectRecipeById
  },
  selectors: {
    selectedRecipeIds: getSelectedRecipes
  }
})(SelectRecipeButton);
