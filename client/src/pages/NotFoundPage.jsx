import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "404 Not Found";
  });
  return (
    <div className="main_screen">
      <div className="text-center m-10 w-full font-mono">
        <h1 className="text-5xl font-bold text-gray-700 dark:text-gray-100">
          404 Page not found.
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-100 opacity-80 mt-4">
          Sorry, the page you are looking for cannot be found.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block  py-2 px-4 bg-gray-800 text-white rounded-lg hover:scale-95 transition duration-200"
        >
          Go back to Home Page
        </Link>
      </div>
    </div>
  );
}
