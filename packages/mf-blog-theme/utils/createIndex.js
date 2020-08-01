/*
 *const JsSearch = require("js-search");
 *
 *function createIndex(posts) {
 *  const postIndex = new JsSearch.Search("id");
 *  postIndex.indexStrategy = new JsSearch.PrefixIndexStrategy();
 *  postIndex.sanitizer = new JsSearch.LowerCaseSanitizer();
 *  postIndex.searchIndex = new JsSearch.TfIdfSearchIndex("id");
 *  postIndex.addIndex("title");
 *  postIndex.addIndex("excerpt");
 *  postIndex.addIndex("content");
 *  postIndex.addIndex("slug");
 *  postIndex.addIndex(["categories", "nodes", "name"]);
 *  postIndex.addDocuments(posts);
 *  return postIndex;
 *}
 *
 */

const Fuse = require("fuse.js");
const striptags = require("striptags");
const fs = require("fs");
const path = require("path");

function createIndex(posts) {
  const options = {
    includeScore: true,
    keys: [
      {
        name: "title",
        score: 0.5
      },
      {
        name: "content",
        score: 0.3
      },
      {
        name: "categories.nodes.name",
        score: 0.2
      }
    ]
  };

  let cleanedPosts = posts.map(post => {
    return {
      ...post,
      content: striptags(post["content"])
    };
  });

  const postIndex = Fuse.createIndex(options.keys, cleanedPosts);
  fs.writeFileSync(
    path.join(__dirname, "../content/post_index.json"),
    JSON.stringify(postIndex)
  );
}

module.exports = { createIndex };
