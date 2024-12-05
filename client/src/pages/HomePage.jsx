import React, { useEffect } from "react";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";

export default function HomePage() {
  useEffect(() => {
    document.title = "BloggerNet";
  }, []);
  return (
    <div className="main_screen">
      <NavbarComponent />
      <div className="flex-1 flex items-center justify-center"></div>
      <FooterComponent />
    </div>
  );
}
