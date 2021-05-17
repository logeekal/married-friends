const path = require("path");

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
      resolve: "gatsby-source-instagram",
      options: {
        username: "marriedfriends",
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Fredericka+the+Great",
        "Sacramento", "IBM Plex Sans", 
          "Inter\:100,200,300,400,500,600,700,800,900"],
      },
      display: "swap",
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
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: "https://marriedfriends.us19.list-manage.com/subscribe/post?u=63563726bccf3fd0787d6c23b&amp;id=1e903186f7",
        timeout:3500
      }
    }
  ],
};
