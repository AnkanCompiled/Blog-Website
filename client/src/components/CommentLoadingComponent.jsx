import React from "react";

export default function CommentLoadingComponent() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-2 w-full">
        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-36 h-5 rounded-lg"></div>
        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-full h-5 rounded-xl"></div>
        <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-64 h-5 rounded-xl"></div>
      </div>
      <div className="w-7"></div>
    </div>
  );
}
