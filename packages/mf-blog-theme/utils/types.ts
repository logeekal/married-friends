import {Faq, Post, Recipe} from "../src/types/wp-graphql.types";
import {FAQ_REST_DATA} from "../tests/faqRestSample.data";
import {RECIPE_SAMPLE_CONTENT} from "../tests/recipeContent.data";

export type IRecipeContent =  typeof RECIPE_SAMPLE_CONTENT
export type IFAQRestContent = typeof FAQ_REST_DATA

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
  [k:number]: IFAQRestContent
}


export interface IRecipeObject {
  [k: number]: Recipe
}

export interface IPostObject {
  [k: number]: Post
}


