import {
  Recipe,
  RecipeCourse,
  RecipeCuisine,
} from "../src/types/wp-graphql.types";
import { IRecipeContent, IWPGraphQL } from "../utils/types";
import axios from "axios";


export default class RecipeService {
  graphql: any;
  actions: any;
  host: string;

  constructor(graphql: any, actions: any) {
    this.graphql = graphql;
    this.actions = actions;
    this.host = process.env.MF_HOST;
    if (!this.host) throw new Error(`Backend host is empty : ${this.host}`)
  }

  getAllRecipePosts = async (): Promise<Array<Recipe>> => {
    const GET_RECIPE_POSTS = `
      query GET_RECIPE_POSTS {
        wpgraphql {
          recipes(first: 1000) {
            nodes {
              id
              content
              uri
              slug
              link
              excerpt
              date
              dateGmt
              recipeId
              databaseId
              title
              featuredImage {
                node {
                  mediaItemUrl
                  srcSet
                  sourceUrl
                  mediaDetails {
                    sizes {
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
              recipeCourses {
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
      `${this.host}/wp-json/deliciousrecipe/v1/recipe?per_page=100`,
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
          recipeCuisines(first: 1000) {
            nodes {
              name
              id
              uri
              slug
              description
              databaseId
              recipes {
                nodes {
                  id
                  recipeId
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

  getAllCourses = async (): Promise<Array<RecipeCourse>> => {
    const GET_COURSES = `
      query GET_COURSES {
        wpgraphql {
          recipeCourses(first: 1000) {
            nodes {
              name
              id
              uri
              slug
              description
              databaseId
              recipes {
                nodes {
                  id
                  recipeId
                }
              }
            }
          }
        }
      }
    `;

    const response: IWPGraphQL<{
      recipeCourses: {
        nodes: Array<RecipeCourse>;
      };
    }> = await this.graphql(GET_COURSES);

    if (!response.data.wpgraphql.recipeCourses) {
      console.log("No Course found");
      return [];
    }

    return response.data.wpgraphql.recipeCourses.nodes;
  };
}
