import { Recipe, RecipeCuisine } from "../src/types/wp-graphql.types";
import { IRecipeContent, IWPGraphQL } from "../utils/types";
import axios from "axios";

const host = `https://backend.marriedfriends.in`;

export default class RecipeService {
  graphql: any;
  actions: any;

  constructor(graphql: any, actions: any) {
    this.graphql = graphql;
    this.actions = actions;
  }

  getAllRecipePosts = async (): Promise<Array<Recipe>> => {
    const GET_RECIPE_POSTS = `
      query GET_RECIPE_POSTS {
        wpgraphql {
          recipes {
            nodes {
              id
              content
              uri
              slug
              link
              excerpt
              date
              recipeId
              title
              featuredImage{
                node {
                  mediaItemUrl
                  mediaDetails {
                    sizes{
                      name
                      sourceUrl
                    }
                  }
                }
              }
              recipeCuisines {
                nodes {
                  name
                  link
                  id
                  uri
                  slug
                  parentId
                }
              }
            }
          }
        }
      }
    `;

    const response: IWPGraphQL<{
      recipes: { nodes: Array<Recipe> };
    }> = await this.graphql(GET_RECIPE_POSTS);
    return response.data.wpgraphql.recipes.nodes;
  };

  getAllRecipesData = async (): Promise<IRecipeContent> => {
    /*
     *console.log({
     *  "process-env": process.env,
     *  user: process.env.USERNAME,
     *  pass: process.env.TOKEN,
     *});
     */
    const response = await axios.get(
      `${host}/wp-json/deliciousrecipe/v1/recipe`,
      {
        auth: {
          username: process.env.USERNAME,
          password: process.env.TOKEN,
        },
      }
    );

    if ([200, 201].includes(response.status)) {
      const recipeContent: IRecipeContent = await response.data;
      return recipeContent;
    } else {
      throw Error("Error Occured in getRecipeContent : " + response);
    }
  };

  getAllCuisines = async (): Promise<Array<RecipeCuisine>> => {
    const GET_CUISINES = `
      query GET_CUISINES {
        wpgraphql {
          recipeCuisines {
            nodes {
              name
              id
              uri
              slug
              recipes {
                nodes {
                  id
                  recipeId
                  excerpt
                  uri
                  recipeCuisines {
                    nodes {
                      name
                      link
                      id
                      uri
                      slug
                      parentId
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response: IWPGraphQL<{
      recipeCuisines: {
        nodes: Array<RecipeCuisine>;
      };
    }> = await this.graphql(GET_CUISINES);

    return response.data.wpgraphql.recipeCuisines.nodes;
  };
}
