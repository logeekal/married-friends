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

const striptags = require("striptags");
const fs = require("fs");
const path = require("path");
const lunr = require("lunr");
const { log } = require("./utils");

function createIndex(posts) {
  let cleanedPosts = posts.map((post) => {
    return {
      ...post,
      content: striptags(post["content"]),
    };
  });

  //const postIndex = Fuse.createIndex(options.keys, cleanedPosts);

  const postIndex = buildIndex(cleanedPosts);

  log("Writing post Index");

  fs.writeFileSync(
    `public/post_index.json`,
    JSON.stringify(postIndex),
    "utf-8"
  );
}

function buildIndex(cleanedPosts) {
  const idx = lunr(function () {
    this.ref("id");
    this.field("title");
    this.field("content");

    cleanedPosts.forEach(function (post) {
      this.add(post);
    }, this);
  });
  return idx;
}

module.exports = {
  createIndex,
};
