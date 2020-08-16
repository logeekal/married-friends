/* @jsx jsx */

import React from "react";
import Card from "../card";
import { Post } from "../../../types/wp-graphql.types";
import { jsx } from "theme-ui";

interface ArticleGridProps {
  articles: Post[];
}

const ArticleGrid: React.FC<ArticleGridProps> = props => {
  const relevantArticles = props.articles.slice(0, 7);
  const [maxCardHeight, setMaxCardHeight] = React.useState(0);
  const [articleHeights, setArticleHeights] = React.useState<Array<number>>([]);
  const [heights, setHeight] = React.useState<Array<number>>([]);
  const gridRef = React.useRef<HTMLDivElement | any>({
    current: { clientHeight: 0 }
  });

  React.useEffect(() => {
    console.log("***", gridRef.current.clientHeight);
    let minorCards: NodeList = gridRef.current.querySelectorAll(".card-minor");
    console.log("===minorcard : ", minorCards);
    const maxHeight = Array.from(minorCards).reduce(
      (prevValue, currentElement) => {
        prevValue = Math.max(prevValue, currentElement.clientHeight);
        return prevValue;
      },
      0
    );

    console.log(`===Max Height is : `, maxHeight);
    let cardHeights = Array.from(minorCards).map(card => {
      return card.firstChild.parentElement.clientHeight;
    });

    let articleHeights = Array.from(minorCards).map((card, index) => {
      let article = card.firstChild.parentElement.querySelector("article");
      console.log("===", article);
      const diff = maxHeight - cardHeights[index];
      console.log("marginbottom", article.style.marginBottom);
      if (diff > 0) {
        article.style.marginBottom = `${diff}px`;
      }
      return diff;
    });
    console.log("===card height: ", cardHeights);
    console.log("===article height :", articleHeights);
  }, [gridRef]);

  return (
    <div
      className="article-grid"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <div className="first-article" sx={{ flex: 1 }}>
        <Card post={relevantArticles[0]} type={"major"} />
      </div>
      <div
        className="rest-grid"
        ref={gridRef}
        sx={{
          //display: "inline-grid",
          //gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          //alignItems: "flex-start",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {relevantArticles.map((article, index) => {
          return (
            index > 0 && (
              <Card
                key={index}
                sx={{ flex: "1 1 300px" }}
                post={article}
                type={index === 0 ? "major" : "minor"}
                data-height={heights[index - 1]}
                data-artHeight={articleHeights[index - 1]}
                data-diff={maxCardHeight - heights[index - 1]}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default ArticleGrid;
