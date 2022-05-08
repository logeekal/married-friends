/* @jsx jsx */

import { jsx, SxStyleProp, Link, Box, Flex } from "theme-ui";
import React, { FC, useEffect } from "react";
import { Post, Recipe } from "../types/wp-graphql.types";
import Layout from "../components/layout";
import { FLEX_CONFIG } from "../utils/style";
import SubscribeMain from "../sections/subscribe/SubscribeMain";
import { Text, AccentText } from "../components/Typography";
import { getFormattedDate, log } from "../utils";
import { SEOWithQuery } from "../components/SEO";
import genRecipeSchema from "../components/SEO/utils/genRecipeSchema";
import * as striptags from "striptags";
import { Link as GastbyLink } from "gatsby";
import { ICompleteRecipe, IFAQObj } from "../../utils/types";
import RecipeCard from "../sections/RecipeCard";
import FAQ from "../sections/FAQ";
import useWindow from "../hooks/useWindow";
import SocialShare from "../components/SocialShare";
import Tag from "../components/Tag";

export interface RecipePageProps {
  pageContext: {
    data: ICompleteRecipe[number];
    faqs: IFAQObj;
    faqIds: Array<number>;
    videoId: string;
  };
}

const RecipePage: FC<RecipePageProps> = ({ pageContext }) => {

  const [hasWindow] = useWindow();


  //log(JSON.stringify(pageContext));
  const { post, content: recipe } = pageContext.data;

  const { faqs: allFAQObject } = pageContext;

  const faqIds = pageContext.faqIds || [];

  const recipeVideoId = pageContext.videoId
  
  const postContent = post.content

  //log({recipe, allFAQObject, post, faqIds, recipeVideoId})

  let date = getFormattedDate(post.date);
  const category = post.recipeCuisines.nodes[0];
  const cuisines = post.recipeCuisines.nodes;
  const courses = post.recipeCourses.nodes;

  const getTags = () => {
    const cuisineTags = cuisines.map((cuisine, index) => {
      return (
        <span key={`cuisine-${index}`} className={`cuisine-${index}`}>
          <Tag>
            <Link
              as={GastbyLink}
              to={`${cuisine.uri}`}
              sx={{
                color: "primary",
              }}
            >
              {cuisine.name}
            </Link>
          </Tag>
        </span>
      );
    });

    const courseTags = courses.map((course, index) => {
      return (
        <span key={`course-${index}`} className={`course-${index}`}>
          <Tag>
            <Link
              as={GastbyLink}
              to={`${course.uri}`}
              sx={{
                color: "primary",
              }}
            >
              {course.name}
            </Link>
          </Tag>
        </span>
      );
    });

    return [...courseTags, ...cuisineTags];
  };

  return (
    <Layout>
      <SEOWithQuery
        title={`${post.title} - Kitchen of Married Friends` }
        description={striptags(post.excerpt)}
        image={post.featuredImage?.node?.sourceUrl || post.featuredImage?.node?.mediaItemUrl}
        isArticle={true}
        url={post.uri}
        schemas={[
          {
            type: "recipe",
            schema: genRecipeSchema(post as Recipe, recipe, pageContext.videoId),
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
            itemProp="name headline"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <div
            className="card__date"
            sx={{
              fontSize: 0,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              className="tags"
              sx={{
                display: "flex",
                gap: 0,
                alignItems: "center",
                flexWrap: "wrap",
                paddingRight: 1
              }}
            >
              {getTags()}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              >
              <SocialShare pageTitle={post.title} pageURI={`${post.uri}`} />
            </Box>
            {/*
             *<span>
             *  <Text> / </Text>
             *  <AccentText>{`${date.day}.${date.month}.${date.year}`}</AccentText>
             *</span>
             */}
          </div>
          {post.featuredImage && (
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
                itemProp="image"
                src={post.featuredImage.node.mediaItemUrl}
                srcSet={post.featuredImage.node.srcSet}
                sizes="(max-width: 600px) 80vw, 50vw"
                alt={`Image of ${post.title}`}
              />
            </div>
          )}

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
            figure: {
              margin: "0px",
            },
            img: {
              height: "auto",
              maxWidth: "1000px",
              width: "100%",
              objectFit: "cover"
            }
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
