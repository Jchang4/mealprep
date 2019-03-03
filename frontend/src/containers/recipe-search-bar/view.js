import React from "react";
import { withStyles } from "@material-ui/core/styles";

// Components
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    width: "90%",
    maxWidth: theme.spacing.unit * 100,
    margin: "0 auto"
  },
  textField: {
    width: "100%"
  },
  searchIcon: {
    marginBottom: -4
  }
});

class RecipeSearchBar extends React.Component {
  state = {
    ingredients: []
  };

  render() {
    const { classes } = this.props;

    const textFieldLabel = (
      <div>
        <SearchIcon className={classes.searchIcon} fontSize="small" /> Search by
        Ingredients...
      </div>
    );

    return (
      <div className={classes.container}>
        <TextField
          onChange={e => this.handleTextFieldChange(e.target.value)}
          onKeyDown={e => this.handleRecipeSearchOnEnter(e)}
          className={classes.textField}
          label={textFieldLabel}
          placeholder="i.e. chicken, pesto"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
    );
  }

  handleTextFieldChange(ingredients) {
    this.setState({
      ingredients: ingredients
        .split(",")
        .map(i => i.trim())
        .filter(i => !!i)
    });
  }

  handleRecipeSearchOnEnter({ keyCode }) {
    // keyCode 13 === enter
    if (keyCode === 13) {
      const { ingredients } = this.state;
      const { getRecipesByIngredients } = this.props;
      getRecipesByIngredients(ingredients);
    }
  }
}

export default withStyles(styles)(RecipeSearchBar);
