/** @jsx jsx */

import React from "react";
import { jsx, Styled, Link, SxStyleProp } from "theme-ui";
import { Post } from "../../../types/wp-graphql.types";
import {
  extractTextfromHTML,
  getFormattedDate,
  makePostSlug
} from "../../../utils";
import { Link as GatsbyLink } from 'gatsby'
import { AccentText, Text } from "../../../components/Typography";
import SocialIcons from "../../../components/SocialIcons";
import useWindow from "../../../hooks/useWindow";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  post: Post;
  type: "major" | "minor";
  sx?: SxStyleProp;
  articleStyle?: React.CSSProperties;
  className?: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  let { post, type, articleStyle, sx, className, ...restProps } = props;
  let date = getFormattedDate(post.date);
  const categories = post.categories.nodes[0];

  const [, hasDocument] = useWindow();
  return (
    <div
      className={`card-${type} ${className}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: type === "major" ? "100%" : "1 1 300px",
        minWidth: "100px",
        backgroundColor: "bgCard",
        margin: 1,
        cursor: "pointer",
        ...sx
      }}
      {...restProps}
    >
      <Link as={GatsbyLink} to={post.slug}>
        <div
          sx={{
            position: "relative",
            paddingBottom: "56.25%",
            width: "100%"
          }}
        >
          <img
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
            src={post.featuredImage.mediaItemUrl}
            alt={post.featuredImage.altText}
          />
        </div>
        <div
          className="card__article"
          sx={{
            backgroundColor: "bgCard",
            padding: type === "major" ? 2 : 1
          }}
        >
          <Styled.h2
            sx={{
              padding: "0px",
              margin: "0px",
              marginBottom: 0,
              color: "primary"
            }}
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <div
            className="card__date"
            sx={{
              fontSize: 0,
              textTransform: "uppercase",
              fontWeight: 500,
              paddingTop: 0
            }}
          >
            <span>
              <Link as={GatsbyLink} to={`/${categories.slug}`}>{categories.name} </Link>
            </span>
            <span>
              <Text> / </Text>
              {`${date.day}.${date.month}.${date.year}`}{" "}
            </span>
          </div>
          <article
            sx={{
              ".heateor_sss_sharing_container": {
                display: "none"
              },
              br: {
                display: "none"
              },
              ...articleStyle
            }}
          >
            <p>
              <Text
                spanProps={{
                  dangerouslySetInnerHTML: { __html: post.excerpt }
                }}
              ></Text>
            </p>
          </article>
          <div
            className="card-footer"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <span className="footer-left">
              <AccentText sx={{ cursor: "pointer", fontSize: 0 }}>
                READ MORE
              </AccentText>
            </span>
            <span className="footer-social">
              <SocialIcons
                includeSearch={false}
                socialProfiles={[
                  { type: "share", name: "share", target: "http://google.com" }
                ]}
                width="20px"
              />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
