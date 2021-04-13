import React from "react";

export default {
  h1: (props) => {
    console.log(props);
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
