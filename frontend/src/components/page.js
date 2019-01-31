import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  page: {
    padding: `${3 * theme.spacing.unit}px 0`
  }
});

const Page = ({ classes, className = "", style = {}, children }) => (
  <div className={classNames(classes.page, className)}>{children}</div>
);

export default withStyles(styles)(Page);
