import React from "react";
import { NavLink } from "react-router-dom";

export default function EmailVerifiedComponent({ buttonProp = true }) {
  return (
    <div className="fixed w-screen left-0 top-0 flex justify-center">
      <div className="mt-10 mx-5 bg-gray-300 dark:bg-[#111111] opacity-80 px-10 py-5 rounded-lg shadow-xl flex gap-10">
        <label className="text-gray-800 dark:text-gray-200 text-2xl font-semibold">
          Your email is not verified
        </label>
        {buttonProp && (
          <NavLink to="/setting/account">
            <div className="py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200">
              Go Verify
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}
