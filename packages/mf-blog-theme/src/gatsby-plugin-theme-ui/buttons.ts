const buttonCommon = {
  cursor: "pointer",
  borderRadius: 0,
  fontWeight: "bold",
  width: "100%",
  height: "65px",
  fontSize: 1,
  textTransform: "uppercase",
  transition: "0.2s ease-in-out",
  minWidth: "50px",
};

export const buttons: any = {
  primary: {
    color: "bgPrimary",
    bg: "bgButton",
    borderColor: "bgPrimary",
    "&:hover": {
      bg: "bgPrimary",
      color: "bgButton",
      borderColor: "bgButton",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    ...buttonCommon,
  },
  secondary: {
    color: "accent",
    bg: "bgPrimary",
    ...buttonCommon,
  },
};
