import React from "react";

type useWindowHook = () => boolean[2];

const useWindow: useWindowHook = () => {
  const [hasWindow, setHasWindow] = React.useState(false);
  const [hasDocument, setHasDocument] = React.useState(false);

  React.useEffect(() => {
    typeof window !== "undefined" && setHasWindow(true);
    typeof document !== "undefined" && setHasDocument(true);
  });

  return [hasWindow, hasDocument];
};

export default useWindow;
