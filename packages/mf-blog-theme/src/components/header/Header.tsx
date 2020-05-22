/** @jsx jsx */
import { jsx } from "theme-ui";

import React from "react";

interface MenuShape {
  label: string;
  icon: string;
  link: string;
}

interface HeaderProps {
  title: String;
  subTitle: String;
  menu: Array<MenuShape>;
}

const Header: React.FC<HeaderProps> = props => {
  return (
    <header
      sx={{
        height: 200
      }}
    ></header>
  );
};

export default Header;
