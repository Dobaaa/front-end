import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);
export default function WindowContext({ children }) {
  const [isWindow, SetWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function WindowChange() {
      SetWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", WindowChange);
    //clean up Function
    return () => {
      window.removeEventListener("resize", WindowChange);
    };
  }, []);
  return (
    <WindowSize.Provider value={{ isWindow, SetWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
}
