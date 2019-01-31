import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "65vh",
    transition: "height 175ms ease-in",
    [theme.breakpoints.up("sm")]: {
      height: "45vh"
    }
  },
  img: {
    display: "block",
    objectFit: "cover",
    width: "100%",
    margin: "0 auto"
  }
});

const JumbotronImg = ({ classes, src, alt }) => (
  <div
    className={classes.container}
    style={{ backgroundImage: `url(${src})` }}
  />
);

export default withStyles(styles)(JumbotronImg);
