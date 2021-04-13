/** @jsx jsx */

import React from "react";
import { jsx } from "theme-ui";
interface DecoratedHeadingProps {
  heading: string;
  fontSizes: number[];
  responsive: boolean;
}

const getResponsiveFontSizes = (responsive: boolean, fontSizes: number[2]) => {
  if (fontSizes[0] !== 0 && responsive) {
    return [fontSizes[0] - 1, fontSizes[1] - 1];
  }
  return fontSizes;
};

const DecoratedHeading: React.FC<DecoratedHeadingProps> = ({
  heading,
  fontSizes,
  responsive = false
}) => (
  <div
    className="decorated-heading-container"
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap"
    }}
  >
    {heading.split(" ").map(part => {
      return (
        <div
          className="decorated-heading"
          sx={{
            fontFamily: "special",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span
            sx={{
              color: "accent",
              fontSize: fontSizes[1],
              "@media only screen and (max-width: 700px)": {
                fontSize: getResponsiveFontSizes(responsive, fontSizes)[1]
              }
            }}
          >
            {part.split("")[0]}
          </span>
          <span
            sx={{
              color: "primary",
              fontSize: fontSizes[0],
              "@media only screen and (max-width: 700px)": {
                fontSize: getResponsiveFontSizes(responsive, fontSizes)[0]
              }
            }}
          >
            {part.slice(1)}
          </span>
          <span sx={{ marginLeft: "0.5rem" }}></span>
        </div>
      );
    })}
  </div>
);
export default DecoratedHeading;
