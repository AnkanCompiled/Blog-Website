import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

export default function ProfilePage(props) {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    document.title = userName || "Profile";
  }, [userName]);
  return (
    <div className="main_screen">
      <NavbarComponent />
      <div className="flex-1 flex items-center justify-center"></div>
      <FooterComponent />
    </div>
  );
}
