import { merge } from "theme-ui";
import { buttons } from "./buttons";
import { input } from "./inputs";
const colors = {
  bgPrimary: "#f0f0f0",
  bgAccent: "#ffd6e4",
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

const forms = {
  input: {
    ...input.primary
  }
};

const fontSizes = [16, 20, 32, 42, 52, 104];

const space = [7.5, 15, 30, 60];

const styles = {
  "*": {
    boxSizing: "border-box"
  },
  root: {
    backgroundColor: "bgPrimary",
    fontFamily: "normal",
    boxSizing: "border-box",
    margin: "0px !important",
    padding: "0px !important"
  },
  body: {
    margin: "0px !important",
    padding: "0px !important"
  },
  h1: {
    fontFamily: "normal",
    fontSize: 3
  },
  h2: {
    fontFamily: "normal",
    fontSize: 2
  },
  h3: {
    fontFamily: "normal",
    fontSize: 1
  },

  a: {
    color: "accent",
    textDecoration: "none"
  },
  hr: {
    width: "100px",
    height: "5px",
    border: "transparent",
    backgroundColor: "accent",
    marginBlockEnd: "30px",
    borderRadius: "2px"
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
    styles,
    buttons,
    forms,
    space
  }
);
