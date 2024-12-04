import React from "react";

export default function LoadingComponent({ sizeProp = 1 }) {
  return (
    <div className="w-full gap-x-2 flex justify-center items-center">
      <div
        style={{ width: `${sizeProp}rem`, height: `${sizeProp}rem` }}
        className="bg-blue-200 rounded-full animate-bounce"
      ></div>
      <div
        style={{ width: `${sizeProp}rem`, height: `${sizeProp}rem` }}
        className="bg-blue-300 rounded-full animate-bounce"
      ></div>
      <div
        style={{ width: `${sizeProp}rem`, height: `${sizeProp}rem` }}
        className="bg-blue-400 rounded-full animate-bounce"
      ></div>
    </div>
  );
}
