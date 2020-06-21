/** @jsx jsx */

import React from "react";
import { jsx, Styled } from "theme-ui";
import { Post } from "../../../types/wp-graphql.types";
interface CardProps {
  post: Post;
  type: "major" | "minor";
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  let { post, type } = props;
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: type === "major" && "100%",
        backgroundColor: "bgCard"
      }}
    >
      <div
        sx={{
          flex: "50%",
          height: type === "minor" ? "245px" : "528px"
        }}
      >
        <img
          src={post.featuredImage.mediaItemUrl}
          alt={post.featuredImage.altText}
          width="100%" />
      </div>

      <div
        className="card__article"
        sx={{
          height: type === "minor" ? "315px" : "435px",
          backgroundColor: "bgCard"
        }}
      >
        <Styled.h2 dangerouslySetInnerHTML={{ __html: post.title }}></Styled.h2>
        <p>
          {post.categories.nodes[0].name}/{post.date}
        </p>
        <p dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
      </div>
    </div>
  );
};

export default Card;
