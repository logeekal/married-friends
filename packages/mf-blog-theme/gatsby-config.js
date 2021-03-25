const path = require("path");

module.exports = {
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "WPGraphql",
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
        fonts: ["Fredericka+the+Great", "Sacramento", "IBM Plex Sans"],
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
  ],
};
