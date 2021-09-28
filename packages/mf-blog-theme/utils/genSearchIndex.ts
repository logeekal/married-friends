import { ICompleteRecipe, ICompleteRecipeObj } from "./types";
import * as striptags from "striptags";
import * as lunr from "lunr";

interface IRecipeSearchObj {
  id: string;
  title: string;
  content: string;
  instructions: string;
  ingredients: string;
  excerpt: string;
  uri: string;
}

export function genIndexableRecipe(recipes: ICompleteRecipe) {
  const allRecipes: ICompleteRecipeObj[] = Object.values(recipes);

  const indexableRecipeObj: {
    [k: string]: IRecipeSearchObj;
  } = {};

  allRecipes.forEach((recipe, index) => {
    const indexableRecipe: IRecipeSearchObj = {} as IRecipeSearchObj;
    const recipeId = recipe.post.databaseId.toString()
    indexableRecipe["id"] = recipeId;
    indexableRecipe["title"] = recipe.post.title;
    indexableRecipe["excerpt"] = recipe.post.excerpt;
    indexableRecipe["content"] = sanitizeTextsForSearch(recipe.post.content);
    indexableRecipe["instructions"] = combineInstruction(
      recipe.content.recipeInstructions
    );
    indexableRecipe["ingredients"] = combineIngredient(
      recipe.content.recipeIngredients
    );
    indexableRecipe["uri"] = recipe.post.uri

    indexableRecipeObj[recipeId] = indexableRecipe;

    if (index === 0) console.log(indexableRecipeObj);
  });

  return indexableRecipeObj;
}

export function genSearchIdx(indexableRecipes: IRecipeSearchObj[]) {
  return lunr(function () {
    this.ref("id");
    this.field("title");
    this.field("content");
    this.metadataWhitelist = ["position"];
    this.field("instructions");
    this.field("ingredients");
    indexableRecipes.forEach((indexableRecipe) => {
      this.add(indexableRecipe);
    });
  });
}

function sanitizeTextsForSearch(text: string): string {
  return striptags(text);
}

function combineInstruction(
  instruction: ICompleteRecipeObj["content"]["recipeInstructions"]
) {
  return instruction.reduce<string>((prev, current) => {
    let result = "";
    current.instruction.forEach((item) => {
      result = result + sanitizeTextsForSearch(item.instruction) + "\n";
    });

    return prev + result;
  }, "");
}

function combineIngredient(
  ingredients: ICompleteRecipeObj["content"]["recipeIngredients"]
) {
  return ingredients.reduce<string>((prev, current) => {
    let result = "";
    current.ingredients.forEach((item) => {
      result =
        result +
        " " +
        (item.quantity || "") +
        " " +
        (item.unit || "") +
        " " +
        item.ingredient +
        "\n";
    });

    return prev + result;
  }, "");
}
