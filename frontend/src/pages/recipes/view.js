import React from "react";
import { withStyles } from "@material-ui/core/styles";
// import getRecipesFromIngredients from "../api/get-recipes-from-ingredients";

// Containers
import RecipeSearchBar from "containers/recipe-search-bar";

// Components
import Typography from "@material-ui/core/Typography";
import RecipeCard from "components/recipe-card";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardActions from "@material-ui/core/CardActions";
// import Button from "@material-ui/core/Button";
import TabIcon from "@material-ui/icons/Tab";
import Flex from "components/flex";

const styles = theme => ({
  flexContainer: {
    marginTop: theme.spacing.unit * 2
  },
  card: {
    boxShadow: theme.shadows["3"],
    margin: theme.spacing.unit,
    width: 450,
    transition: `all 225ms ${theme.transitions.easing.easeOut}`,
    "&:hover": {
      cursor: "pointer",
      boxShadow: theme.shadows["8"]
    }
  },
  cardHeader: {
    height: theme.spacing.unit * 5
  },
  cardImg: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: 350
  },
  cardActions: {
    justifyContent: "flex-end"
  },
  tabIcon: {
    marginRight: theme.spacing.unit / 2
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
        <Flex justifyContent="center" className={classes.flexContainer}>
          {recipes.map((r, i) => (
            <RecipeCard {...r} />
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

// {recipes.map((r, i) => (
//             <Card key={i} className={classes.card}>
//               <CardHeader title={r.title} className={classes.cardHeader} />
//               <div
//                 className={classes.cardImg}
//                 style={{ backgroundImage: `url(${r.imgUrl})` }}
//               />
//               <CardActions className={classes.cardActions}>
//                 <Button
//                   color="secondary"
//                   onClick={() => this.openInNewTab(r.source.recipeUrl)}
//                 >
//                   <TabIcon className={classes.tabIcon} /> Open in New Tab
//                 </Button>
//               </CardActions>
//             </Card>
//           ))}
