import React from "react";
import Google_Icon from "../assets/Google_Icon.webp";
import { account } from "../api/appWrite";

export default function GoogleLoginComponent() {
  async function handleClick(e) {
    account.createOAuth2Session(
      "google",
      "http://localhost:5173/",
      "http://localhost:5173/fail"
    );
  }
  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onClick={handleClick}
      >
        <img src={Google_Icon} alt="Google logo" className="w-5 h-5" />
        <span className="font-medium">Login with Google</span>
      </button>
    </div>
  );
}
