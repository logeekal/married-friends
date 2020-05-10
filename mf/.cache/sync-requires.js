const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/nfs/home1/jkathuri/projects/married-friends/mf/.cache/dev-404-page.js"))),
  "component---packages-mf-blog-theme-src-pages-index-js": hot(preferDefault(require("/nfs/home1/jkathuri/projects/married-friends/packages/mf-blog-theme/src/pages/index.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/nfs/home1/jkathuri/projects/married-friends/mf/src/pages/index_.js")))
}

