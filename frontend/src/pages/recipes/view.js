import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

// Containers
import RecipeSearchBar from "containers/recipe-search-bar";

// Components
import Typography from "@material-ui/core/Typography";
import RecipeCard from "components/recipe-card";
import Flex from "components/flex";

const styles = theme => ({
  pageTitle: {
    marginTop: 0,
    fontSize: theme.typography.h1.fontSize,
    lineHeight: theme.typography.h1.lineHeight,
    letterSpacing: theme.typography.h1.letterSpacing,
    textAlign: "center"
  },
  recipesContainer: {
    marginTop: theme.spacing.unit * 2
  }
});

class Recipe extends React.Component {
  render() {
    const { classes, recipes } = this.props;
    return (
      <div>
        <h1 className={classNames("fancy-title", classes.pageTitle)}>
          Recipe Picker
        </h1>
        <Typography
          style={{ fontStyle: "italic", textAlign: "center" }}
          variant="body1"
        >
          Search recipes by ingredients and select the recipes you'd like to
          make!
        </Typography>
        <div style={{ marginTop: 16 }}>
          <RecipeSearchBar />
        </div>
        <Flex justifyContent="center" className={classes.recipesContainer}>
          {recipes.map((r, i) => (
            <RecipeCard {...r} recipeId={r.source.recipeUrl} key={i} />
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
