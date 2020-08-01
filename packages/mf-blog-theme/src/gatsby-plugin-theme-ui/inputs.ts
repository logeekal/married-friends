import { SxStyleProp } from "theme-ui";

const InputCommon = {
  height: "65px",
  borderRadius: 0,
  paddingInline: "15px",
  fontSize: 1,
  border: "transparent",
  bg: "bgCard"
};

export const input: any = {
  primary: {
    ...InputCommon
  },
  secondary: {
    ...InputCommon,
    borderBottomWidth: "3px",
    borderBottomStyle: "solid",
    borderBottomColor: "accent"
  } as SxStyleProp
};
