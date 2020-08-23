/* @jsx jsx */

import React from "react";
import { jsx, Styled, SxStyleProp } from "theme-ui";

type TypographyProps = React.PropsWithChildren<{
  className?: string;
  sx?: SxStyleProp;
}>;

interface ArticleHeaderProps extends TypographyProps {
  level: "1" | "2" | "3";
  restProps?: React.HTMLProps<HTMLHeadingElement>;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  children,
  level,
  sx,
  ...restProps
}) => {
  switch (level) {
    case "1":
      return (
        <Styled.h1 sx={{ ...sx }} {...restProps}>
          {children}
        </Styled.h1>
      );
    case "2":
      return (
        <Styled.h2 sx={{ ...sx }} {...restProps}>
          {children}
        </Styled.h2>
      );
    case "3":
      return (
        <Styled.h3 sx={{ ...sx }} {...restProps}>
          {children}
        </Styled.h3>
      );
    default:
      return (
        <Styled.h1 sx={{ ...sx }} {...restProps}>
          {children}
        </Styled.h1>
      );
  }
};

interface TextProps extends TypographyProps {
  spanProps?: React.HTMLAttributes<HTMLSpanElement>;
}

export const Text: React.FC<TextProps> = ({
  children,
  className,
  sx,
  spanProps
}) => {
  return (
    <span
      className={`article-normal-text ${className}`}
      sx={{
        color: "secondary",
        fontSize: 20,
        ...sx
      }}
      {...spanProps}
    >
      {children}
    </span>
  );
};

export const AccentText: React.FC<TextProps> = ({
  children,
  className,
  sx,
  ...spanProps
}) => {
  return (
    <span
      className={`accented-text ${className}`}
      sx={{
        color: "accent",
        cursor: "text",
        ...sx
      }}
      {...spanProps}
    >
      {children}
    </span>
  );
};
