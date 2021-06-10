import React from "react";
import {log} from "../utils";

export default {
  h1: (props) => {
    log(props);
    return (
      <h1
        sx={{
          fontFamily: "cursive",
          color: "accent",
        }}
      >
        Hellooooo {props.children}
      </h1>
    );
  },
};
