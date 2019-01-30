// @flow
import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  circularContainer: {
    boxShadow: theme.shadows["9"],
    borderRadius: "50%",
    overflow: "hidden"
  },
  image: {
    display: "block",
    height: 150,
    width: 150,
    margin: "0 auto",
    objectFit: "cover"
  }
});

const CircularImage = ({
  classes,
  src,
  alt,
  size,
  containerClassName = "",
  imgClassName = ""
}: {
  classes: Object,
  src: string,
  alt: string,
  size: number | string,
  className?: string
}) => (
  <div className={classNames(classes.circularContainer, containerClassName)}>
    <img
      className={classNames(classes.image, imgClassName)}
      src={src}
      alt={alt}
    />
  </div>
);

export default withStyles(styles)(CircularImage);
