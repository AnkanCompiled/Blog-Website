import React, { useState, useEffect } from "react";
import LightMode from "../assets/LightMode.svg";
import DarkMode from "../assets/DarkMode.svg";
import { getCookie, setCookie } from "../util/cookieUtil";
import { useMode } from "../context/modeContext";

export default function DarkModeComponent() {
  const { isModeDark, setMode } = useMode();

  const toggleDarkMode = () => {
    const newMode = !isModeDark;
    document.documentElement.classList.toggle("dark", newMode);
    document.documentElement.classList.toggle("light", !newMode);
    setMode(newMode);
    setCookie("mode", newMode.toString(), { secure: false });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-3 scale-95 hover:scale-90 bg-gray-300 dark:bg-gray-900 w-12 h-12 rounded-full shadow-lg transition-all"
    >
      {isModeDark ? (
        <img src={DarkMode} alt="Dark Mode" />
      ) : (
        <img src={LightMode} alt="Light Mode" />
      )}
    </button>
  );
}
