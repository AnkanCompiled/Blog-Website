import React, { useEffect, useState } from "react";
import { contentImageApi } from "../api/contentApi";
const URL = import.meta.env.VITE_BACKEND_URL;

export default function PostCardComponent(props) {
  const [img, setImg] = useState("");
  useEffect(() => {
    const url = `${URL}/api/content/image/${props.image}`;
    setImg(url);
  });

  return (
    <div className="flex justify-center">
      <button className="bg-red-200 p-2 my-5 mx-2 rounded-md w-full sm:w-[500px] h-auto shadow-lg">
        {img && <img src={img} alt={"image"} />}
        <div className="bg-red-50">
          <h1 className="text-xl text-red-400 font-semibold text-left  my-2 p-2">
            {props.title}
          </h1>
          <p className="text-sm text-gray-700 font-semibold text-left p-2">
            {props.content}
          </p>
          <p className="text-sm text-end text-gray-700 font-thin  p-2">
            - {props.name}
          </p>
        </div>
      </button>
    </div>
  );
}
