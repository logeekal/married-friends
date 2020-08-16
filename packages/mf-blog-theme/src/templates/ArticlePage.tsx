/* @jsx jsx */

import { jsx } from "theme-ui";
import React, { FC } from "react";
import { Post } from "../types/wp-graphql.types";
import Layout from "../components/layout";
import SearchIndexContext from "../providers/IndexProvider";

export interface ArticlePageProps {
  pageContext: {
    post: Post;
  };
}

const ArticlePage: FC<ArticlePageProps> = ({ pageContext }) => {
  const { post } = pageContext;
  console.log(post);
  return (
    <SearchIndexContext.Provider value={{}}>
      <Layout>
        <main>
          <section
            sx={{
              margin: "0 auto",
              display: "block",
              width: "70%",
              paddingX: 1
            }}
          >
            <h1
              sx={{
                fontSize: 4,
                marginY: 1
              }}
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
            <article dangerouslySetInnerHTML={{ __html: post.content }} />
          </section>
        </main>
      </Layout>
    </SearchIndexContext.Provider>
  );
};

export default ArticlePage;
