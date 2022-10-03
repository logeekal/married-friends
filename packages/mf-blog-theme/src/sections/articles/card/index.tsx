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
  log,
  makePostSlug,
} from "../../../utils";
import { Link as GatsbyLink } from "gatsby";
import { AccentText, Text } from "../../../components/Typography";
import useWindow from "../../../hooks/useWindow";
import SocialShare from "../../../components/SocialShare.tsx";
import Tag from "../../../components/Tag";
import {index} from "cheerio/lib/api/traversing";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  post: Post | Recipe;
  type: "major" | "minor";
  sx?: SxStyleProp;
  articleStyle?: React.CSSProperties;
  className?: string;
  index: number
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  let { post, type, articleStyle, sx, className, ...restProps } = props;

  let date = getFormattedDate(post.date);

  log(post);

  const categories: Array<RecipeCourse | RecipeCuisine | Category> =
    "recipeCuisines" in post && post.recipeCuisines.nodes.length > 0
      ? [(post as Recipe).recipeCuisines.nodes[0]]
      : [];

      if ("recipeCourses" in post && post.recipeCourses.nodes.length > 0) {
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
      <span itemProp="position" sx={{display: "none"}}>{props.index + 1}</span>
      <Link as={GatsbyLink} to={post.uri} >
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
            srcSet={post.featuredImage.node.srcSet}
            src={post.featuredImage.node.sourceUrl}
            sizes="(max-width : 800px) 400px, 20vw"
            alt={`image of ${post.title}`}
            loading="lazy"
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
            itemProp="name"
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
            <p
              itemProp="description"
            >
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
