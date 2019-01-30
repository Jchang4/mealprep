// @flow
import React from "react";

import Flex from "./flex";

const Row = ({
  justifyContent = "flex-start",
  alignItems = "flex-start",
  flexWrap = "wrap",
  className = "",
  style = {},
  children
}: {
  justifyContent:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-between",
  alignItems: "baseline" | "center" | "end" | "flex-start" | "flex-end",
  flexWrap: "wrap" | "nowrap",
  className: string,
  style: object,
  children: any
}) => (
  <Flex
    flexDirection="row"
    justifyContent={justifyContent}
    alignItems={alignItems}
    flexWrap={flexWrap}
    className={className}
    style={style}
  >
    {children}
  </Flex>
);

export default Row;
