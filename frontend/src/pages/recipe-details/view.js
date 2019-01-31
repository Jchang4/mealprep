import React from "react";

// Components
import Row from "components/row";
import FancyTitle from "components/fancy-title";
import CircularImage from "components/image/circular-image";
import FiveStarRating from "components/five-star-rating";
import JumbotronImg from "./components/jumbotron-img";

class RecipeDetails extends React.Component {
  render() {
    const { match, getRecipeById } = this.props;
    const recipeId = match.params.recipeId;
    const recipe = getRecipeById(atob(recipeId));
    console.log(recipe);
    return (
      <div>
        <JumbotronImg src={recipe.imgUrl} alt={recipe.title} />
        <FancyTitle className="text-center">{recipe.title}</FancyTitle>
        <Row justifyContent="space-between">
          {/* Cooking Time */}
          {/* Source */}
          {/* Rating */}
          <FiveStarRating rating={recipe.fiveStarRating} />
        </Row>
      </div>
    );
  }
}

export default RecipeDetails;
