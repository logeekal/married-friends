/* @jsx jsx */

import { jsx, SxStyleProp, Link, Box, Flex } from "theme-ui";
import React, { FC, useEffect } from "react";
import { Post, Recipe } from "../types/wp-graphql.types";
import Layout from "../components/layout";
import { FLEX_CONFIG } from "../utils/style";
import SubscribeMain from "../sections/subscribe/SubscribeMain";
import { Text, AccentText } from "../components/Typography";
import { getFormattedDate } from "../utils";
import { SEOWithQuery } from "../components/SEO";
import genRecipeSchema from "../components/SEO/utils/genRecipeSchema";
import * as striptags from "striptags";
import { Link as GastbyLink } from "gatsby";
import { ICompleteRecipe, IFAQObj } from "../../utils/types";
import RecipeCard from "../sections/RecipeCard";
import {
  getFAQs,
  replaceYTwithLiteTY,
  stripFAQSection,
} from "../utils/modHTMLContent";
import FAQ from "../sections/FAQ";
import useWindow from "../hooks/useWindow";
import SocialShare from "../components/SocialShare";

export interface RecipePageProps {
  pageContext: {
    data: ICompleteRecipe[number];
    faqs: IFAQObj;
  };
}

const RecipePage: FC<RecipePageProps> = ({ pageContext }) => {
  const [hasWindow] = useWindow();

  useEffect(() => {
    if (hasWindow) {
      import("@justinribeiro/lite-youtube");
    }
  }, [hasWindow]);

  //console.log(JSON.stringify(pageContext));
  const { post, content: recipe } = pageContext.data;

  const { faqs: allFAQObject } = pageContext;

  const faqIds = getFAQs(post.content);

  const postContent = replaceYTwithLiteTY(stripFAQSection(post.content));

  //console.log({ postContent });

  let date = getFormattedDate(post.date);
  const category = post.recipeCuisines.nodes[0];
  return (
    <Layout>
      <SEOWithQuery
        title={post.title}
        description={striptags(post.excerpt)}
        image={post.featuredImage?.node?.mediaItemUrl}
        isArticle={true}
        url=""
        schemas={[
          {
            type: "recipe",
            schema: genRecipeSchema(post as Recipe, recipe),
          },
        ]}
      />
      <main
        sx={
          {
            ...FLEX_CONFIG("flex", "column"),
            paddingX: [1, 1, 2],
            maxWidth: "1000px",
            width: "100%",
            margin: "0 auto",
          } as SxStyleProp
        }

        itemScope
        itemType="https://schema.org/Article"
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
            itemProp="name"
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
              <Link as={GastbyLink} to={`/${category.uri}`}>
                {category.name}
              </Link>
            </span>
            <span>
              <Text> / </Text>
              <AccentText>{`${date.day}.${date.month}.${date.year}`}</AccentText>
            </span>
          </div>
      <Box className="recipe__extra">
        <Flex
          className="recipe__social"
          sx={{
            justifyContent: "space-between",
            paddingY: [1, 1, 2],
            paddingX: "0px"
          }}
        >
          <Box className="recipe__reactions"> </Box>
          <Box>
            <SocialShare pageTitle={post.title} pageURI={`${post.uri}`}  />
          </Box>
        </Flex>
      </Box>
          <div
            className="recipe__featured-image"
            sx={{
              width: "100%",
              marginTop: 1,
              paddingBottom: "calc(100% / (16/9))",
              position: "relative",
            }}
          >
            <img
              sx={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={post.featuredImage.node.mediaItemUrl}
              alt={`Image of ${post.title}`}
            />
          </div>

          <article
            sx={{
              "figure.wp-block-embed.is-type-video.is-provider-youtube": {
                width: "100%",
                padding: "0px",
                margin: "0px",
              },
              ".embed-youtube": {
                textAlign: "left !important",
                //display: "block",
                //position: "relative",
                //width: "100%",
                //paddingBottom: "56.25%",
                //iframe: {
                //position: "absolute",
                //width: "100%",
                //height: "100%",
                //top: "0px",
                //left: "0px",
                //},
              } as SxStyleProp,
              a: {
                textDecoration: "none",
                color: "accent",
                borderBottomWidth: "0px",
                borderBottomColor: "accent",
                borderBottomStyle: "solid",
              },
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: postContent,
              }}
            ></div>
            <RecipeCard recipe={recipe} recipePost={post} />
            {faqIds.length > 0 && <FAQ faqs={allFAQObject} faqIds={faqIds} />}
          </article>
        </section>
        <section className="section-sub">
          <SubscribeMain />
        </section>
      </main>
    </Layout>
  );
};

export default RecipePage;
