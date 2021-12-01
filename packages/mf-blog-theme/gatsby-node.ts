import createRecipes, {getAllFAQs} from './utils/createRecipes'
import {IFAQObj} from './utils/types';

exports.createPages = async ({ actions, graphql }: any) => {
  const allFAQs: IFAQObj = await getAllFAQs({graphql, actions })
  await createRecipes({ actions, graphql }, allFAQs);
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions } : any) => {
  if (stage === "build-html") {
    console.log("Ignoring Carousel");
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /responsive-react-image-carousel/, use: loaders.null() }
        ]
      }
    });
  }
};
