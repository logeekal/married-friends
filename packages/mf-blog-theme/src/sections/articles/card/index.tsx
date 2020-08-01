/** @jsx jsx */

import React from "react";
import { jsx, Styled, Link, SxStyleProp } from "theme-ui";
import { Post } from "../../../types/wp-graphql.types";
import {
  extractTextfromHTML,
  getFormattedDate,
  makePostSlug
} from "../../../utils";
import { AccentText, Text } from "../../../components/Typography";
import SocialIcons from "../../../components/SocialIcons";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  post: Post;
  type: "major" | "minor";
  sx?: SxStyleProp;
  articleStyle?: React.CSSProperties;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  let { post, type, articleStyle, sx, className, ...restProps } = props;
  let date = getFormattedDate(post.date);
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
      <Link href={makePostSlug(post)}>
        <div
          sx={{
            flex: "50%"
          }}
        >
          <img
            src={post.featuredImage.mediaItemUrl}
            alt={post.featuredImage.altText}
            width="100%"
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
          <article sx={{ ...articleStyle }}>
            <p>
              <Text>{extractTextfromHTML(post.excerpt)}</Text>
            </p>
          </article>
          <div
            className="card-footer"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <span className="footer-left">
              <AccentText sx={{ cursor: "pointer", fontSize: "12px" }}>
                READ MORE
              </AccentText>
            </span>
            <span className="footer-social">
              <SocialIcons
                includeSearch={false}
                socialProfiles={[
                  { type: "share", name: "share", target: "http://google.com" }
                ]}
                width="16px"
              />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
