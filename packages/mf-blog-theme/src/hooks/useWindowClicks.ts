import { useEffect, useState } from "react";

const useWindowClick = () => {
  const [clickTargetRef, setClickTargetRef] = useState(null);

  useEffect(() => {
    window.addEventListener("click", clickHandler);

    return () => window.removeEventListener("click", clickHandler);
  }, []);
  const clickHandler = (ev: MouseEvent) => {
    setClickTargetRef(ev.target);
  };

  return clickTargetRef;
};



export default useWindowClick;
