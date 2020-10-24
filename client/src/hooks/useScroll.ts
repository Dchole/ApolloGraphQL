import { useViewportScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const useScroll = () => {
  const [scrolledDown, setScrolledDown] = useState(false);
  const { scrollY } = useViewportScroll();

  const handleScrollDown = useCallback(() => {
    if (scrollY.get() - scrollY.getPrevious() > 0) {
      setScrolledDown(true);
    } else {
      setScrolledDown(false);
    }
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollDown);

    return () => {
      window.addEventListener("scroll", handleScrollDown);
    };
  }, [handleScrollDown]);

  return { scrolledDown };
};

export default useScroll;
