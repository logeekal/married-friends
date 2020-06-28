/* @jsx jsx */

import React from "react";
import Card from "../card";
import { Post } from "../../../types/wp-graphql.types";
import { jsx } from "theme-ui";

interface ArticleGridProps {
  articles: Post[];
}

const ArticleGrid: React.FC<ArticleGridProps> = props => {
  return (
    <div
      className="article-grid"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      {props.articles.map((article, index) => {
        return index === 0 ? (
          <div className="first-article" sx={{ flex: 1 }}>
            <Card post={article} type={"major"} />
          </div>
        ) : (
          <div className="rest-grid" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Card post={article} type={index === 0 ? "major" : "minor"} />{" "}
          </div>
        );
      })}
    </div>
  );
};

export default ArticleGrid;
