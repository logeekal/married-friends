import RecipeService from "../services/RecipeService";
import { Post, Recipe } from "../src/types/wp-graphql.types";
import { ICompleteRecipe, IFAQObj, IRecipeObject } from "./types";
const path = require("path");
import { Actions } from "gatsby";
import { log } from "./utils";
import FAQService from "../services/FAQService";
import {getFAQs, getYoutubeVideoId, replaceYTwithLiteTY, stripFAQSection} from "./pre-processors";

console.log("Loading Evn file");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

interface CustomCreatePageArgs {
  actions: Actions;
  graphql: (query: TemplateStringsArray) => void;
}



export const getAllRecipeObj = async({graphql, actions} :CustomCreatePageArgs) => {
  const recipeService = new RecipeService(graphql, actions);
  
  const allRecipesPosts = await recipeService.getAllRecipePosts();

  const allRecipeObj : IRecipeObject = {}

  allRecipesPosts.forEach(recipe => {
    allRecipeObj[recipe.recipeId] = recipe;
  })

  return allRecipeObj;
}

export const getAllFAQs = async ({ graphql, actions }: CustomCreatePageArgs) => {
  log("Getting all FAQs")
  const faqService = new FAQService(graphql, actions);

  const allFAQs = await faqService.getAllFAQREST();

  const allFAQObject: IFAQObj = {};

  allFAQs.forEach((faq) => {
    allFAQObject[faq.id] = faq;
  });

  console.log(`Found ${allFAQs.length} FAQs` )

  return allFAQObject;
};

const createRecipes = async ({ actions, graphql }: CustomCreatePageArgs, allFAQs :IFAQObj) => {
  
  const allRecipeObj = await getAllRecipeObj({graphql, actions});

  await generateRecipePages({ actions, graphql }, allFAQs);

  await generateAllCuisinePages({ actions, graphql }, allRecipeObj);

  await generateAllCoursesPages({actions, graphql}, allRecipeObj)

  await createHomePage(actions,allRecipeObj)
};

const createHomePage =  async (actions: CustomCreatePageArgs["actions"], allRecipeObj: IRecipeObject) => {
  log(" Creating Home Page")

  const homeTemplate = path.resolve(
    path.join(__dirname, "../src/templates/category.tsx")
  );

  actions.createPage({
    path: '/',
    component: homeTemplate,
    context: {
        type: "home",
        tagLine: `Welcome to The Fearless Cooking`,
        category: undefined,
        postObj: allRecipeObj
    }
  })
}

const generateRecipePages = async ({
  actions,
  graphql,
}: CustomCreatePageArgs, allFAQs: IFAQObj) => {
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
    completeRecipe[id] = <ICompleteRecipe[number]>{ post: recipe };
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

    const recipeFAQIds = getFAQs(recipeContent.post.content)
    const recipeVideoId = getYoutubeVideoId(recipeContent.post.content)
    recipeContent.post = preProcessRecipeContent(recipeContent.post)
    console.log("creating Page : " + recipeContent.post.uri);
    createPage({
      path: recipeContent.post.uri,
      component: template,
      context: {
        data: recipeContent,
        faqs: allFAQs,
        faqIds: recipeFAQIds,
        videoId: recipeVideoId
      },
    });
  }
};

const generateAllCuisinePages = async ({
  graphql,
  actions,
}: CustomCreatePageArgs, allRecipeObj: IRecipeObject) => {
  log("Creating Cuisine Pages");

  const recipeService = new RecipeService(graphql, actions);

  const allCuisines = await recipeService.getAllCuisines();

  const cuisineTemplate = path.resolve(
    path.join(__dirname, "../src/templates/category.tsx")
  );

  allCuisines.forEach((cuisine) => {
    console.log(`Create Cuisins : ${cuisine.uri}`);
    if(cuisine.recipes.nodes.length === 0){
      console.log(`Oops. No recipe found for cuisine : ${cuisine.name}. Not creating page`)
      return;
    }
    actions.createPage({
      path: cuisine.uri,
      component: cuisineTemplate,
      context: {
        tagLine: `New ${cuisine.name} Recipes you should try today. `,
        category: cuisine,
        postObj: allRecipeObj
      },
    });
  });
};



const generateAllCoursesPages = async ({
  graphql,
  actions,
}: CustomCreatePageArgs, allRecipeObj: IRecipeObject) => {
  log("Creating Course Pages");

  const recipeService = new RecipeService(graphql, actions);

  const allCourses = await recipeService.getAllCourses();

  if(allCourses.length === 0 || !allCourses) {
    console.log("No Recipe Courses found")
    return;
  }

  const cuisineTemplate = path.resolve(
    path.join(__dirname, "../src/templates/category.tsx")
  );

  allCourses.forEach((course) => {
    console.log(`Create Courses : ${course.uri}`);
    if(course.recipes.nodes.length === 0){

      console.log(`Oops. No recipe found for course : ${course.name}. Not creating page`)
      return;
    }
    actions.createPage({
      path: course.uri,
      component: cuisineTemplate,
      context: {
        tagLine: `New ${course.name} Recipes you should try today. `,
        category: course,
        postObj: allRecipeObj
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

const preProcessRecipeContent = (post: ICompleteRecipe[0]["post"]) => {
  post.content = replaceYTwithLiteTY(stripFAQSection(post.content), post.title)
  return post
} 

export default createRecipes;
