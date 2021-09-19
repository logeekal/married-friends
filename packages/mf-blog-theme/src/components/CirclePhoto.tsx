/** @jsx jsx */

import { ImgHTMLAttributes } from "react";
import { jsx, SxProps, SxStyleProp } from "theme-ui";

type CircularPhotoProps = ImgHTMLAttributes<HTMLImageElement> & {
  sx?: SxStyleProp;
};

export default function CircularPhoto(props: CircularPhotoProps) {
  let { sx, className, ...restProps } = props;

  return (
    <img
      className={`circle-img ${className || ""}`}
      sx={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        ...sx,
      }}
      {...restProps}
    ></img>
  );
}
