const path = require("path");

const QUERIES = require("../gql/queries");

module.exports = async ({ actions, graphql }) => {
  console.log(actions, graphql);
  const indexTemplate = path.resolve(
    path.join(__dirname, "../src/templates/index.tsx")
  );
  const { createPage } = actions;
  const allPages = [];

  const { data: postsWrapper } = await graphql(QUERIES.GET_POSTS);

  const { data: categoriesWrapper } = await graphql(QUERIES.GET_CATS_SUMMARY);

  const posts = postsWrapper.wpgraphql.posts.nodes;
  const categories = categoriesWrapper.wpgraphql.categories.nodes;

  createPage({
    path: "/",
    component: indexTemplate,
    context: {
      posts,
      categories
    }
  });
};
