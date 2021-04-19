import RecipeService from "../services/RecipeService";
import { Recipe } from "../src/types/wp-graphql.types";
import { IRecipeContent } from "./types";

console.log("Loading Evn file");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

interface ICompleteRecipe {
  posts: Array<Recipe>;
  content: IRecipeContent;
}


export default async ({ actions, graphql }) => {
  console.log(graphql);
  const recipeService = new RecipeService(graphql, actions);

  const allRecipesPosts = await recipeService.getAllRecipePosts();

  const allRecipesData = await recipeService.getAllRecipesData();

  console.log(JSON.stringify({ allRecipesPosts }));
  console.log(JSON.stringify({ allRecipesData }));
};
