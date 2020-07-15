/* @jsx jsx */

import React from "react";
import Card from "../card";
import { Post } from "../../../types/wp-graphql.types";
import { jsx } from "theme-ui";

interface ArticleGridProps {
  articles: Post[];
}

const ArticleGrid: React.FC<ArticleGridProps> = props => {
  const [maxCardHeight, setMaxCardHeight] = React.useState(0);
  const [articleHeights, setArticleHeights] = React.useState<Array<number>>([]);
  const [heights, setHeight] = React.useState<Array<number>>([]);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const articleCardRefs: Array<React.MutableRefObject<
    HTMLDivElement
  >> = new Array(props.articles.length).fill(
    React.useRef<HTMLDivElement>(null)
  );

  let articleCardRefsCurrents = articleCardRefs.map(item => item.current);
  console.log("====", articleCardRefsCurrents);

  React.useLayoutEffect(() => {
    //if (!gridRef.current) return;
    //console.log("===", gridRef.current);
    //let minorCards: NodeList = gridRef.current.querySelectorAll(".card-minor");
    let minorCards = articleCardRefs.map(item => {
      return item.current;
    });
    console.log("===minorcard : ", minorCards);
    if (minorCards.filter(item => !item).length > 0) {
      return;
    }
    const maxHeight = Array.from(minorCards).reduce(
      (prevValue, currentElement) => {
        prevValue = Math.max(prevValue, currentElement.clientHeight);
        return prevValue;
      },
      0
    );

    console.log(`===Max Height is : `, maxHeight);

    let articleHeights = Array.from(minorCards).map(card => {
      let articleHeight = card.firstChild.parentElement.querySelector(
        "article"
      );
      return articleHeight.clientHeight;
    });

    let cardHeights = Array.from(minorCards).map(card => {
      return card.clientHeight;
    });

    console.log("===card height: ", cardHeights);
    console.log("===article height :", articleHeights);
    setHeight(cardHeights);
    setArticleHeights(articleHeights);
    setMaxCardHeight(maxHeight);
  }, [...articleCardRefsCurrents]);

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
        ref={gridRef}
        sx={{
          //display: "inline-grid",
          //gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          //alignItems: "flex-start",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {props.articles.map((article, index) => {
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
                ref={articleCardRefs[index - 1]}
                articleStyle={{
                  marginBottom: maxCardHeight - heights[index - 1]
                }}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default ArticleGrid;
