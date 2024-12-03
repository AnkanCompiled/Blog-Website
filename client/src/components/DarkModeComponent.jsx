import React, { useState, useEffect } from "react";
import LightMode from "../assets/LightMode.svg";
import DarkMode from "../assets/DarkMode.svg";
import { getCookie, setCookie } from "../util/cookieUtil";

export default function DarkModeComponent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mode = getCookie("mode");

    if (mode === null) {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.add(isSystemDark ? "dark" : "light");
      setDarkMode(isSystemDark);
    } else {
      const isDark = mode === "true";
      document.documentElement.classList.add(isDark ? "dark" : "light");
      setDarkMode(isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    document.documentElement.classList.toggle("dark", newMode);
    document.documentElement.classList.toggle("light", !newMode);
    setDarkMode(newMode);
    setCookie("mode", newMode.toString());
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-3 scale-95 hover:scale-90 bg-gray-300 dark:bg-gray-900 w-12 h-12 rounded-full shadow-lg transition-all"
    >
      {darkMode ? (
        <img src={DarkMode} alt="Dark Mode" />
      ) : (
        <img src={LightMode} alt="Light Mode" />
      )}
    </button>
  );
}
