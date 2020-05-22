/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Caraousel from "responsive-react-image-carousel";
import React from "react";
import Header from "../components/header/Header";

interface HomeProps {}

function Home(props: HomeProps): React.ReactFragment {
  return (
    <React.Fragment>
      <Header
        title="Married Friends"
        subTitle="This is a sub title."
        menu={[
          {
            label: "Test 1",
            link: "/test",
            icon: "icon"
          }
        ]}
      />
      <Caraousel sliderHeightInpx="600"/>
      <Styled.h1> Hello, world from theme </Styled.h1>
    </React.Fragment>
  );
}

export default Home;
