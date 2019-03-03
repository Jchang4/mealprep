import React from "react";

// Components
import Typography from "@material-ui/core/Typography";
import Row from "components/row";
import FancyTitle from "components/fancy-title";
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
        <Row
          justifyContent="space-between"
          style={{ maxWidth: 425, margin: "0 auto", padding: "0 16px" }}
        >
          {/* Cooking Time */}
          <div style={{ height: 120 }} />
          {/* Source */}
          <Typography variant="body2">{recipe.source.source}</Typography>
          {/* Rating */}
          <FiveStarRating rating={recipe.fiveStarRating} />
        </Row>
      </div>
    );
  }
}

export default RecipeDetails;
