const path = require("path");
const sizeof = require("object-sizeof");
const { createIndex } = require("./createIndex");
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
  const postObj = {};

  for (let post of posts) {
    postObj[post.id] = post;
  }

  const categories = categoriesWrapper.wpgraphql.categories.nodes;
  const catObj = {};
  for (let cat in categories) {
    catObj[cat.id] = cat;
  }

  //const postIndex = createIndex(posts);

  createPage({
    path: "/",
    component: indexTemplate,
    context: {
      postObj,
      catObj
    }
  });
};
