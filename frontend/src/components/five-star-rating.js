// @flow
import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

// Components
import Typography from "@material-ui/core/Typography";
import GradeIcon from "@material-ui/icons/Grade";
import Flex from "components/flex";

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit / 2
  },
  text: {
    marginTop: -1
  }
});

const FiveStarRating = ({
  rating,
  classes
}: {
  rating: number,
  classes: Object
}) => (
  <Flex>
    <GradeIcon className={classes.icon} fontSize="small" />
    <Typography variant="subheading" className={classes.text}>
      {rating.toFixed(2)}
    </Typography>
  </Flex>
);

export default withStyles(styles)(FiveStarRating);
