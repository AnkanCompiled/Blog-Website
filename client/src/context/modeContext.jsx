import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../util/cookieUtil";

const ModeContext = createContext();

export const useMode = () => {
  return useContext(ModeContext);
};

export const ModeProvider = ({ children }) => {
  const [isModeDark, setMode] = useState(false);
  useEffect(() => {
    const mode = getCookie("mode");
    if (mode === null) {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.add(isSystemDark ? "dark" : "light");
      setMode(isSystemDark);
    } else {
      const isDark = mode === "true";
      document.documentElement.classList.add(isDark ? "dark" : "light");
      setMode(isDark);
    }
  }, []);

  return (
    <ModeContext.Provider value={{ isModeDark, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
