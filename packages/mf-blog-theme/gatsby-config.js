module.exports = {
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Fredericka+the+Great", "Sacramento", "IBM Plex Sans"]
      },
      display: "swap"
    },
    "gatsby-plugin-typescript"
  ]
};
