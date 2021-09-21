import createRecipes, { getAllFAQs } from "./utils/createRecipes";
import { genIndexableRecipe, genSearchIdx } from "./utils/genSearchIndex";
import { ICompleteRecipe, IFAQObj } from "./utils/types";

import * as fs from "fs";
import * as path from "path";
import {log} from "./src/utils";

exports.createPages = async ({ actions, graphql }) => {
  const allFAQs: IFAQObj = await getAllFAQs({ graphql, actions });
  const allRecipeObj: ICompleteRecipe = await createRecipes(
    { actions, graphql },
    allFAQs
  );

  const indexableRecipesObj = genIndexableRecipe(allRecipeObj)

  const recipeIndex = genSearchIdx(Object.values(indexableRecipesObj));

  const indexPath = path.join("netlify", "functions", "assets");

  if (!fs.existsSync(indexPath)) {
    fs.mkdirSync(indexPath);
  }

  log("Writing Recipes and indices")

  fs.writeFileSync(path.join(indexPath, "recipes.json"), JSON.stringify(indexableRecipesObj))

  fs.writeFileSync(
    path.join(indexPath, "recipeIndex.json"),
    JSON.stringify(recipeIndex)
  );
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    console.log("Ignoring Carousel");
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /responsive-react-image-carousel/, use: loaders.null() },
        ],
      },
    });
  }
};
