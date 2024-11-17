import React, { useState, useRef, useEffect } from "react";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import Logo_Icon from "/logo.png";

function NavbarComponent({ children }) {
  return (
    <div
      className={`w-full grid grid-cols-2 items-center bg-red-400 p-3 shadow-md `}
    >
      <div className="flex justify-start items-center">
        <img src={Logo_Icon} alt="Logo" className="w-6 h-6 " />
        <span className="text-white text-2xl font-semibold">loggerNet</span>
      </div>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}

export function NoUserNavComponent(props) {
  const [loginVisible, setLogininVisibility] = useState(false);
  const [registerVisible, setRegisterVisibility] = useState(false);
  const registerButtonRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (registerButtonRef.current) {
      registerButtonRef.current.click();
    }
  }, [props.clickbtn]);

  return (
    <div>
      <LoginComponent visible={loginVisible} />
      <RegisterComponent visible={registerVisible} />
      <div
        className={`fixed w-full grid grid-cols-2 items-center bg-white p-3 shadow-md z-[11] transition-transform ${
          scrollPosition > 64 ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="text-xl font-semibold text-red-400 drop-shadow-sm">
          Share your experience with the World
        </h1>
        <div className="flex justify-end">
          <button
            className="bg-red-300 text-white log-button"
            ref={registerButtonRef}
            onClick={() => {
              setRegisterVisibility((prev) => !prev);
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
      <NavbarComponent>
        <button
          className="bg-gray-100 log-button"
          onClick={() => {
            setLogininVisibility((prev) => !prev);
          }}
        >
          Log In
        </button>
        <button
          className="bg-red-300 text-white log-button"
          ref={registerButtonRef}
          onClick={() => {
            setRegisterVisibility((prev) => !prev);
          }}
        >
          Sign Up
        </button>
      </NavbarComponent>
    </div>
  );
}
