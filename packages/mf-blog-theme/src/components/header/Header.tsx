/** @jsx jsx */
import { jsx } from "theme-ui";

import React from "react";

const Header: React.FC<{}> = ({ children }) => {
  return (
    <header
      sx={{
        height: 200
      }}
    >
      {children}
    </header>
  );
};

export default Header;
