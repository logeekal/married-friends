/* @jsx jsx */
import { Box, jsx } from "theme-ui";
import React, { FC } from "react";

interface RecipeCardDetailBlockProps {
  detailType: string;
  detailValue: string[];
  detailUnit: string[];
}

const RecipeCardDetailBlock: FC<RecipeCardDetailBlockProps> = ({
  detailType,
  detailValue,
  detailUnit,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        justifyContent: "center",
        alignItems: "center",
        paddingX: 1,
        paddingY: 0,
        boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.3)",
        textShadow: "1px 1px rgba(0,0,0,0.3)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          filter: "blur(10px)",
        }}
      ></Box>
      <p
        sx={{
          textTransform: "uppercase",
          margin: "0px",
          marginBottom: 0,
        }}
      >
        {detailType}
      </p>

      {detailValue.length == 1 && !detailValue[0] && (
        <span
          sx={{
            fontSize: "1.5rem",
          }}
        >
          N/A
        </span>
      )}

      <Box
        sx={{
          margin: "0px",
          fontWeight: 200,
        }}
      >
        {detailValue.map((val, index) => {
          if (val) {
            return (
              <>
                <span
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  {val || 2}
                </span>
                <span>{` ${detailUnit[index] || ""}`}</span>
              </>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default RecipeCardDetailBlock;
