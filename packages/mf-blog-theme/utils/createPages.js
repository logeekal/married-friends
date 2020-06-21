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

  console.log("Got posts data");
  const posts = postsWrapper.wpgraphql.posts.nodes;
  console.log(posts);

  createPage({
    path: "/hello",
    component: indexTemplate,
    context: {
      posts
    }
  });
};
