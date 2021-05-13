/* @jsx jsx */

import React from "react";
import { Box, jsx } from "theme-ui";

const RecipeCardHeader: React.FC<{}> = (props) => {
  return (
    <div
      className="recipe-card__header"
      sx={{
        background:
          "linear-gradient(80.54deg, rgba(51, 126, 255, 0.33) 0%, rgba(255, 50, 124, 0.33) 99.47%)",
        minHeight: "200px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        className="recipe_card__label"
        paddingX={[1, 1, 2]}
        paddingY={[0, 0, 1]}
        sx={{
          position: "absolute",
          backgroundColor: "bgCard",
          fontWeight: 600,
          fontSize: [1,3],
          left: ["50px", "50px", "100px"],
          top: ["50px", "50px", "100px"],
          width: "100%",
          display: "block",
          margin: "0 auto",
          textAlign: "center",
          transformOrigin: "center",
          transform: "rotateZ(-45deg)"
        }}
      >
        Recipe
      </Box>
    </div>
  );
};

export default RecipeCardHeader;
