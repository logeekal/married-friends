import {RECIPE_SAMPLE_CONTENT} from "../tests/recipeContent.data";

export interface IWPGraphQL<T>{
  data: {
    wpgraphql:T
  }
}


export type IRecipeContent =  typeof RECIPE_SAMPLE_CONTENT
