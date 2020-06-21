/* @jsx jsx */

import { jsx, Styled } from "theme-ui";
import Caraousel from "responsive-react-image-carousel";
import React from "react";
import Layout from "../components/layout";
import Instagram from "../sections/instagram";
import Inspiration from "../sections/Inspiration";
import About from "../sections/About";
import Grid from "../sections/articles/grid";
import SubscribeMain from "../sections/subscribe/SubscribeMain";
import { Post } from "../types/wp-graphql.types";

interface HomeProps {
  pageContext: {
    posts: Post[];
  };
}

function Home({ pageContext }): React.ReactFragment {
  const { posts } = pageContext;
  console.log(posts);
  const minMargin = 0;
  return (
    <Layout>
      <div className="home__carousel" sx={{ margin: minMargin }}>
        <Caraousel sliderHeightInpx="600" />
      </div>
      <div
        className="home__container"
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        <div
          className="home-left__container"
          sx={{ flex: "0.70", border: "1px solid red", margin: minMargin }}
        >
          <Grid articles={posts} />
        </div>
        <div
          className="home-right__container"
          sx={{ flex: "0.30", border: "3px solid green", margin: minMargin }}
        >
          <Instagram />
          <About />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
