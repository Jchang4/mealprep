import React from "react";

// Components
import FancyTitle from "components/fancy-title";

class RecipeDetails extends React.Component {
  render() {
    const { match, getRecipeById } = this.props;
    const recipeId = match.params.recipeId;
    const recipe = getRecipeById(atob(recipeId));
    console.log(recipe);
    return (
      <div>
        <FancyTitle>{recipe.title}</FancyTitle>
      </div>
    );
  }
}

export default RecipeDetails;
