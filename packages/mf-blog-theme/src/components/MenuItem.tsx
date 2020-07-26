/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { FC } from "react";

export interface MenuItemProps {
  title: string;
  onSelect: () => void;
}

const MenuItem: FC<MenuItemProps> = props => {
  return (
    <div
      className="menu-item"
      sx={{
        fontSize: 4,
        margin: 1,
        fontFamily: "cursive",
        cursor: "pointer",
        position: "relative",
        "&:after": {
          content: '""',
          display: "block",
          position: "absolute",
          bottom: "10px",
          width: "100%",
          height: "2px",
          backgroundColor: "accent",
          borderBottomColor: "bgAccent",
          borderBottomWidth: "10px",
          borderBottomStyle: "solid",
          boxShadow: "0px 2px 10px hotpink",
          opacity: 0,
          transform: "rotate(-5deg)"
        },
        "&:hover": {
          fontWeight: 600,
          "&:after": {
            opacity: 0.5
          }
        }
      }}
      onClick={props.onSelect}
    >
      <span> {props.title} </span>
    </div>
  );
};

export default MenuItem;
