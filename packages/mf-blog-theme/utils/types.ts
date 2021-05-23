import {Faq, Post, Recipe} from "../src/types/wp-graphql.types";
import {RECIPE_SAMPLE_CONTENT} from "../tests/recipeContent.data";

export interface IWPGraphQL<T>{
  data: {
    wpgraphql:T
  }
}


export interface ICompleteRecipe {
  [k: number]: {
    post: Recipe;
    content: IRecipeContent["data"][number]["recipe_metas"];
  };
}


export interface IFAQObj {
  [k:number]: Faq
}


export interface IRecipeObject {
  [k: number]: Recipe
}

export interface IPostObject {
  [k: number]: Post
}


export type IRecipeContent =  typeof RECIPE_SAMPLE_CONTENT
