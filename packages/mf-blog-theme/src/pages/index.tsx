/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Caraousel from "responsive-react-image-carousel";
import React from "react";
import Layout from "../components/layout";
import Instagram from "../sections/instagram";

interface HomeProps {}

function Home(props: HomeProps): React.ReactFragment {
  return (
    <Layout>
      <Caraousel sliderHeightInpx="600" />
      <Instagram />
      <Styled.h1> Hello, world from theme </Styled.h1>
    </Layout>
  );
}

export default Home;
