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
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        <div
          className="home-left__container"
          sx={{
            border: "1px solid red",
            marginTop: 0,
            marginBottom: 0,
            flex:0.7,
            "@media only screen and (max-width: 768px)": {
              flex: 1,
              minWidth: "100%"
            }
          }}
        >
          <Grid articles={posts} />
        </div>
        <div
          className="home-right__container"
          sx={{
            border: "3px solid green",
            marginTop: 0,
            marginBottom: 0,
            flex: 0.3,
           "@media only screen and (max-width: 768px)": {
              flex: 1,
              width: "100%"
            }
}}
        >
          <Instagram />
          <About />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
