/** @jsx jsx */

import { jsx, SxStyleProp, SxProps, Divider } from "theme-ui";
import React from "react";
import DecoratedHeading from "./DecoratedHeading";

type CardProps = React.PropsWithChildren<{
  heading: string;
  footer: React.ReactNode;
  cardStyle?: SxStyleProp;
  footerStyle?: SxStyleProp;
  contentStyle?: SxStyleProp;
  headerStyle?: SxStyleProp;
  className: string;
  restProps?: React.HTMLProps<HTMLDivElement>;
}>;

const Card: React.FC<CardProps> = ({
  children,
  heading,
  footer,
  className,
  cardStyle = {},
  footerStyle = {},
  contentStyle = {},
  headerStyle = {},
  ...restProps
}) => {
  console.log(cardStyle);
  return (
    <div
      className={`card-container ${className}`}
      sx={{
        backgroundColor: "bgCard",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingInline: "30px",
        margin: 1,
        ...cardStyle
      }}
      {...restProps}
    >
      <div
        className="card__header"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 1,
          paddingBottom: 1,
          ...headerStyle
        }}
      >
        <DecoratedHeading
          heading={heading}
          fontSizes={[2, 3]}
          responsive={false}
        />
      </div>
      <Divider sx={{ marginTop: "0px" }} />
      <div
        className="card__content"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          color: "secondary",
          ...contentStyle
        }}
      >
        {children}
      </div>
      <div
        className="card__footer"
        sx={{
          paddingY:2 ,
          color: "accent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          textTransform: "uppercase",
          fontSize: 0,
          width: "100%",
          ...footerStyle
        }}
      >
        {footer}
      </div>
    </div>
  );
};

export default Card;
