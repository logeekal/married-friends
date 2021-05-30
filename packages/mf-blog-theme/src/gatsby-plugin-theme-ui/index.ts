import { merge, SxStyleProp } from "theme-ui";
import { buttons } from "./buttons";
import { input } from "./inputs";
import { lighten } from "@theme-ui/color";
const colors = {
  bgPrimary: "#f0f0f0",
  bgAccent: "#ffd6e4",
  bgCard: "#FFFFFF",
  bgButton: "#FF035E",

  primary: "#000000",
  accent: "#FF035E",
  secondary: "#6C6666",
  accentSecondary: "rgba(51, 126, 255, 0.66)",
};

const fonts = {
  special: "Fredericka the Great, sans-serif",
  normal: "Inter, sans-serif",
  cursive: "Sacramento, sans-serif",
};

const fontWeights = {
  light: 200,
  regular: 400,
  bold: 600,
};

const forms = {
  input: {
    ...input.primary,
    accented: {
      ...input.secondary,
    },
  },
};

const fontSizes = [14, 20, 32, 42, 52, 104];

const space = [7.5, 15, 30, 60, 120];

const breakpoints = ["40em", "52em", "64em"];

const styles = {
  "*": {
    boxSizing: "border-box",
    padding: "0px",
    margin: "0px",
    "font-display": "swap",
  } as SxStyleProp,
  root: {
    backgroundColor: "bgPrimary",
    fontFamily: "normal",
    boxSizing: "border-box",
    margin: "0px !important",
    padding: "0px !important",
    blockquote: {
      display: "block",
      borderLeftWidth: "1px",
      borderTop: "1px solid",
      borderTopColor: lighten("secondary", 0.5),
      borderRight: "1px solid",
      borderRightColor: lighten("secondary", 0.5),
      borderBottom: "1px solid ",
      borderBottomColor: lighten("secondary", 0.5),
      borderRadius: "5px",
      width: "100%",
      marginBlockStart: 1,
      marginBlockEnd: 1,
      marginX: "0px",
      paddingX: "1rem",
      color: "secondary",
      fontKerning: "normal",
      paddingY: 1,
      fontStyle: "normal",
      fontWeight: "300",
      position: "relative",
      "::before": {
        display: "block",
        content: '""',
        position: "absolute",
        background:
          "linear-gradient(180deg, rgba(51, 126, 255, 0.56) 0%, rgba(187, 44, 147, 0.522608) 99.99%, rgba(255, 3, 94, 0.504) 100%)",
        top: "0px",
        left: "0px",
        height: "100%",
        width: "0.5rem",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
      },
      "*": {
        fontStyle: "normal",
        fontWeight: 3,
      },
    } as SxStyleProp,
    h2: {
      fontFamily: "normal",
      fontSize: 2,
    },
    li: {
      marginBottom: "0.5rem"
    }
  },
  body: {
    margin: "0px !important",
    padding: "0px !important",
  },
  h1: {
    fontFamily: "normal",
    fontSize: 3,
  },
  h3: {
    fontFamily: "normal",
    fontSize: 1,
  },
  a: {
    color: "accent",
    textDecoration: "none",
  },
  p: {
    margin: "0px",
    padding: "0px",
  },
  hr: {
    width: "100px",
    height: "5px",
    border: "transparent",
    backgroundColor: "accent",
    marginBlockEnd: "30px",
    borderRadius: "2px",
  },
  li: {
    marginBottom: "4rem",
  },
  ul: {
    "-webkit-padding-start": "1rem",
    "-moz-padding-start": "1rem",
  },
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
    space,
    breakpoints,
  }
);
