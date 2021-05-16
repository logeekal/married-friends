/* @jsx jsx */

import { jsx, SxStyleProp, Link } from "theme-ui";
import React, { FC } from "react";
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
import DOMPurify from "dompurify";
import { ICompleteRecipe, IFAQObj } from "../../utils/types";
import RecipeCard from "../sections/RecipeCard";
import {getFAQs, stripFAQSection} from "../utils/modHTMLContent";
import FAQ from "../sections/FAQ";

export interface RecipePageProps {
  pageContext: {
    data: ICompleteRecipe[number];
    faqs: IFAQObj
  };
}

const RecipePage: FC<RecipePageProps> = ({ pageContext }) => {
  console.log(JSON.stringify(pageContext));
  const { post, content: recipe } = pageContext.data;

  const {faqs : allFAQObject } = pageContext

  const faqIds = getFAQs(post.content)

  const postContent =  stripFAQSection(post.content)

  console.log({postContent})

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
              <Link as={GastbyLink} to={`/${category.slug}`}>
                {category.name}{" "}
              </Link>
            </span>
            <span>
              <Text> / </Text>
              <AccentText>{`${date.day}.${date.month}.${date.year}`}</AccentText>
            </span>
          </div>

          <article
            sx={{
              "figure.wp-block-embed.is-type-video.is-provider-youtube": {
                width: "100%",
                padding:"0px",
                margin: "0px",

            },
              ".embed-youtube": {
                display: "block",
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
                iframe: {
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: "0px",
                  left: "0px",
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
          >
            <div
              dangerouslySetInnerHTML={{
                __html: postContent
              }}
            ></div>
            <RecipeCard recipe={recipe} recipePost={post}/>
            {

              faqIds.length > 0 &&  <FAQ faqs={allFAQObject} faqIds={faqIds} />
            }
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
