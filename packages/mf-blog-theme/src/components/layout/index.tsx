import React from "react";
import Header from "../header/Header";
import Footer from "../footer";
import HeaderSection from "../../sections/HeaderSections";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      {" "}
      <HeaderSection
        title="Married Friends."
        subTitle="creating a delicious lifestyle together"
        menu={[
          {
            label: "Test 1",
            link: "/test",
            icon: "icon"
          }
        ]}
      />
      {children}
      <Footer>
      </Footer>
    </div>
  );
};

export default Layout;
