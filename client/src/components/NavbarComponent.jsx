import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import DarkModeComponent from "./DarkModeComponent";
import Upload_Black from "../assets/Upload_Black.svg";
import Upload_White from "../assets/Upload_White.svg";
import Profile_Black from "../assets/Profile_Black.svg";
import Profile_White from "../assets/Profile_White.svg";
import Menu_Black from "../assets/Menu_Black.svg";
import Menu_White from "../assets/Menu_White.svg";
import { useAuth } from "../context/authContext";
import { useMode } from "../context/modeContext";

export default function NavbarComponent(logged = false) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="grid grid-cols-2 top-0 left-0 w-full p-3 shadow-sm ">
      <div className="flex justify-start">
        <NavLink
          to="/home"
          className="my-auto text-2xl dark:text-white font-pattaya"
        >
          BloggerNet
        </NavLink>
        {/* <DarkModeComponent /> */}
      </div>
      <div className="flex justify-end">
        {isAuthenticated ? <LoggedComponent /> : <DarkModeComponent />}
      </div>
    </div>
  );
}
function LoggedComponent() {
  const { isModeDark } = useMode();

  return (
    <div className=" grid grid-cols-3 gap-6 items-center">
      <NavLink
        to="/upload"
        className={({ isActive }) =>
          `${isActive ? "scale-90" : "hover:scale-95 w-9 h-9 "}`
        }
      >
        <img
          className="w-full h-full"
          src={isModeDark ? Upload_White : Upload_Black}
          alt="Upload"
        />
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${isActive ? "scale-90" : "hover:scale-95 w-9 h-9 "}`
        }
      >
        <img
          className="w-full h-full"
          src={isModeDark ? Profile_White : Profile_Black}
          alt="Profile"
        />
      </NavLink>
      <NavLink
        to="/setting"
        className={({ isActive }) =>
          `${isActive ? "scale-90" : "hover:scale-95 w-9 h-9 "}`
        }
      >
        <img
          className="w-full h-full"
          src={isModeDark ? Menu_White : Menu_Black}
          alt="Profile"
        />
      </NavLink>
    </div>
  );
}
