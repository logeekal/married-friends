/* @jsx jsx */

import { jsx, Link } from "theme-ui";
import React, { FC } from "react";
import { FLEX_CONFIG } from "../utils/style";
import { SxStyleProp } from "theme-ui";
import { Link as GastbyLink } from 'gatsby';


export interface CategoryCountItemProps
  extends React.HTMLProps<HTMLDivElement> {
  name: string;
  count: number;
  link: string;
  sx?: SxStyleProp;
}

const CategoryCountItem: FC<CategoryCountItemProps> = props => {
  return (
    <Link as={GastbyLink} to={`/${props.link}`} sx={{display: "block",
          ...props.sx,
      textDecoration: "none",
      color:"secondary"
      }}>
    <div
      className="category-count__container"
      sx={
        {
          ...FLEX_CONFIG("flex", "row"),
          justifyContent: "space-between",
          marginLeft: 0,
          marginRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        } as SxStyleProp
      }
    >
      <span sx={{ textTransform: "capitalize" }}>{props.name}</span>
      <span>({props.count})</span>
    </div>
      </Link>
  );
};

export default CategoryCountItem;
