module.exports = {
  WORDPRESS_DOMAIN: "marriedfriends.in/blog",
  get URL_MATCHER() {
    return /((http(s)?):\/\/)?marriedfriends\/blog/g;
  }
};
