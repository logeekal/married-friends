/** @jsx jsx */

import { jsx, Styled } from "theme-ui";
import React from "react";
import YoutubeFeed from "../../sections/YoutubeFeed";
import { FLEX_CONFIG } from "../../utils/style";

const Footer: React.FC<{}> = ({ children }) => {
  return (
    <footer sx={{}}>
      <div
        className="footer_1"
        sx={{
          backgroundColor: "bgAccent",
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
      </div>
      <div className="footer_2">
        <div
          className="footer_2__message"
          sx={{
            fontFamily: "cursive",
            fontSize: 3,
            color: "bgPrimary",
            bg: "secondary",
            textAlign: "center",
            paddingTop: 1,
            paddingBottom: 1,
            paddingX: 1,
            "@media only screen and (max-width: 500px)":{
            fontSize: 2,
          }
          }}
        >
          Created with love by Jatin and Richa
        </div>
      </div>

      {children}
    </footer>
  );
};

export default Footer;
