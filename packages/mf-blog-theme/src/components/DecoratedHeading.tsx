/** @jsx jsx */

import React from "react";
import { jsx } from "theme-ui";
interface DecoratedHeadingProps {
  heading: string;
  fontSizes: number[];
}

const DecoratedHeading: React.FC<DecoratedHeadingProps> = ({
  heading,
  fontSizes
}) => (
  <React.Fragment>
    {heading.split(" ").map(part => {
      return (
        <span
          className="decorated-heading"
          sx={{
            fontFamily: "special",
            textTransform: "uppercase"
          }}
        >
          <span sx={{ color: "accent", fontSize: fontSizes[1] }}>
            {part.split("")[0]}
          </span>
          <span sx={{ color: "primary", fontSize: fontSizes[0] }}>
            {part.slice(1)}
          </span>
          <span>&nbsp;</span>
        </span>
      );
    })}
  </React.Fragment>
);
export default DecoratedHeading;
