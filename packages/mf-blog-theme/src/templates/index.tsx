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
import GoToTop from "../components/GoToTop";
import CategoryCard from "../sections/CategoryCard";
import SearchIndexContext from "../providers/IndexProvider";

interface HomeProps {
  pageContext: {
    posts: Post[];
  };
}

function Home({ pageContext }): React.ReactFragment {
  const { postObj, catObj } = pageContext;
  //console.log(postIndex);
  const posts = Object.values(postObj);
  const categories = Object.values(catObj)
  const minMargin = 0;

  return (
    <SearchIndexContext.Provider value={postObj}>
      <Layout>
        <GoToTop />
        <div className="home__carousel" sx={{ margin: minMargin + 1 }}>
          {typeof window !== "undefined" &&
            typeof document !== "undefined" &&
            Caraousel && <Caraousel sliderHeightInpx="600" />}
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
              border: "0px solid red",
              marginTop: 0,
              marginBottom: 0,
              flex: 0.7,
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
              border: "0px solid green",
              marginTop: 0,
              marginBottom: 0,
              flex: 0.3,
              "@media only screen and (max-width: 768px)": {
                flex: 1,
                width: "100%"
              }
            }}
          >
            <CategoryCard categories={categories} />
            <Instagram />
            <About />
            <Inspiration />
          </div>
        </div>
        <SubscribeMain />
      </Layout>
    </SearchIndexContext.Provider>
  );
}

export default Home;
