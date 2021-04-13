/* @jsx jsx */

import { jsx, SxProps, SxStyleProp } from "theme-ui";
import React, { FC } from "react";
import { AiOutlineVerticalAlignTop } from "react-icons/ai";
import { FLEX_CONFIG } from "../utils/style";
import { useScroll } from "../hooks/useScroll";

export interface GoToTopProps {}

const GoToTop: FC<GoToTopProps> = props => {
  const { scrollTo, scrollHeight } = useScroll();
  return (
    <div
      className="go-to-top__container"
      onClick={() => {
        scrollTo(0);
      }}
      sx={
        {
          position: "fixed",
          bottom: "50px",
          right: "50px",
          bg: "accent",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          ...FLEX_CONFIG("flex", "column"),
          display: scrollHeight < 200 ? "none" : "flex",
          cursor: "pointer",
          boxShadow: "1px 2px 5px 1px rgba(0,0,0,0.5)",
          transition: "0.3s all ease-in-out",
          "&:hover": {
            svg: {
              transform: "scale(1.25)"
            },
            transform: "scale(0.95)",
            boxShadow: "1px 3px 7px 1px rgba(0,0,0,0.5)"
          }
        } as SxStyleProp
      }
    >
      <AiOutlineVerticalAlignTop
        sx={{
          width: "25px",
          height: "25px",
          fill: "bgPrimary",
          transition: "0.3s all ease-in-out"
        }}
      />
    </div>
  );
};

export default GoToTop;
