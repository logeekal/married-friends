const path = require("path");

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "WPGraphQL",
        fieldName: "wpgraphql",
        url: "https://backend.marriedfriends.in/graphql",
      },
    },
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: path.join(__dirname, "assets"),
          options: {
            props: {
              className: "icon",
            },
          },
        },
      },
    },
    {
      resolve: "gatsby-source-youtube-v3",
      options: {
        channelId: ["UCnuR03UvNf4t3WQosG1qPAA"],
        apiKey: process.env.YT_API_KEY,
        maxVideos: 20
      }
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://marriedfriends.us19.list-manage.com/subscribe/post?u=63563726bccf3fd0787d6c23b&amp;id=1e903186f7",
        timeout: 3500,
      },
    },
  ],
};
