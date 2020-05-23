/** @jsx jsx */

import { jsx, Styled } from "theme-ui";
import React from "react";

const Footer: React.FC<{}> = ({ children }) => {
  return (
    <footer sx={{ backgroundColor: "bgAccent", height: "600px" }}>
      {"This is Footer"}
      {children}
    </footer>
  );
};

export default Footer;
