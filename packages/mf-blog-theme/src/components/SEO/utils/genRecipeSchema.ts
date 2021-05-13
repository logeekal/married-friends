import { IRecipeContent } from "../../../../utils/types";
import { Recipe } from "../../../types/wp-graphql.types";

type IRecipeMeta = IRecipeContent["data"][number]["recipe_metas"];

type RecipeStep = Array<{
  "@type": string;
  text: string;
}>;

const genRecipeSchema = (
  post: Recipe,
  recipe: IRecipeContent["data"][number]["recipe_metas"]
) => {
  console.log("Generating Recipe Schema for  :  " + post.title);
  const resultSchema =  {
    "@content": "https://schema.org/",
    "@type": "Recipe",
    "name": post.title,
    image: post.featuredImage.node.mediaDetails.sizes.map(
      (size) => size.sourceUrl
    ),
    author: {
      "@type": "Person",
      name: "Married Friends",
    },
    datePublished: post.dateGmt,
    desciption: recipe.recipeSubtitle,
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
    recipeYield: recipe.servings + recipe.servingSize + " servings",
    recipeCategory: post.recipeCuisines.nodes[0].name,
    recipeCuisine: post.recipeCuisines.nodes[0].name,
    recipeIngredient: getRecipeIngredients(recipe.recipeIngredients),
    recipeInstructions: getRecipeInstructions(recipe.recipeInstructions),
    video: {
      "@type": "VideoObject",
      name: post.title,
      desciption: recipe.recipeSubtitle,
      contentUrl: recipe.videoGalleryVids[0],
      uploadDate: post.dateGmt,
    },
  };
  console.log(resultSchema)
  return resultSchema
};

const getRecipeIngredients = (
  recipeIng: IRecipeMeta["recipeIngredients"]
): string[] => {
  let totalIngredients: string[] = [];
  console.log(recipeIng);
  recipeIng.forEach((ingredientSection) => {
    const subIngredients = ingredientSection.ingredients.map((ingredient) => {
      return `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}, ${ingredient.notes}`;
    });
    totalIngredients.push(...subIngredients);
  });

  return totalIngredients;
};

const getRecipeInstructions = (
  instructions: IRecipeMeta["recipeInstructions"]
) => {
  const result: RecipeStep = [];
  for (let instruction of instructions) {
    let sectionInstructions = instruction.instruction.map((step) => {
      return {
        "@type": "HowToStep",
        text: step.instruction,
        name: step.instructionTitle,
        image: step.image,
      };
    });
    result.push(...sectionInstructions);
  }

  return result;
};

export default genRecipeSchema;
