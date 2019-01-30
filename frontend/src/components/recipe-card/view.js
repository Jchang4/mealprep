// @flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";

// Components
import AlarmIcon from "@material-ui/icons/Alarm";
import GradeIcon from "@material-ui/icons/Grade";
import Typography from "@material-ui/core/Typography";
import Row from "components/row";
import CircularImage from "components/image/circular-image";

const styles = theme => ({
  container: {
    width: 300,
    margin: 2 * theme.spacing.unit,
    "&:hover": {
      cursor: "pointer"
    }
  },
  textContainer: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    marginTop: -2.25 * theme.spacing.unit,
    padding: `${2.5 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`
  },
  image: {
    margin: "0 auto",
    height: 150,
    width: 150,
    [theme.breakpoints.up("sm")]: {
      height: 225,
      width: 225
    }
  },
  title: {
    height: 7 * theme.spacing.unit
  },
  icon: {
    marginRight: theme.spacing.unit / 2
  }
});

const RecipeCard = ({
  classes,
  title,
  imgUrl,
  cookingTime: { totalTime },
  fiveStarRating,
  source: { source: recipeWebsiteSource }
}: {
  classes: Object,
  title: string,
  imgUrl?: string,
  cookingTime?: {
    totalTime?: string
  },
  fiveStarRating: number,
  source: {
    source: string
  }
}) => {
  const hasCookingTime = !!totalTime;
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <CircularImage imgClassName={classes.image} src={imgUrl} alt={title} />
      </div>

      {/* Text */}
      <div className={classes.textContainer} justifyContent="space-between">
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
      </div>
    </div>
  );
};

export default withStyles(styles)(RecipeCard);
