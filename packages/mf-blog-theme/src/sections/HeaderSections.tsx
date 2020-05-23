/** @jsx jsx */

import React from "react";
import { jsx } from "theme-ui";
import Header from "../components/header/Header";
import DecoratedHeading from "../components/DecoratedHeading";

interface MenuShape {
  label: string;
  icon: string;
  link: string;
}

interface HeaderSectionProps {
  title: String;
  subTitle: String;
  menu: Array<MenuShape>;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  subTitle,
  menu
}) => {
  return (
    <Header>
      <div
        className="header-container"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyItems: "center",
          width: "100%",
          height: "100%"
        }}
      >
        <div className="header__menu" sx={{ flex: 0.5 }}>
          Menu
        </div>
        <div
          sx={{
            fontSize: 3,
            justifySelf: "center",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            paddingX: "15px"
          }}
        >
          <DecoratedHeading heading={title} fontSizes={[3, 4]} />
          <div
            class="header__subtitle"
            sx={{
              fontFamily: "cursive",
              fontSize: 3,
              color: "secondary",
            }}
          >
            {subTitle}
          </div>
        </div>
        <div className="header__controls" sx={{ flex: 0.5 }}>
          Controls
        </div>
      </div>
    </Header>
  );
};

export default HeaderSection;
