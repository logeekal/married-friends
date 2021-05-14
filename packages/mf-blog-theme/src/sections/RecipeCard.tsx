/* @jsx jsx */

import React from "react";
import { Box, Flex, Heading, jsx, Text } from "theme-ui";
import { ICompleteRecipe } from "../../utils/types";
import RecipeCardHeader from "../components/RecipeCardHeader";
import striptags from "striptags";
import SocialShare from "../components/SocialShare";

interface RecipeCardProps {
  recipe: ICompleteRecipe[number]["content"];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div
      className="recipe-card"
      sx={{
        width: "100%",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        backgroundColor: "white",
        fontWeight: 400,
      }}
    >
      <RecipeCardHeader />
      <Box className="recipe-card__body">
        <Flex
          dir="row"
          sx={{
            flex: "1 1 auto",
            flexWrap: "wrap",
            marginY: 1,
            paddingRight: [2,2,3]
          }}
        >
          <Box
            className="recipe-card__ingredients"
            sx={{
              flex: "1 1 30%",
              marginLeft: [2,2,3],
              marginY: 1,
              fontFeatureSettings: "'cv05' on, 'cv06' on, 'kern' off",
              minWidth: "200px"
            }}
          >
            <h2
              sx={{
                fontFamily: "cursive",
                fontSize: 3,
                color: "accent",
                fontWeight: 400,
                margin: "0px",
              }}
            >
              Ingredients
            </h2>
            {recipe.recipeIngredients.map((ingredientSection, index) => {
              return (
                <Box key={index}>
                  <p
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {" "}
                    {ingredientSection.sectionTitle}
                  </p>
                  <ul
                    sx={{
                      WebkitPaddingStart: "1rem",
                      MozPaddingStart: "1rem",
                      paddingInlineStart: "1rem",
                    }}
                  >
                    {ingredientSection.ingredients.map((ingredient, index) => {
                      return (
                        <li
                          key={index}
                          sx={{
                            lineHeight: "2rem",
                            WebkitPaddingStart: 0,
                            MozPaddingStart: "5px",
                          }}
                        >
                          <Text as="span">{`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`}</Text>
                          <i
                            sx={{
                              color: "secondary",
                            }}
                          >{` ${ingredient.notes}`}</i>
                        </li>
                      );
                    })}
                  </ul>
                </Box>
              );
            })}
          </Box>
          <Box
            className="recipe-card__instructions"
            sx={{
              flex: "1 1 55%",
              border: "0px solid black",
              marginLeft: [2,2,3],
              marginY: 1,
              minWidth: "300px"
            }}
          >
            <h2
              sx={{
                fontFamily: "cursive",
                fontSize: 3,
                color: "accent",
                fontWeight: 400,
                margin: "0px",
              }}
            >
              Steps
            </h2>
            {recipe.recipeInstructions.map((instructionSection, index) => {
              return (
                <Box key={index}>
                  <p
                    sx={{
                      fontWeight: 600
                    }}
                  >{instructionSection.sectionTitle}</p>
                  <ol
                    sx={{
                      WebkitPaddingStart: "1rem",
                      MozPaddingStart: "1rem",
                      paddingInlineStart: "1rem",
                    }}
                  >
                    {instructionSection.instruction.map(
                      (instruction, index) => {
                        return (
                          <li
                            key={index}
                            sx={{
                              lineHeight: "1.65rem",
                              marginBottom: "1rem",
                              paddingInlineStart: "5px",
                              WebkitPaddingStart: "5px",
                              MozPaddingStart: "5px"
                            }}
                          >
                            {striptags(instruction.instruction)}
                            {instruction.instructionNotes && (
                              <Box>
                                <blockquote>
                                  {striptags(instruction.instructionNotes)}
                                </blockquote>
                              </Box>
                            )}
                          </li>
                        );
                      }
                    )}
                  </ol>
                </Box>
              );
            })}
          </Box>
        </Flex>
      </Box>

      <Box className="recipe-card__footer">
        <Flex className="recipe-card__footer-social" sx={{
          justifyContent: "space-between",
          padding: [1,1,2]
          }}>
          <Box> Reactions</Box>
          <Box> <SocialShare /> </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default RecipeCard;
