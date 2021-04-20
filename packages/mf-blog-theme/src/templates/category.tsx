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
import {
  Post,
  Category,
  RecipeCuisine,
  RecipeCourse,
  Recipe,
} from "../types/wp-graphql.types";
import GoToTop from "../components/GoToTop";
import CategoryCard from "../sections/CategoryCard";
import SearchIndexContext from "../providers/IndexProvider";
import useWindow from "../hooks/useWindow";
import { SEO, SEOWithQuery } from "../components/SEO";

interface CategoryProps {
  pageContext: {
    type: "recipe" | "post";
    category: Category | RecipeCuisine | RecipeCourse;
  };
}

console.log(`Carousel is ${Caraousel}`);

function CategoryPage({ pageContext }: CategoryProps): React.ReactFragment {
  //const { postObj, catObj } = pageContext;
  //console.log(postIndex);
  let category: RecipeCuisine | RecipeCourse | Category;
  if (pageContext.type === "post") {
    category = pageContext.category as Category;
  }

  let posts: Post[] | Recipe[];

  if (pageContext.type === "post") {
    posts = (pageContext.category as Category).posts.nodes;
  } else {
    posts = (pageContext.category as RecipeCuisine).recipes.nodes;
  }

  const minMargin = 0;

  const [hasWindow, hasDocument] = useWindow();
  return (
    <Layout>
      <GoToTop />
      <SEOWithQuery isArticle={false} />
      <div
        className="home__carousel"
        sx={{ margin: minMargin + 1, height: "400px" }}
      >
        {hasWindow && hasDocument && <Caraousel />}
      </div>
      <div
        className="home__container"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
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
              minWidth: "100%",
            },
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
            maxWidth: "400px",
            flex: 0.3,
            "@media only screen and (max-width: 768px)": {
              flex: 1,
              maxWidth: "100%",
              width: "100%",
            },
          }}
        >
          <Instagram />
          <About />
          <Inspiration />
        </div>
      </div>
      <SubscribeMain />
    </Layout>
  );
}

export default CategoryPage;
