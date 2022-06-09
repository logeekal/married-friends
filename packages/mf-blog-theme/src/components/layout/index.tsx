/* @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import Footer from "../footer";
import HeaderSection from "../../sections/HeaderSections";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div
      sx={{
        "*::selection": {
          color: "bgPrimary",
          backgroundColor: "primary"
        }
      }}
    >
      <HeaderSection
        title="The Fearless Cooking"
        subTitle="Every great recipe is a result of a fearless experiment"
        menu={[
          {
            label: "Test 1",
            link: "/test",
            icon: "icon"
          }
        ]}
      />
      <div
        className="page_content"
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0
        }}
      >
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
