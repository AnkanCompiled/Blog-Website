import React from "react";

export default function PageLoadingComponent({ background = true }) {
  return (
    <div
      className={`flex justify-center items-center ${
        background ? "dark:bg-gray-900 bg-gray-200 w-screen h-screen" : "h-full"
      }`}
    >
      <div className="flex flex-row gap-2">
        <div className="animate-pulse bg-gray-300 dark:bg-gray-600 w-12 h-12 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 w-28 h-5 rounded-full"></div>
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 w-36 h-5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
