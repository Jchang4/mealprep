import React from "react";
import { withStyles } from "@material-ui/core/styles";

// Containers
import RecipeSearchBar from "containers/recipe-search-bar";

// Components
import Typography from "@material-ui/core/Typography";
import RecipeCard from "components/recipe-card";
import Flex from "components/flex";

const styles = theme => ({
  recipesContainer: {
    marginTop: theme.spacing.unit * 2
  }
});

class Recipe extends React.Component {
  render() {
    const { classes, recipes } = this.props;
    return (
      <div>
        <Typography variant="h1">Pick recipes</Typography>
        <div style={{ marginTop: 16 }}>
          <RecipeSearchBar />
        </div>
        <Flex justifyContent="center" className={classes.recipesContainer}>
          {recipes.map((r, i) => (
            <RecipeCard {...r} key={i} />
          ))}
        </Flex>
      </div>
    );
  }

  openInNewTab(url) {
    window.open(url, "_blank");
  }
}

export default withStyles(styles)(Recipe);
