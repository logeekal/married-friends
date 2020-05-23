import React from "react";
import Card from "../card";
import { Post } from "../../../types/wp-graphql.types";

interface ArticleGridProps {
  articles:Post[];
}

const ArticleGrid: React.FC<ArticleGridProps> = props => {
  return (
    <div>
      {props.articles.map((article, index) => {
        return <Card post={article} type={index === 0 ? "major" : "minor"} />;
      })}
    </div>
  );
};

export default ArticleGrid;
