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
      <div className="first-article" sx={{ flex: 1 }}>
        <Card post={props.articles[0]} type={"major"} />
      </div>
      <div
        className="rest-grid"
        sx={{
          display: "inline-grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          alignItems: "flex-start"
        }}
      >
        {props.articles.map((article, index) => {
          return (
            index > 0 && (
              <Card post={article} type={index === 0 ? "major" : "minor"} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default ArticleGrid;
