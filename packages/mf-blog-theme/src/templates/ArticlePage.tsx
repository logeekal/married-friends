/* @jsx jsx */

import { jsx, SxStyleProp, Link } from "theme-ui";
import React, { FC } from "react";
import { Post } from "../types/wp-graphql.types";
import Layout from "../components/layout";
import SearchIndexContext from "../providers/IndexProvider";
import { FLEX_CONFIG } from "../utils/style";
import SubscribeMain from "../sections/subscribe/SubscribeMain";
import { Text, AccentText } from "../components/Typography";
import { getFormattedDate } from "../utils";
import { SEOWithQuery } from "../components/SEO";
import * as striptags from 'striptags'

export interface ArticlePageProps {
  pageContext: {
    post: Post;
  };
}

const ArticlePage: FC<ArticlePageProps> = ({ pageContext }) => {
  const { post } = pageContext;

  let date = getFormattedDate(post.date);
  const category = post.categories.nodes[0];
  return (
    <Layout>
      <SEOWithQuery
        title={post.title}
        description={striptags(post.excerpt)}
        image={post.featuredImage.mediaItemUrl}
        isArticle={false}
        url=""
      />
      <main
        sx={
          {
            ...FLEX_CONFIG("flex", "column"),
            paddingX: 2,
            maxWidth: "1000px",
            width: "100%",
            margin: "0 auto",
          } as SxStyleProp
        }
      >
        <section
          sx={{
            margin: "0 auto",
            display: "block",
            width: "100%",
          }}
        >
          <h1
            sx={{
              fontSize: 3,
              marginBottom: 1,
              marginTop: "0px",
            }}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <div
            className="card__date"
            sx={{
              fontSize: 0,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <span>
              <Link href={`/${category.slug}`}>{category.name} </Link>
            </span>
            <span>
              <Text> / </Text>
              <AccentText>{`${date.day}.${date.month}.${date.year}`}</AccentText>
            </span>
          </div>

          <article
            sx={{
              ".embed-youtube": {
                display: "block",
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
                iframe: {
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                },
              },
              a: {
                textDecoration: "none",
                color: "accent",
                borderBottomWidth: "0px",
                borderBottomColor: "accent",
                borderBottomStyle: "solid",
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>
        <section class="section-sub">
          <SubscribeMain />
        </section>
      </main>
    </Layout>
  );
};

export default ArticlePage;
