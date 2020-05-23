/** @jsx jsx */

import { jsx } from "theme-ui";
import React from "react";
import DecoratedHeading from "./DecoratedHeading";

type CardProps = React.PropsWithChildren<{
  heading: string;
}>;

const Card: React.FC<CardProps> = ({ children, heading }) => {
  return (
    <div
      className="card-container"
      sx={{
        width: "100%",
        backgroundColor: "bgCard",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center"
      }}
    >
      <div className="card__header">
        <DecoratedHeading heading={heading} fontSizes={[2,3]} />
      </div>
      <div className="card__content">{children}</div>
      <div className="card__footer"></div>
    </div>
  );
};


export default Card;
