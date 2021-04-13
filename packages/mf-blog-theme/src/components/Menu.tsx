/* @jsx jsx */

import { jsx, SxStyleProp } from "theme-ui";
import React, { FC } from "react";
import MenuItem from "./MenuItem";
import { FLEX_CONFIG } from "../utils/style";

export interface MenuProps {
  visible: boolean;
}

const Menu: FC<MenuProps> = props => {
  return (
    <div
      className={`menu-container ${props.visible ? "visible" : ""}`}
      sx={
        {
          position: "fixed",
          display: "block",
          top: "0px",
          left: "0px",
          backgroundColor: "bgPrimary",
          zIndex: 999,
          bg: "bgPrimary",
          width: "100vw",
          height: "100vh",
          ...FLEX_CONFIG("flex", "column"),
          clipPath: "circle(0px at 0 0)",
          transition: "all 0.5s ease-out",
          ".menu-item": {
            opacity: 0,
            transform: "translateY(-10px)",
            transition: "opacity 0.4s ease-out 0.4s, transform 0.4s ease-out 0.4s"
          },
          "&.visible": {
            clipPath: "circle(4000px at 0 0)",
            ".menu-item": {
              opacity: 1,
              transform: "translateY(0)"
            }
          }
        } as SxStyleProp
      }
    >
      <MenuItem title="Home" onSelect={() => console.log("Home Selected")} />
      <MenuItem
        title="Page 2"
        onSelect={() => console.log("Page 2 Selected")}
      />
      <MenuItem
        title="Page 3"
        onSelect={() => console.log("Page 3 Selected")}
      />
      <MenuItem
        title="Page 4"
        onSelect={() => console.log("Page 4 Selected")}
      />
    </div>
  );
};

export default Menu;
