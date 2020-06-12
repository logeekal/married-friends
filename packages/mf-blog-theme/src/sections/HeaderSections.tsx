/** @jsx jsx */

import React from "react";
import { jsx, SxStyleProp } from "theme-ui";
import Header from "../components/header/Header";
import DecoratedHeading from "../components/DecoratedHeading";
import {FLEX_CONFIG} from '../utils/style';


interface MenuShape {
  label: string;
  icon: string;
  link: string;
}

interface HeaderSectionProps {
  title: string;
  subTitle: string;
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
          ...FLEX_CONFIG(),
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          
        }as SxStyleProp}
      >
        <div
          className="header__menu"
          sx={{
            flex: 0.25,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Menu
        </div>
        <div
          className="header__heading"
          sx={{
            fontSize: 3,
            justifySelf: "center",
            justifyItems: "center",
            alignItems: "center",
            paddingX: "15px",
            height: "100%",
            ...FLEX_CONFIG('inline-flex','column')
          } as SxStyleProp}
        >
          <DecoratedHeading heading={title} fontSizes={[3, 4]} />
          <div
            className="header__subtitle"
            sx={{
              fontFamily: "cursive",
              fontSize: 3,
              color: "secondary"
            }}
          >
            {subTitle}
          </div>
        </div>
        <div
          className="header__controls"
          sx={{
            height: "100%",
            flex: '0.25',
            ...FLEX_CONFIG()
          }as SxStyleProp}
        >
          Controls
        </div>
      </div>
    </Header>
  );
};

export default HeaderSection;
