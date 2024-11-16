import React, { useState } from "react";
import Logo_Icon from "/logo.png";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

export default function LandingPage() {
  const [loginVisible, setLogininVisibility] = useState(false);
  const [registerVisible, setRegisterVisibility] = useState(false);

  return (
    <div>
      <LoginComponent visible={loginVisible} />
      <RegisterComponent visible={registerVisible} />
      <div className="grid grid-cols-2 justify-center items-center bg-red-400 p-3 shadow-md">
        <div className="flex justify-start items-center">
          <img src={Logo_Icon} alt="Logo" className="w-6 h-6 " />
          <span className="text-white text-2xl font-semibold">loggerNet</span>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-200 log-button "
            onClick={() => {
              setLogininVisibility((prev) => !prev);
            }}
          >
            Log In
          </button>
          <button
            className="bg-red-300 text-white log-button"
            onClick={() => {
              setRegisterVisibility((prev) => !prev);
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
