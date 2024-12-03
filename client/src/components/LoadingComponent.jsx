import React from "react";

export default function LoadingComponent({ sizeProp = 3 }) {
  return (
    <div className="w-full gap-x-2 flex justify-center items-center">
      <div
        className={`w-${sizeProp} h-${sizeProp} bg-blue-200 rounded-full animate-bounce`}
      ></div>
      <div
        className={`w-${sizeProp} h-${sizeProp} bg-blue-300 rounded-full animate-bounce`}
      ></div>
      <div
        className={`w-${sizeProp} h-${sizeProp} bg-blue-400 rounded-full animate-bounce`}
      ></div>
    </div>
  );
}
