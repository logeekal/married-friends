import React from "react";

type UseScrollHook = () => {
  scrollHeight: number;
  scrollTo: (height: number) => void;
};

export const useScroll: UseScrollHook = () => {
  const [scrollHeight, setScrollHeight] = React.useState(0);

  React.useEffect(() => {
    const hasWindow = typeof window !== "undefined";
    function onScroll() {
      setScrollHeight(window.scrollY);
    }
    if (hasWindow) {
      window.addEventListener("scroll", onScroll);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  const scrollTo = (height: number) => {
    if (typeof window !== "undefined")
      window.scrollTo({ left: 0, top: height, behavior: "smooth" });
  };

  return { scrollHeight, scrollTo };
};
