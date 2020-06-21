/** @jsx jsx */

import React from "react";
import { jsx, SxStyleProp } from "theme-ui";
import Header from "../components/header/Header";
import DecoratedHeading from "../components/DecoratedHeading";
import { FLEX_CONFIG } from "../utils/style";
import SocialIcons from "../components/SocialIcons";
import { ICON_COMPONENTS } from "../utils/config";

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
  const [isHeaderSticky, setIsHeaderSticky] = React.useState(false);

  React.useEffect(() => {
    const win = typeof window === "object" && window;

    function onScroll() {
      window.scrollY > 40 ? setIsHeaderSticky(true) : setIsHeaderSticky(false);
    }

    win.addEventListener("scroll", onScroll);

    return () => {
      win.removeEventListener("scroll", onScroll);
    };
  });
  return (
    <Header>
      <div
        className={`header-container ${isHeaderSticky && "sticky"}`}
        sx={
          {
            ...FLEX_CONFIG(),
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            backgroundColor: "bgPrimary",
            maxHeight: "200px",
            transformOrigin: "0px",
            "&.sticky": {
              position: "fixed",
              top: "0px",
              left: "0px",
              height: "80px",
              zIndex: "9999",
              paddingLeft: 0,
              paddingRight: 0,
              width: "100%"
            }
          } as SxStyleProp
        }
      >
        <div
          className="header__menu"
          sx={{
            flex: 0.25,
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            svg: {
              cursor: "pointer",
              "&:hover": {
                stroke: "accent"
              }
            }
          }}
        >
          {ICON_COMPONENTS.menu}
        </div>
        <div
          className="header__heading"
          sx={
            {
              fontSize: 3,
              justifySelf: "center",
              justifyItems: "center",
              alignItems: "center",
              paddingX: "15px",
              height: "100%",
              ...FLEX_CONFIG("inline-flex", "column")
            } as SxStyleProp
          }
        >
          <DecoratedHeading heading={title} fontSizes={[3, 4]} />
          {!isHeaderSticky && (
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
          )}
        </div>
        <div
          className="header__controls"
          sx={
            {
              height: "100%",
              flex: "0.25",
              ...FLEX_CONFIG(),
              justifyContent: "flex-end"
            } as SxStyleProp
          }
        >
          <SocialIcons />
        </div>
      </div>
    </Header>
  );
};

export default HeaderSection;
