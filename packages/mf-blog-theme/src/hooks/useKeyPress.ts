import React from "react";
import useWindow from "./useWindow";

export default function useKeyPress(key: string): boolean {
  const hasWindow = useWindow()[0];
  const [keyPressed, setKeyPressed] = React.useState<boolean>(false);

  React.useEffect(() => {
    const cleanup = () => {
      hasWindow && window.removeEventListener("keydown", keyCodeListener);
    };

    const keyCodeListener = (e: KeyboardEvent) => {
      console.log("Key Pressed ---", e.key, e);
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault()
        setKeyPressed(true);

      } else if (key.toLowerCase() === "ctrl" && e.ctrlKey) {
        e.preventDefault()
        setKeyPressed(true);
      }
    };

    hasWindow && window.addEventListener("keydown", keyCodeListener);

    return cleanup;
  }, [hasWindow]);

  return keyPressed;
}
