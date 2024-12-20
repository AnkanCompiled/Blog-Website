import React, { useState } from "react";
import DisplayQuillContent from "../components/DisplayQuillComponent";
import Profile_Black from "../assets/Profile_Black.svg";
import Profile_White from "../assets/Profile_White.svg";
import Comment_Black from "../assets/Comment_Black.svg";
import Comment_White from "../assets/Comment_White.svg";
import Bookmark_Black from "../assets/Bookmark_Black.svg";
import Bookmark_White from "../assets/Bookmark_White.svg";
import { useMode } from "../context/modeContext";
import LikeComponent from "./LikeComponent";
const URL = import.meta.env.VITE_BACKEND_URL;

export default function PostComponent({ value }) {
  const { isModeDark } = useMode();
  const [showFullContent, setShowFullContent] = useState([]);

  function extractFirstLine(deltaData) {
    let firstLine = "";
    for (let op of deltaData.ops) {
      if (typeof op.insert === "string") {
        firstLine += op.insert.split("\n")[0];
        break;
      }
    }
    return firstLine;
  }

  const toggleContent = (id) => {
    setShowFullContent((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className="flex gap-2">
        <img
          src={
            value?.profilePicture
              ? `${URL}/bloggerNet/post/image/${value?.profilePicture}`
              : isModeDark
              ? Profile_White
              : Profile_Black
          }
          alt={`Profile image for ${value?.username}`}
          className="p-[2px] h-8 w-8 rounded-full object-cover"
        />
        <p className="bold text-xl opacity-80">{value?.username}</p>
      </div>
      <img
        src={`${URL}/bloggerNet/post/image/${value?.post?.mediaUrl}`}
        alt={`Post image for ${value?.post?._id}`}
        className="w-full h-auto object-cover"
      />
      <div className="p-2 h-full flex flex-col border-b-2 border-[#f0f0f0] dark:border-[#222222]">
        {showFullContent[value?.post?._id] ? (
          <DisplayQuillContent deltaData={JSON.parse(value?.post?.content)} />
        ) : (
          <p className="text-xl font-bold">
            {extractFirstLine(JSON.parse(value?.post?.content))}
          </p>
        )}
        <div>
          <button
            onClick={() => toggleContent(value?.post?._id)}
            className=" text-blue-500 hover:text-blue-600 my-3"
          >
            {showFullContent[value?.post?._id] ? "Show Less" : "Read More"}
          </button>
        </div>
        <div className="grid grid-cols-2 w-full">
          <div className="flex gap-4">
            <LikeComponent value={value} />
            <button className="hover:scale-105 duration-300">
              <img
                src={isModeDark ? Comment_White : Comment_Black}
                alt={`Like`}
                className="h-8 w-8 object-cover"
              />
            </button>
          </div>
          <div className="flex justify-end">
            <button className="hover:scale-105 duration-300">
              <img
                src={isModeDark ? Bookmark_White : Bookmark_Black}
                alt={`Like`}
                className="h-8 w-8 object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
