module.exports = {
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-source-instagram",
      options: {
        username: "marriedfriends"
      }
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Fredericka+the+Great", "Sacramento", "IBM Plex Sans"]
      },
      display: "swap"
    },
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true
      }
    }
  ]
};
