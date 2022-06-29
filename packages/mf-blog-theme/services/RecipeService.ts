import {
  Recipe,
  RecipeCourse,
  RecipeCuisine,
  WpPageInfo,
} from "../src/types/wp-graphql.types";
import { IRecipeContent, IWPGraphQL } from "../utils/types";
import axios from "axios";

const pagesHeaderName = "x-wp-totalpages"

interface RecipeResponse {
  recipes: {
    pageInfo: WpPageInfo,
    nodes: Array<Recipe>
  };

}

export default class RecipeService {
  graphql: any;
  actions: any;
  host: string;

  constructor(graphql: any, actions: any) {
    this.graphql = graphql;
    this.actions = actions;
    this.host = process.env.MF_HOST;
    if (!this.host) throw new Error(`Backend host is empty : ${this.host}`);
  }

  getAllRecipePosts = async (): Promise<Array<Recipe>> => {
    const GEN_GET_RECIPE_POSTS_QUERY = (first: number = 100, endCursor: string | null = null, startCursor: string | null = null) => `
      query GET_RECIPE_POSTS {
        wpgraphql {
          recipes(first:${first}, after:"${endCursor}", before:"${startCursor}") {
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
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

    let hasNextPage = true
    let endCursor;
    let result: Array<Recipe> = []
    let pageCounter = 0
    while (hasNextPage) {
      let response: IWPGraphQL<RecipeResponse> = await this.graphql(GEN_GET_RECIPE_POSTS_QUERY(100,endCursor));
      let { nodes: recipeNodes, pageInfo } = response.data.wpgraphql.recipes;
      console.log(`Found ${recipeNodes.length} recipes on page : ${pageCounter}`)
      result.push(...recipeNodes);
      hasNextPage = pageInfo.hasNextPage
      endCursor = pageInfo.endCursor
      pageCounter++
    }
    console.log(`Found overall ${result.length} recipes`)
    return result;
  };

  getAllRecipesData = async (): Promise<IRecipeContent> => {
    /*
     *console.log({
     *  "process-env": process.env,
     *  user: process.env.USERNAME,
     *  pass: process.env.TOKEN,
     *});
     */

    const recipeURL = `${this.host}/wp-json/deliciousrecipe/v1/recipe?per_page=100`;

    const getRecipePage = async (url: string) => {
      return await axios.get<IRecipeContent>(url, {
        auth: {
          username: process.env.USERNAME,
          password: process.env.TOKEN,
        },
      });
    };
    const response = await getRecipePage(recipeURL);

    if ([200, 201].includes(response.status)) {
      const recipeContent: IRecipeContent = response.data;

      if (pagesHeaderName in response.headers) {
        // fetch further pages
        let totalPages = parseInt(response.headers[pagesHeaderName]);
        if (totalPages == 1) return recipeContent;
        let counter = 1;
        while (counter != totalPages) {
          counter++;
          const newRecipePage = await getRecipePage(
            `${recipeURL}&page=${counter}`
          );
          recipeContent.data.push(...newRecipePage.data.data);
        }
      }
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
