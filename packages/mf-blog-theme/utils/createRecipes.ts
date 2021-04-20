import RecipeService from "../services/RecipeService";
import { Recipe } from "../src/types/wp-graphql.types";
import { ICompleteRecipe, IRecipeContent } from "./types";
const path = require("path");
import { Actions } from "gatsby";
import { log } from "./utils";

console.log("Loading Evn file");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

interface CustomCreatePageArgs {
  actions: Actions;
  graphql: (query: TemplateStringsArray) => void;
}

const createRecipes = async ({ actions, graphql }: CustomCreatePageArgs) => {
  await generateRecipePages({ actions, graphql });

  await generateAllCuisinePages({ actions, graphql });
};

const generateRecipePages = async ({
  actions,
  graphql,
}: CustomCreatePageArgs) => {
  log("Creating Recipe Pages");
  const recipeService = new RecipeService(graphql, actions);

  const allRecipesPosts = await recipeService.getAllRecipePosts();

  const completeRecipe: ICompleteRecipe = {};
  console.log(`Found ${allRecipesPosts.length} recipe post`);

  if (allRecipesPosts.length === 0) {
    throw Error("No Recipes found");
  }

  allRecipesPosts.forEach((recipe) => {
    const id = recipe.recipeId;
    completeRecipe[id] = <ICompleteRecipe[number]>{ post:  recipe }
  });

  const allRecipesData = await recipeService.getAllRecipesData();

  console.log(`Found ${allRecipesData.data.length} recipe data`);

  allRecipesData.data.forEach((recipeData) => {
    if (recipeData.id in completeRecipe) {
      completeRecipe[recipeData.id].content = recipeData.recipe_metas;
    }
  });


  const { createPage } = actions;

  const template = path.resolve(
    path.join(__dirname, "../src/templates/RecipePage.tsx")
  );

  for (const key in completeRecipe) {
    const recipeContent = completeRecipe[key];
    if (!("content" in recipeContent)) {
      //if any of the recipe does not have recipeData, remove do not create corresponding page.
      console.log(`No Recipe Data found for recipe Id : ${key}`);
    }
    console.log("creating Page : " + recipeContent.post.uri);
    createPage({
      path: recipeContent.post.uri,
      component: template,
      context: {
        data: recipeContent,
      },
    });
  }
};

const generateAllCuisinePages = async ({
  graphql,
  actions,
}: CustomCreatePageArgs) => {
  log("Creating Cuisine Pages");

  const recipeService = new RecipeService(graphql, actions);

  const allCuisines = await recipeService.getAllCuisines();

  const cuisineTemplate = path.resolve(
    path.join(__dirname, "../src/templates/category.tsx")
  );

  allCuisines.forEach((cuisine) => {
    console.log(`Create Cuisins : ${cuisine.uri}`);
    actions.createPage({
      path: cuisine.uri,
      component: cuisineTemplate,
      context: {
        type: "recipe",
        category: cuisine,
      },
    });
  });
};

/*
 *const createRecipes = async ({ actions, graphql }: CustomCreatePageArgs) => {
 *  await generateRecipePages({actions, graphql});
 *
 *  await generateAllCuisinePages({actions, graphql});
 *};
 */
export default createRecipes;
