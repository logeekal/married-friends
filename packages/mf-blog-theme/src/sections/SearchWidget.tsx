/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { Box, jsx } from "theme-ui";
import { keyframes } from "@emotion/react";

interface SearchWidgetProps {
  visible: boolean;
  onClose: () => void;
}

const widgetAppear = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(40px)",
  },

  to: {
    opacity: 1,
    transform: "translateY(0px)",
  },
});

const SearchWidget: React.FC<SearchWidgetProps> = (props) => {
  const { visible, onClose } = props;
  return (
    <Box
      bg="rgba(0,0,0,0.6)"
      sx={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100vw",
        height: "100vh",
        display: visible ? "block" : "none",
        zIndex: 997
      }}
    >
    </Box>
  );
};

export default SearchWidget
