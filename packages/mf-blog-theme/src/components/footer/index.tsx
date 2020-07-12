/** @jsx jsx */

import { jsx, Styled } from "theme-ui";
import React from "react";
import YoutubeFeed from "../../sections/YoutubeFeed";

const Footer: React.FC<{}> = ({ children }) => {
  return (
    <footer
      sx={{
        backgroundColor: "bgAccent",
        height: "600px",
        position: "relative",
        padding: "15px",
        paddingBlockStart: "30px",
        marginTop: "30px"
      }}
    >
      <div
        className="footer__header"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "cursive",
          fontSize: 4,
          color: "secondary",
          margin: "auto",
          width: "100%",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%) translateY(-90%)"
        }}
      >
        watch us on youtube
      </div>
      <YoutubeFeed />
      {children}
    </footer>
  );
};

export default Footer;
