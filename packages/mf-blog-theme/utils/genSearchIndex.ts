import { ICompleteRecipe, ICompleteRecipeObj } from "./types";
import * as striptags from "striptags";
import * as lunr from "lunr";

interface IRecipeSearchObj {
  id: number;
  content: string;
  instructions: string;
  ingredients: string;
}

export function genIndexableRecipe(recipes: ICompleteRecipe) {
  const allRecipes: ICompleteRecipeObj[] = Object.values(recipes);

  const indexableRecipe: IRecipeSearchObj = {} as IRecipeSearchObj;

  const allIndexableRecipes = allRecipes.map((recipe) => {
    indexableRecipe["id"] = recipe.post.databaseId;
    indexableRecipe["content"] = sanitizeTextsForSearch(recipe.post.content);
    indexableRecipe["instructions"] = combineInstruction(
      recipe.content.recipeInstructions
    );
    indexableRecipe["ingredients"] = combineIngredient(
      recipe.content.recipeIngredients
    );
    return indexableRecipe;
  });
  return allIndexableRecipes;
}

export function genSearchIdx(recipes: ICompleteRecipe) {
  const indexableRecipes = genIndexableRecipe(recipes);
  return lunr(function () {
    this.ref("id");
    this.field("content");
    //this.field("instructions");
    //this.field("ingredients");
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
      result = result + +item.quantity + item.unit + item.ingredient + "\n";
    });

    return prev + result;
  }, "");
}
