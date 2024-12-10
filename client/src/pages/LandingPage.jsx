import React, { useEffect, useState } from "react";
import LoginRegisterComponent from "../components/LoginRegisterComponent";
import NavbarComponent from "../components/NavbarComponent";

export default function LandingPage() {
  const [animateText, setAnimateText] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [changeText, setChangeText] = useState(true);

  const textOptions = [
    "Start Sharing Your Ideas with a Community of Creators",
    "Turn Your Passion into Conversations",
    "Build Connections Through Your Voice",
  ];

  useEffect(() => {
    document.title = "BloggerNet";
    setTimeout(() => {
      setAnimateText(true);
    }, 100);
    const startTextChangeInterval = () => {
      return setInterval(() => {
        setChangeText(false);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % textOptions.length);
          setChangeText(true);
        }, 500);
      }, 5000);
    };

    let textChangeInterval = startTextChangeInterval();

    const mediaQuery = window.matchMedia("(max-width: 1279px)");
    const handleScreenSizeChange = (event) => {
      if (event.matches) {
        clearInterval(textChangeInterval);
      } else {
        clearInterval(textChangeInterval);
        textChangeInterval = startTextChangeInterval();
      }
    };

    mediaQuery.addEventListener("change", handleScreenSizeChange);

    return () => {
      clearInterval(textChangeInterval);
      mediaQuery.removeEventListener("change", handleScreenSizeChange);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r dark:from-gray-900 dark:to-gray-700 from-gray-400 to-gray-100 w-screen h-screen">
      <NavbarComponent />
      <div
        className={`xl:grid xl:grid-cols-2 xl:px-20 ${
          animateText ? "slide-up" : ""
        }`}
      >
        <div className={`hidden xl:block p-16`}>
          <div className="flex items-center min-h-32">
            <h1
              className={`text-left text-gray-700 dark:text-gray-100 text-4xl font-semibold transition-opacity duration-500 ${
                changeText ? "opacity-1" : "opacity-0"
              }`}
            >
              {textOptions[textIndex]}
            </h1>
          </div>
          <p className="text-center border-2 rounded-2xl p-2 border-dashed border-gray-700 dark:border-gray-100  text-gray-700 dark:text-gray-100 opacity-80 text-2xl mt-7">
            Join BloggerNet & share your insights with others.
          </p>
        </div>
        <div className="">
          <LoginRegisterComponent />
        </div>
      </div>
    </div>
  );
}
