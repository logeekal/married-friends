/** @jsx jsx */

import React from "react";
import { jsx, Styled, Link, SxStyleProp } from "theme-ui";
import {
  Category,
  Post,
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from "../../../types/wp-graphql.types";
import {
  extractTextfromHTML,
  getFormattedDate,
  makePostSlug,
} from "../../../utils";
import { Link as GatsbyLink } from "gatsby";
import { AccentText, Text } from "../../../components/Typography";
import useWindow from "../../../hooks/useWindow";
import SocialShare from "../../../components/SocialShare.tsx";
import Tag from "../../../components/Tag";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  post: Post | Recipe;
  type: "major" | "minor";
  sx?: SxStyleProp;
  articleStyle?: React.CSSProperties;
  className?: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  let { post, type, articleStyle, sx, className, ...restProps } = props;

  let date = getFormattedDate(post.date);

  console.log(post);

  const categories: Array<RecipeCourse | RecipeCuisine | Category> =
    "recipeCuisines" in post
      ? [(post as Recipe).recipeCuisines.nodes[0]]
      : [(post as Post).categories.nodes[0]];

  if ("recipeCourses" in post) {
    categories.push((post as Recipe).recipeCourses.nodes[0]);
  }

  const [, hasDocument] = useWindow();
  return (
    <div
      className={`card-${type} ${className}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: "1 1 300px",
        minWidth: "100px",
        backgroundColor: "bgCard",
        margin: 1,
        cursor: "pointer",
        borderRadius: "50px",
        fontSize: 0,
        "@media only screen and (max-width: 800px)": {
          maxWidth: "100%",
        },

        "@media only screen and (min-width: 800px)": {
          maxWidth: "300px",
        },

        ...sx,
      }}
      {...restProps}
    >
      <Link as={GatsbyLink} to={post.uri}>
        <div
          sx={{
            position: "relative",
            paddingBottom: "56.25%",
            width: "100%",
          }}
        >
          <img
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={post.featuredImage && post.featuredImage.node.mediaItemUrl}
            alt={post.featuredImage && post.featuredImage.node.altText}
          />
        </div>
        <div
          className="card__article"
          sx={{
            backgroundColor: "bgCard",
            padding: type === "major" ? 2 : 1,
          }}
        >
          <h2
            sx={{
              padding: "0px",
              margin: "0px",
              marginBottom: 0,
              color: "primary",
              fontWeight: 600,
              fontSize: 1,
            }}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <div
            className="card__date"
            sx={{
              fontSize: 0,
              //textTransform: "uppercase",
              fontWeight: 500,
              paddingTop: 0,
            }}
          >
            {categories.map((cat) => {
              return (
                <Tag
                  sx={{
                    marginRight: "3px",
                  }}
                >
                  <Link
                    as={GatsbyLink}
                    to={cat.uri}
                    sx={{
                      color: "primary",
                    }}
                  >
                    {cat.name}
                  </Link>
                </Tag>
              );
            })}
            {/*
             *<span>
             *  <Text sx={{fontSize: 0}}> / </Text>
             *  {`${date.day}.${date.month}.${date.year}`}{" "}
             *</span>
             */}
          </div>
          <article
            sx={{
              ".heateor_sss_sharing_container": {
                display: "none",
              },
              br: {
                display: "none",
              },
              ...articleStyle,
            }}
          >
            <p>
              <Text
                spanProps={{
                  dangerouslySetInnerHTML: { __html: post.excerpt },
                }}
                sx={{}}
              ></Text>
            </p>
          </article>
          <div
            className="card-footer"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0px",
            }}
          >
            <span className="footer-left">
              <AccentText sx={{ cursor: "pointer", fontSize: 0 }}>
                Read More
              </AccentText>
            </span>
            <span className="footer-social">
              <SocialShare />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
