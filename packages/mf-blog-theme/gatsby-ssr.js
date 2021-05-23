import React from "react";

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com/"
      crossOrigin="anonymous"
    />,
    <link
      href="https://fonts.googleapis.com/css?family=Fredericka+the+Great|Sacramento|Inter:300,400,500,600,700,800&amp;display=swap"
      rel="stylesheet"
      crossOrigin="anonymous"
    />,
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@0.6.2/lite-youtube.js"
      async
    />
  ]);
};
