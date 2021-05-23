/* @jsx jsx */

import { jsx, SxStyleProp } from "theme-ui";
import React, {ReactNode} from "react";

export interface TagProps {
  sx?: SxStyleProp,
}

const Tag: React.FC<TagProps> = ({ children, sx, ...restProps }) => {
  return (
    <span
      sx={{
        color: "primary",
        fontWeight: 500,
        bg: "bgAccent",
        paddingX: "2px",
        paddingY: "1px",
        borderRadius: "3px",
        fontSize: "0.8rem",
        ...sx
      }}
      {...restProps}
    >
      {children}
    </span>
  );
};

export default Tag;
