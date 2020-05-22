import { merge } from "theme-ui";

const colors = {
  bgPrimary: "#f0f0f0",
  bgAccent: "#FB84AF",
  bgCard: "#FFFFFF",
  bgButton: "#FF035E",

  primary: "#000000",
  accent: "#FF035E",
  secondary: "#6C6666"
};

const fonts = {
  special: "Fredericka the Great",
  normal: "IBM Plex Sans",
  cursive: "Sacramento"
};

const fontWeights = {
  regular: 500,
  bold: 600
};

const fontSizes = [16, 20, 32, 42];

const space = [15, 30, 60]

const styles = {
  root: {
    backgroundColor: "bgPrimary",
    paddingX: 30
  },
  h1: {
    fontFamily: "special",
    fontSize: 3
  }
};

export default merge(
  {},
  {
    initialColorMode: "light",
    useCustomProperties: true,
    colors,
    fonts,
    fontWeights,
    fontSizes,
    styles
  }
);
