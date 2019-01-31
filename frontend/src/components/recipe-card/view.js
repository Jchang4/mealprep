// @flow
import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

// Containers
import SelectRecipeButton from "containers/buttons/select-recipe";

// Components
import AlarmIcon from "@material-ui/icons/Alarm";
import GradeIcon from "@material-ui/icons/Grade";
import Typography from "@material-ui/core/Typography";
import Row from "components/row";
import CircularImage from "components/image/circular-image";

const styles = theme => ({
  selected: {
    "& $textContainer": {
      border: "1px solid #00bcd4",
      marginTop: -17,
      paddingLeft: 2 * theme.spacing.unit - 1,
      paddingRight: 2 * theme.spacing.unit - 1
    }
  },
  container: {
    width: 300,
    margin: 2 * theme.spacing.unit,
    // replace with react-spring?
    "&:hover": {
      cursor: "pointer",
      "& $textContainer": {
        boxShadow: theme.shadows[8]
      },
      "& $imageContainer": {
        boxShadow: theme.shadows[15],
        marginTop: -25
      },
      "& $image": {
        height: 225,
        width: 225
      }
    }
  },
  textContainer: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    padding: `${2.5 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`,
    // paddingTop: 125,
    // marginTop: -115,
    marginTop: -15,
    transition: "box-shadow 200ms ease-in"
  },
  imageContainer: {
    boxShadow: theme.shadows["6"],
    transition: "box-shadow 150ms ease-out, margin-top 150ms ease-out"
  },
  image: {
    margin: "0 auto",
    height: 200,
    width: 200,
    transition: "height 150ms ease-out, width 150ms ease-out"
  },
  title: {
    height: 7 * theme.spacing.unit
  },
  icon: {
    marginRight: theme.spacing.unit / 2
  },
  selectRecipeButton: {
    marginTop: 2 * theme.spacing.unit
  }
});

const RecipeCard = ({
  selectedRecipeIds,
  recipeId,
  title,
  imgUrl,
  cookingTime: { totalTime },
  fiveStarRating,
  source: { source: recipeWebsiteSource },
  classes
}: {
  selectedRecipeIds: string[],
  recipeId: string,
  title: string,
  imgUrl?: string,
  cookingTime?: {
    totalTime?: string
  },
  fiveStarRating: number,
  source: {
    source: string
  },
  classes: Object
}) => {
  const hasCookingTime = !!totalTime;
  const isSelected = selectedRecipeIds.includes(recipeId);
  return (
    <div
      className={classNames(classes.container, {
        [classes.selected]: isSelected
      })}
    >
      <div className={classes.image}>
        <CircularImage
          containerClassName={classes.imageContainer}
          imgClassName={classes.image}
          src={imgUrl}
          alt={title}
        />
      </div>

      {/* Text */}
      <div className={classes.textContainer}>
        <Typography className={classes.title} variant="title">
          {title}
        </Typography>
        <Row justifyContent="space-between">
          {/* Total cooking time */}
          {hasCookingTime ? (
            <Row>
              <AlarmIcon className={classes.icon} fontSize="small" />
              <Typography variant="body1">{totalTime}</Typography>
            </Row>
          ) : (
            <div />
          )}
          {/* Source - AllRecipe, BudgetBytes */}
          <Typography variant="body2">{recipeWebsiteSource}</Typography>
          {/* Rating */}
          <Row>
            <GradeIcon className={classes.icon} fontSize="small" />
            <Typography variant="body1">{fiveStarRating.toFixed(2)}</Typography>
          </Row>
        </Row>
        <Row justifyContent="flex-end" className={classes.selectRecipeButton}>
          <SelectRecipeButton recipeId={recipeId} />
        </Row>
      </div>
    </div>
  );
};

export default withStyles(styles)(RecipeCard);
