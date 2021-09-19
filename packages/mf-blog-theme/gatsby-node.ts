import createRecipes, { getAllFAQs } from "./utils/createRecipes";
import { genSearchIdx } from "./utils/genSearchIndex";
import { ICompleteRecipe, IFAQObj } from "./utils/types";

import * as fs from "fs";
import * as path from "path";

exports.createPages = async ({ actions, graphql }) => {
  const allFAQs: IFAQObj = await getAllFAQs({ graphql, actions });
  const allRecipeObj: ICompleteRecipe = await createRecipes(
    { actions, graphql },
    allFAQs
  );

  const recipeIndex = genSearchIdx(allRecipeObj);

  const indexPath = path.join("netlify", "functions", "assets");

  if (!fs.existsSync(indexPath)) {
    fs.mkdirSync(indexPath);
  }

  fs.writeFileSync(
    path.join(indexPath, "recipeIndex.txt"),
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
