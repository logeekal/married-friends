/** @jsx jsx */

import React from "react";
import { jsx, SxStyleProp } from "theme-ui";
import Header from "../components/header/Header";
import DecoratedHeading from "../components/DecoratedHeading";
import { FLEX_CONFIG } from "../utils/style";
import SocialIcons from "../components/SocialIcons";
import { ICON_COMPONENTS } from "../utils/config";
import useWindowDims from "../hooks/useWindowDims";

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
  const { width: windowWidth, height } = useWindowDims();

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
            height: "100%",
            backgroundColor: "bgPrimary",
            maxHeight: "200px",
            transformOrigin: "0px",
            marginLeft: 1,
            marginRight: 1,
            "&.sticky": {
              position: "fixed",
              width: "100%",
              paddingLeft: "30px",
              paddingRight: "30px",
              marginLeft: "0px",
              marginRight: "0px",
              boxShadow: "1px 1px 12px 1px rgba(0,0,0,0.5)",
              top: "0px",
              left: "0px",
              height: "80px",
              zIndex: "9999",
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
              paddingX: "15px",
              height: "100%",
              ...FLEX_CONFIG("inline-flex", "column"),
              flex: "auto",
              alignItems: windowWidth <= 700 ? "flex-start" : "center"
            } as SxStyleProp
          }
        >
          <DecoratedHeading
            heading={title}
            fontSizes={windowWidth <= 700 ? [1, 2] : [3, 4]}
            responsive={false}
          />
          {!isHeaderSticky && (
            <div
              className="header__subtitle"
              sx={{
                fontFamily: "cursive",
                fontSize: 3,
                color: "secondary",
                "@media only screen and (max-width: 700px)": {
                  display: "none"
                }
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
              justifyContent: "flex-end",
              "@media only screen and (max-width: 700px)": {
                display: "flex"
              }
            } as SxStyleProp
          }
        >
          {windowWidth < 700 ? (
            <SocialIcons socialProfiles={[]} includeSearch={true} />
          ) : (
            <SocialIcons />
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderSection;
