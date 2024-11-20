import React, { useState, useRef, useEffect } from "react";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import Logo_Icon from "/logo.png";
import User_Icon from "../assets/User_Icon.svg";
import Upload_Icon from "../assets/Upload_Icon.svg";
import Menu_Icon from "../assets/Menu_Icon.svg";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../util/cookieUtil";

function NavbarComponent({ children }) {
  const navigate = useNavigate();
  function handleIconClick(e) {
    navigate("/dashboard");
  }
  return (
    <div
      className={`w-full grid grid-cols-2 items-center bg-red-500 p-3 shadow-2xl z-[11]`}
    >
      <button
        className="flex justify-start items-center"
        onClick={handleIconClick}
      >
        <img src={Logo_Icon} alt="Logo" className="w-6 h-6 " />
        <span className="text-white  text-2xl font-semibold">loggerNet</span>
      </button>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}

export function UserNavComponent(props) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  function handleUploadBtn(e) {
    navigate("/upload");
  }
  function handleMenuBtn(e) {
    setShowMenu((prev) => !prev);
  }

  function handlDeleteCookie(e) {
    deleteCookie("user");
    window.location.reload();
  }

  function navButton(img, handleClick) {
    return (
      <button onClick={handleClick}>
        <img
          className="w-8 h-8 transition-transform hover:scale-95"
          src={img}
        />
      </button>
    );
  }
  return (
    <>
      <NavbarComponent>
        <div className="grid grid-cols-3 gap-10">
          {navButton(Upload_Icon, handleUploadBtn)}
          {navButton(User_Icon)}
          {navButton(Menu_Icon, handleMenuBtn)}
        </div>
      </NavbarComponent>
      <div
        className={`fixed  w-screen grid grid-cols-2  transform transition-opacity ${
          showMenu ? "opacity-100" : "opacity-0"
        }`}
      >
        <div></div>
        <div className="flex justify-end mt-1 mr-5 ">
          <button
            className="bg-red-400 transition-colors hover:bg-red-600 rounded-sm p-3 shadow-md"
            onClick={handlDeleteCookie}
          >
            <p className=" text-white font-semibold">Log Out</p>
          </button>
        </div>
      </div>
    </>
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
          Share your experience with the World!
        </h1>
        <div className="flex justify-end">
          <button
            className="bg-red-400 font-bold text-white log-button"
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
          className="bg-red-400 font-bold text-white log-button"
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
