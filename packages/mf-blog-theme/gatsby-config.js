const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

console.log("----> ", process.env)

module.exports = {
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        analyzerMode: "static",
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["UA-24329901-2"],
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "WPGraphQL",
        fieldName: "wpgraphql",
        url: `${process.env.MF_HOST}/graphql`,
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
        maxVideos: 20,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://marriedfriends.us19.list-manage.com/subscribe/post?u=63563726bccf3fd0787d6c23b&amp;id=1e903186f7",
        timeout: 3500,
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
        {
          site {
            siteMetadata {
              title 
              description
              siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, wpgraphql } }) => {
              console.log("****************");
              console.log("Serializing RSS Feed");
              console.log("****************");
              return wpgraphql.recipes.edges.map((edge) => {
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  guid: edge.node.databaseId,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + edge.node.uri,
                  //custom_elements: [{ "content:encoded": edge.node.content }]
                });
              });
            },
            query: `
              {
                wpgraphql {
                  recipes(first: 1000, where: {orderby: {field: DATE, order: DESC}}) {
                    edges {
                      node {
                        databaseId
                        date
                        title
                        excerpt
                        uri
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Feeding you from The Fearless Cooking",
          },
        ],
      },
    },
  ],
};
