import { IRecipeContent } from "../../../../utils/types";
import { Recipe } from "../../../types/wp-graphql.types";
import {
  addDurations,
  convertDurationToISO8601,
  convertTimeToHighestUnit,
  getStepURL,
  ifWindow,
  log,
} from "../../../utils";
import striptags from "striptags";
import { IDuration } from "../../../types/common";

type IRecipeMeta = IRecipeContent["data"][number]["recipe_metas"];

type RecipeStep = Array<{
  "@type": string;
  text: string;
}>;

const genRecipeSchema = (
  post: Recipe,
  recipe: IRecipeContent["data"][number]["recipe_metas"],
  recipeVideoId: string
) => {
  log("Generating Recipe Schema for  :  " + post.title);
  let videoId = null;
  let videoGallery = recipe.videoGalleryVids[0];
  if (videoGallery && videoGallery.vidID) {
    videoId = videoGallery.vidID;
  } else {
    videoId = recipeVideoId;
  }

  let prepTime: IDuration = {
    hours: recipe.prepTimeUnit.toLowerCase().startsWith("m")
      ? 0
      : parseInt(recipe.prepTime) || 0,
    minutes: recipe.prepTimeUnit.toLowerCase().startsWith("m")
      ? parseInt(recipe.prepTime) || 0
      : 0,
  };

  let cookTime: IDuration = {
    hours: recipe.cookTimeUnit.toLowerCase().startsWith("m")
      ? 0
      : parseInt(recipe.cookTime) || 0,
    minutes: recipe.cookTimeUnit.toLowerCase().startsWith("m")
      ? parseInt(recipe.cookTime) || 0
      : 0,
  };

  let recipeImage =
    post.featuredImage &&
    post.featuredImage.node.mediaDetails.sizes.map((size) => size.sourceUrl);

  const resultSchema = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: post.title,
    image: recipeImage,
    author: {
      "@type": "Person",
      name: "Married Friends",
    },
    datePublished: post.dateGmt,
    description: recipe.recipeSubtitle,
    prepTime: convertDurationToISO8601(convertTimeToHighestUnit(prepTime)),
    cookTime: convertDurationToISO8601(convertTimeToHighestUnit(cookTime)),
    totalTime: convertDurationToISO8601(addDurations([prepTime, cookTime])),
    keywords: recipe.recipeKeywords,
    recipeYield: recipe.noOfServings,
    recipeCategory: post.recipeCuisines.nodes[0].name,
    recipeCuisine: post.recipeCuisines.nodes[0].name,
    recipeIngredient: getRecipeIngredients(recipe.recipeIngredients),
    recipeInstructions: getRecipeInstructions(recipe, post, videoId),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
    video: {
      ...getVideoSegment(videoId, post, recipe),
    },
  };
  //log(resultSchema)
  return resultSchema;
};

function getVideoSegment(videoId: string, post: Recipe, recipe: IRecipeMeta) {
  if (!videoId) {
    return {};
  }

  const vidUrl = `https://youtube.com/v/${videoId}`;
  const thumbURL = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return {
    "@type": "VideoObject",
    name: post.title,
    description: striptags(recipe.recipeDescription) || recipe.recipeSubtitle,
    contentUrl: vidUrl,
    thumbnailUrl: [thumbURL],
    uploadDate: post.date,
  };
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

const getRecipeInstructions = (recipe: IRecipeMeta, post: Recipe, videoId) => {
  const instructions = recipe.recipeInstructions;
  const result: RecipeStep = [];
  let recipeImage =
    post.featuredImage &&
    post.featuredImage.node.mediaDetails.sizes.map((size) => size.sourceUrl);
  for (let instruction of instructions) {
    let sectionInstructions = instruction.instruction
      .filter((step) => step.instruction.trim().length > 0)
      .map((step, index) => {
        let stepURLID = getStepURL(
          instruction.sectionTitle,
          step.instructionTitle,
          index + 1
        );
        let completeURL = `https://thefearlesscooking.com${post.uri.slice(
          0,
          -1
        )}#${stepURLID}`;
        return {
          "@type": "HowToStep",
          text: step.instruction,
          name:
            step.instructionTitle ||
            (instruction.sectionTitle &&
              `${instruction.sectionTitle}-step-${index + 1}`),
          image: step.image || recipeImage,
          //video: getVideoSegment(videoId, post, recipe),
          url: completeURL,
        };
      });
    result.push(...sectionInstructions);
  }

  return result;
};

export default genRecipeSchema;
