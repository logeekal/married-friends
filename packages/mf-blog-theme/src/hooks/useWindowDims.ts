import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import useWindow from "./useWindow";

const useWindowDims = () => {
  const hasWindow = useWindow()[0];

  function getWindowSize() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height
    };
  }

  const [windowDim, setWindowDim] = useState(getWindowSize());

  console.log(`hasWindow`, hasWindow, windowDim);
  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDim(getWindowSize());
      };

      handleResize();

      const debouncedHandler = debounce(handleResize, 0);
      window.addEventListener("resize", debouncedHandler);
      const cleanup = () => {
        window.removeEventListener("resize", debouncedHandler);
      };
      return cleanup;
    }
  }, [hasWindow]);

  return windowDim;
};

export default useWindowDims;
