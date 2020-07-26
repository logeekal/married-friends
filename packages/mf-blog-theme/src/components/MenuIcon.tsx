/* @jsx jsx */

import { jsx } from "theme-ui";
import React, { FC } from "react";

export interface MenuIconProps {
  isOpen: boolean;
  width?: number;
  strokeWidth?: number;
  strokeColor: string;
  alternateColor: string;
}

const MenuIcon: FC<MenuIconProps> = props => {
  const {
    isOpen,
    width = 20,
    strokeWidth = 2,
    strokeColor = "black",
    alternateColor = "black"
  } = props;
  const getMargin = () => {
    //let height = strokeWidth * 3 + margin*2;
    //Math.sin(Math.PI/4 //45deg) = height/width i.e. hypotenuse

    let margin = Math.sin(Math.PI / 4) * width - strokeWidth * 2;
    return Math.floor(margin / 2);
  };
  const [margin, setMargin] = React.useState(getMargin());

  React.useEffect(() => {
    setMargin(getMargin());
  }, [strokeWidth, width]);
  return (
    <div
      className={`menu ${isOpen ? "open" : ""}`}
      sx={{
        display: "block",
        "&:hover": {
          cursor: "pointer",
          ".line:after": {
            backgroundColor: alternateColor
          }
        },
        ".line:after": {
          display: "block",
          content: '""',
          height: `${strokeWidth}px`,
          width: `${props.width || 20}px`,
          backgroundColor: strokeColor,
          margin: margin,
          transformOrigin: "left",
          transition: "all 0.3s ease-out"
        },
        "&.open": {
          ".top:after": {
            transform: "rotate(45deg)"
          },
          ".middle:after": {
            opacity: 0
          },
          ".bottom:after": {
            transform: "rotate(-45deg)"
          }
        }
      }}
    >
      <div className="line top"></div>
      <div className="line middle"></div>
      <div className="line bottom"></div>
    </div>
  );
};

export default MenuIcon;
