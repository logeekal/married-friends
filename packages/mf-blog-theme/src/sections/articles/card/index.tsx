/** @jsx jsx */

import React from "react";
import { jsx, Styled, Link } from "theme-ui";
import { Post } from "../../../types/wp-graphql.types";
import {
  extractTextfromHTML,
  getFormattedDate,
  makePostSlug
} from "../../../utils";
import { AccentText, Text } from "../../../components/Typography";
import SocialIcons from "../../../components/SocialIcons";

interface CardProps {
  post: Post;
  type: "major" | "minor";
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  let { post, type } = props;
  console.log(post.excerpt);
  let date = getFormattedDate(post.date);
  return (
    <div
      className={`card-${type}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: type === "major" ? "100%" : "50%",
        minWidth: "100px",
        backgroundColor: "bgCard",
        margin: 1,
        cursor: "pointer"
      }}
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
          <AccentText
            sx={{
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: "bold",
              marginTop: 0,
              marginBottom: 0
            }}
          >
            <Link href={`/${post.categories.nodes[0].slug}`}>
              {post.categories.nodes[0].name}
            </Link>
            <Text sx={{ fontSize: 0 }}> / </Text>
            {`${date.day}.${date.month}.${date.year}`}
          </AccentText>
          <article>
            <p>
            <Text>{extractTextfromHTML(post.excerpt).substr(0,150)}</Text>
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
