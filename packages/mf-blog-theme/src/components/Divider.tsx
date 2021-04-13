import React, { FC } from "react";
import {SxStyleProp} from "theme-ui";

type  DividerProps =  { } & SxStyleProp

const Divider: FC<DividerProps> = (sx) => {
  return <hr sx={{
    width: "100px",
    height: "4px",
    border: "transparent",
    background: "accent",
    ...sx
  }} />
};

export default Divider;
