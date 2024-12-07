import React, { useState } from "react";
import { useMode } from "../context/modeContext";
import { setCookie } from "../util/cookieUtil";

export default function AppearanceComponent() {
  const { isModeDark, setMode } = useMode();
  const handleChange = (e) => {
    const newMode = e.target.value == "true";
    document.documentElement.classList.toggle("dark", newMode);
    document.documentElement.classList.toggle("light", !newMode);
    setMode(newMode);
    setCookie("mode", newMode.toString(), { secure: false });
  };
  return (
    <div>
      <h2 className="text-4xl font-semibold dark:text-gray-100 text-gray-800 mb-3">
        Dark Mode
      </h2>
      <div className="text-xl grid grid-flow-row xl:flex dark:text-gray-200 text-gray-700">
        <div>
          <input
            type="radio"
            value="true"
            checked={isModeDark === true}
            onChange={handleChange}
            className=" text-gray-800 focus:ring-0"
          />
          <label className="mx-4">Enable</label>
        </div>
        <div>
          <input
            type="radio"
            value="false"
            checked={isModeDark === false}
            onChange={handleChange}
            className=" text-gray-800 focus:ring-0"
          />
          <label className="mx-4">Disable</label>
        </div>
      </div>
    </div>
  );
}
