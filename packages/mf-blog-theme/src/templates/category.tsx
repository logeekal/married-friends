/* @jsx jsx */

import { jsx, Styled, Box } from "theme-ui";
import React, { useState } from "react";
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
import { IRecipeObject } from "../../utils/types";
import genItemListSchema from "../components/SEO/utils/genItemListSchema";
import {log} from "../utils";

interface CategoryProps {
  pageContext: {
    type?: "category" | "home";
    tagLine: string;
    category: RecipeCuisine | RecipeCourse;
    postObj: IRecipeObject;
  };
}

function RecipeCategoryPage({
  pageContext,
}: CategoryProps): React.ReactFragment {

  const { postObj, tagLine, category } = pageContext;

  const isHomePage = category == undefined || category == null;

  let postIds: number[];

  if (pageContext.category && Object.keys(pageContext.category).length > 0) {
    log(" ***** ", pageContext.category);
    postIds = (pageContext.category as RecipeCuisine).recipes.nodes.map(
      (node) => node.recipeId
    );
  } else {
    log("type of: ", pageContext.type);
    if (pageContext.type === "home") {
      postIds = Object.values(pageContext.postObj).map((post) => post.recipeId);
      log({ postIds });
    } else {
      postIds = [];
    }
  }

  const minMargin = 0;

  const [hasWindow, hasDocument] = useWindow();
  const [filteredPosts, setFilteredPosts] = useState<Array<string>>([]);

  return (
    <Layout>
      <GoToTop />
      <SEOWithQuery
        title={`${tagLine} | The Fearless Cooking`}
        description={
          pageContext.type === "home" ? null : pageContext.category.description
        }
        image={null}
        isArticle={false}
        url=""
        schemas={[
          {
            type: "list",
            schema: genItemListSchema(Object.values(postObj))
          }
        ]}
      />
      <div
        className="home__container "
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Box className={`home__search ${isHomePage ? "" : "category"}`}></Box>
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
          <Grid postIds={postIds} postObj={postObj} />
        </div>
      </div>
      <SubscribeMain />
    </Layout>
  );
}

export default RecipeCategoryPage;
