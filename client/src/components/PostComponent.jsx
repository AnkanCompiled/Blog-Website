import React, { useState, lazy, Suspense } from "react";
import DisplayQuillContent from "../components/DisplayQuillComponent";
import Profile_Black from "../assets/Profile_Black.svg";
import Profile_White from "../assets/Profile_White.svg";
import Comment_Black from "../assets/Comment_Black.svg";
import Comment_White from "../assets/Comment_White.svg";
import Bookmark_Black from "../assets/Bookmark_Black.svg";
import Bookmark_White from "../assets/Bookmark_White.svg";
import { formatDistanceToNow } from "date-fns";
import { useMode } from "../context/modeContext";
import LikeComponent from "./LikeComponent";
import PageLoadingComponent from "./PageLoadingComponent";
const CommentComponent = lazy(() => import("./CommentComponent"));
const URL = import.meta.env.VITE_BACKEND_URL;

export default function PostComponent({ value }) {
  const { isModeDark } = useMode();
  const [showComments, setShowComments] = useState(false);
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

  const handleComments = () => {
    setShowComments((prev) => !prev);
  };

  const toggleContent = (id) => {
    setShowFullContent((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {showComments && (
        <Suspense fallback={<PageLoadingComponent background={false} />}>
          <CommentComponent value={value} handleComments={handleComments} />
        </Suspense>
      )}
      <div className="flex flex-row gap-2">
        <img
          src={
            value?.profilePicture
              ? `${URL}/bloggerNet/post/image/${value?.author?.profilePicture}`
              : isModeDark
              ? Profile_White
              : Profile_Black
          }
          alt={`Profile image for ${value?.author?.username}`}
          className="p-[2px] h-8 w-8 rounded-full object-cover"
        />
        <p className="bold text-xl opacity-80">{value?.author?.username}</p>
        <p className="text-xs opacity-50 flex items-center">
          {formatDistanceToNow(new Date(value?.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <img
        src={`${URL}/bloggerNet/post/image/${value?.mediaUrl}`}
        alt={`Post image for ${value?._id}`}
        className="w-full h-auto object-cover"
      />
      <div className="p-2 h-full flex flex-col border-b-2 border-[#f0f0f0] dark:border-[#222222]">
        {showFullContent[value?._id] ? (
          <DisplayQuillContent deltaData={JSON.parse(value?.content)} />
        ) : (
          <p className="text-xl font-bold">
            {extractFirstLine(JSON.parse(value?.content))}
          </p>
        )}
        <div>
          <button
            onClick={() => toggleContent(value?._id)}
            className=" text-blue-500 hover:text-blue-600 my-3"
          >
            {showFullContent[value?._id] ? "Show Less" : "Read More"}
          </button>
        </div>
        <div className="grid grid-cols-2 w-full">
          <div className="flex gap-4">
            <LikeComponent value={value} />
            <button
              className="flex items-center gap-1 hover:scale-105 duration-300 focus:scale-110"
              onClick={handleComments}
            >
              <img
                src={isModeDark ? Comment_White : Comment_Black}
                alt={`Like`}
                className="h-8 w-8 object-cover"
              />
              <p className="text-md">{value?.comments.length}</p>
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
