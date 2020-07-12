import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

const useWindowDims = () => {
  const hasWindow = typeof Window !== "undefined";

  function getWindowSize() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height
    };
  }

  const [windowDim, setWindowDim] = useState(getWindowSize);

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDim(getWindowSize);
      }

      const debouncedHandler = debounce(handleResize, 0);
      window.addEventListener("resize", debouncedHandler);
      function cleanup() {
        window.removeEventListener("resize", debouncedHandler);
      }
    }
  }, [hasWindow]);

  return windowDim;
};

export default useWindowDims;
