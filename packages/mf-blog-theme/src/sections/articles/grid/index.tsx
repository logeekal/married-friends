/* @jsx jsx */

import React from "react";
import Card from "../card";
import { Post } from "../../../types/wp-graphql.types";
import { jsx } from "theme-ui";
import { useGridRef } from "../../../hooks/useGridRef";

interface ArticleGridProps {
  articles: Post[];
}

const ArticleGrid: React.FC<ArticleGridProps> = props => {
  const relevantArticles = props.articles.slice(0, 7);
  const [maxCardHeight, setMaxCardHeight] = React.useState(0);
  const [articleHeights, setArticleHeights] = React.useState<Array<number>>([]);
  const [heights, setHeight] = React.useState<Array<number>>([]);
  const [gridHeight, setGridHeight] = React.useState(0);
  //const gridRef = useGridRef;
  //
  const gridRef = React.useRef<HTMLDivElement | any>({
    current: { clientHeight: 0 }
  });

  const onThumbnailLoad = () => {
    if (gridRef.current) {
      setGridHeight(gridRef.current.clientHeight);
    }
  };

  React.useEffect(() => {
    //update original article heights
    let minorCards: NodeList = gridRef.current.querySelectorAll(".card-minor");
    let originalArticleHeigts = Array.from(minorCards).map(card => {
      let article = card.firstChild.parentElement.querySelector("article");
      return article.clientHeight;
    });

    setArticleHeights(originalArticleHeigts);
  }, [gridRef]);

  React.useEffect(() => {
    console.log("***", gridRef.current.clientHeight);
    if (articleHeights.length === 0) return;
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
      //console.log("===", card, card.firstChild.parentElement.clientHeight);
      return card.firstChild.parentElement.clientHeight;
    });

    let localArticleHeights = Array.from(minorCards).map((card, index) => {
      let article = card.firstChild.parentElement.querySelector("article");
      let height =
        articleHeights && articleHeights.length > 0
          ? articleHeights[index]
          : article.clientHeight;
      const diff = maxHeight - cardHeights[index];
      //console.log("===New Height articles : ", height, diff, height + diff);
      if (diff > 0) {
        article.style.paddingBottom = `${diff}px`;
      }
      return diff;
    });

    console.log("===card height: ", cardHeights);
    console.log("===original Article Heights", articleHeights);
    console.log("===article height :", localArticleHeights);
  }, [articleHeights, gridHeight]);

  return (
    <div
      className="article-grid"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <div className="first-article" sx={{ flex: 1 }}>
        <Card
          post={relevantArticles[0]}
          type={"major"}
          thumbnailLoadHandler={() => null}
        />
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
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default ArticleGrid;
