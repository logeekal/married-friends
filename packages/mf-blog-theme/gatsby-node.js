const createPages = require("./utils/createPages");

exports.createPages = async ({ actions, graphql }) => {
  await createPages({ actions, graphql });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
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
