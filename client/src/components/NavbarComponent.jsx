import React from "react";
import DarkModeComponent from "./DarkModeComponent";

export default function NavbarComponent() {
  return (
    <div className="grid grid-cols-2 top-0 left-0 w-full p-3 shadow-sm">
      <h1 className="my-auto text-2xl font-bold dark:text-white">BloggerNet</h1>
      <div className="flex justify-end">
        <DarkModeComponent />
      </div>
    </div>
  );
}
