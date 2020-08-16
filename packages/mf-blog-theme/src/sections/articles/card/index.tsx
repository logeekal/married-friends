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
import useWindow from "../../../hooks/useWindow";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  post: Post;
  type: "major" | "minor";
  sx?: SxStyleProp;
  articleStyle?: React.CSSProperties;
  thumbnailLoadHandler: () => any;
  className?: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  let {
    post,
    type,
    articleStyle,
    sx,
    thumbnailLoadHandler,
    className,
    ...restProps
  } = props;
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
            onLoad={thumbnailLoadHandler}
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
              <Link href={`/${categories.slug}`}>{categories.name} </Link>
            </span>
            <span>
              <Text> / </Text>
              {`${date.day}.${date.month}.${date.year}`}{" "}
            </span>
          </div>
          <article sx={{ ...articleStyle }}>
            <p>
              <Text>
                {hasDocument ? extractTextfromHTML(post.excerpt) : ""}
              </Text>
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
