import React, { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const screenSize = () => {
      setIsMobile(window.innerWidth <= 768 ? true : false);
    };
    screenSize();
    window.addEventListener("resize", screenSize);
    return () => {
      window.removeEventListener("resize", screenSize);
    };
  }, []);
  return isMobile;
};

export default useIsMobile;
