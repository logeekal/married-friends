import { IRecipeContent } from "../../../../utils/types";
import { Recipe } from "../../../types/wp-graphql.types";
import {getStepURL, ifWindow, log} from "../../../utils";
import {getYoutubeVideoId} from "../../../utils/modHTMLContent";
import striptags from 'striptags';

type IRecipeMeta = IRecipeContent["data"][number]["recipe_metas"];

type RecipeStep = Array<{
  "@type": string;
  text: string;
}>;

const genRecipeSchema = (
  post: Recipe,
  recipe: IRecipeContent["data"][number]["recipe_metas"]
) => {
  log("Generating Recipe Schema for  :  " + post.title);
  let videoId = null;
  let videoGallery = recipe.videoGalleryVids[0]
  if(videoGallery && videoGallery.vidID){
    videoId =  videoGallery.vidID
  }else{
    videoId =  getYoutubeVideoId(post.content)
  }

  const resultSchema =  {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": post.title,
    image: post.featuredImage && post.featuredImage.node.mediaDetails.sizes.map(
      (size) => size.sourceUrl
    ),
    author: {
      "@type": "Person",
      name: "Married Friends",
    },
    datePublished: post.dateGmt,
    description: recipe.recipeSubtitle,
    prepTime:
      "PT" + recipe.prepTime + (recipe.prepTimeUnit || "m").toUpperCase() ||
      "M",
    cookTime:
      "PT" + recipe.cookTime + (recipe.cookTimeUnit || "m").toUpperCase() ||
      "M",
    totalTime:
      "PT" +
        recipe.totalDuration +
        (recipe.totalDurationUnit || "m").toUpperCase() || "M",
    keywords: recipe.recipeKeywords,
    recipeYield: recipe.servings,
    recipeCategory: post.recipeCuisines.nodes[0].name,
    recipeCuisine: post.recipeCuisines.nodes[0].name,
    recipeIngredient: getRecipeIngredients(recipe.recipeIngredients ),
    recipeInstructions: getRecipeInstructions(recipe.recipeInstructions, post),
    video: {
      ...getVideoSegment(videoId, post, recipe)
    },
  };
  log(resultSchema)
  return resultSchema
};


function getVideoSegment(videoId: string, post: Recipe, recipe: IRecipeMeta ) {
  if(!videoId){
    return {}
  }
  
  const vidUrl = `https://youtube.com/v/${videoId}`;
  const thumbURL = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`


  return  {
    "@type": "VideoObject",
    name: post.title,
    description: striptags(recipe.recipeDescription) || recipe.recipeSubtitle,
    contentUrl:vidUrl,
    thumbnailUrl: [
      thumbURL
    ],
    uploadDate:post.date,
  }
}

const getRecipeIngredients = (
  recipeIng: IRecipeMeta["recipeIngredients"]
): string[] => {
  let totalIngredients: string[] = [];
  log(recipeIng);
  recipeIng.forEach((ingredientSection) => {
    const subIngredients = ingredientSection.ingredients.map((ingredient) => {
      return `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}, ${ingredient.notes}`;
    });
    totalIngredients.push(...subIngredients);
  });

  return totalIngredients;
};

const getRecipeInstructions = (
  instructions: IRecipeMeta["recipeInstructions"],
  post: Recipe
) => {
  const result: RecipeStep = [];
  for (let instruction of instructions) {
    let sectionInstructions = instruction.instruction.map((step, index) => {
      let stepURLID = getStepURL(instruction.sectionTitle, step.instructionTitle, index+1 );
      let completeURL = `https://marriedfriends.in${post.uri.slice(0,-1)}#${stepURLID}`
      return {
        "@type": "HowToStep",
        text: step.instruction,
        name: step.instructionTitle || (instruction.sectionTitle && `${instruction.sectionTitle}-step-${index + 1}`) ,
        image: step.image,
        url: completeURL
      };
    });
    result.push(...sectionInstructions);
  }

  return result;
};

export default genRecipeSchema;
