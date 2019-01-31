// @flow
import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  circularContainer: {
    // display: "inline-block",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto"
  },
  image: {
    display: "block",
    objectFit: "cover",
    margin: "0 auto"
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
      style={{
        width: Number(size) ? `${size}px` : size,
        height: Number(size) ? `${size}px` : size
      }}
    />
  </div>
);

export default withStyles(styles)(CircularImage);
