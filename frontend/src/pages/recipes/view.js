import React from "react";
import * as R from "ramda";
// import getRecipesFromIngredients from "../api/get-recipes-from-ingredients";

// Components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

class Recipe extends React.Component {
  render() {
    const { recipes } = this.props;
    const recipesArr = R.values(recipes);
    console.log(recipesArr);
    return (
      <div>
        <Typography variant="h1">Select Recipes</Typography>
        <Grid container spacing={16}>
          <Card />
        </Grid>
      </div>
    );
  }
}

export default Recipe;
