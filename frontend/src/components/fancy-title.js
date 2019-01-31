import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  title: {
    fontSize: theme.typography.h1.fontSize,
    lineHeight: theme.typography.h1.lineHeight,
    letterSpacing: theme.typography.h1.letterSpacing
  }
});

const FancyTitle = ({
  classes,
  // Props
  className,
  style,
  children
}) => (
  <h1 className={classNames(className, "fancy-title")} style={style}>
    {children}
  </h1>
);

export default withStyles(styles)(FancyTitle);
