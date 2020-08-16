const path = require("path");
const QUERIES = require("../gql/queries");
const { log, array2Obj } = require("./utils");

module.exports = async ({ actions, graphql }) => {
  console.log(actions, graphql);
  const indexTemplate = path.resolve(
    path.join(__dirname, "../src/templates/index.tsx")
  );
  const { createPage } = actions;
  const allPages = [];

  log("Building Home Page");
  const { data: postsWrapper } = await graphql(QUERIES.GET_POSTS);

  const { data: categoriesWrapper } = await graphql(QUERIES.GET_CATS_SUMMARY);

  let posts = postsWrapper.wpgraphql.posts.nodes;
  let postObj = {};

  for (let post of posts) {
    postObj[post.id] = post;
  }

  const categories = categoriesWrapper.wpgraphql.categories.nodes;
  console.log(categories);
  let catObj = {};
  for (let cat of categories) {
    catObj[cat.id] = cat;
  }

  /*
   *
   * Create Home Page
   *
   * */
  createPage({
    path: "/",
    component: indexTemplate,
    context: {
      postObj,
      catObj
    }
  });

  /*
   * Create Level 1 Category Page
   *
   * */

  log("Building Category level 1 Page");

  const { data: categoriesDetailsWrapper } = await graphql(
    QUERIES.GET_CATS_DETAILS
  );

  console.log(categoriesDetailsWrapper);

  const categoriesDetails = categoriesDetailsWrapper.wpgraphql.categories.nodes;

  categoriesDetails.forEach(cat => {
    if (!cat.count) return;
    console.log(
      `--------- Building path ${cat.slug} with posts :  ${cat.count} ---------`
    );
    if (cat.posts) {
      postObj = array2Obj(cat.posts.nodes, "id");
    } else {
      postObj = {};
    }

    if (cat.children) {
      catObj = array2Obj(cat.children.nodes, "id");
    } else {
      catObj = {};
    }

    createPage({
      path: `${cat.slug}`,
      component: indexTemplate,
      context: {
        postObj,
        catObj
      }
    });
  });

  log(" Building  Blog Pages ");

  const articlePageTemplate = path.join(
    __dirname,
    "../src/templates/ArticlePage.tsx"
  );

  const { data: allPostsWrapper } = await graphql(QUERIES.GET_ALL_POSTS);
  console.log(allPostsWrapper);

  posts = allPostsWrapper.wpgraphql.posts.nodes;

  posts.forEach(post => {
    createPage({
      path: `${post.slug}`,
      component: articlePageTemplate,
      context: {
        post
      }
    });
  });
};
