import React, { useEffect, useRef, useState } from "react";
import Cross_Black from "../assets/Cross_Black.svg";
import Cross_White from "../assets/Cross_White.svg";
import Like_Black from "../assets/Like_Black.svg";
import Like_White from "../assets/Like_White.svg";
import Like_Red from "../assets/Like_Red.svg";
import Profile_Black from "../assets/Profile_Black.svg";
import Profile_White from "../assets/Profile_White.svg";
import Send_Black from "../assets/Send_Black.svg";
import Send_White from "../assets/Send_White.svg";
import { useMode } from "../context/modeContext";
import { formatDistanceToNow } from "date-fns";
import {
  fetchCommentsApi,
  likeCommentApi,
  uploadCommentApi,
} from "../api/commentApi";
import PageLoadingComponent from "./PageLoadingComponent";
import NumberFormatter from "./NumberFormatter";
import { useAuth } from "../context/authContext";

export default function CommentComponent({ value, handleComments }) {
  const { isModeDark } = useMode();
  const { userDetails } = useAuth();
  const hasFetched = useRef(false);
  const [boxAnimate, setBoxAnimate] = useState(undefined);
  const [replyAnimate, setReplyAnimate] = useState(undefined);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [replyTo, setReplyTo] = useState("");

  const getComments = async () => {
    setLoading(true);
    const result = (await fetchCommentsApi(userDetails?._id, value?._id)) || [];
    console.log("result", result);
    setCommentData(result);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setBoxAnimate(true);
    }, 100);
    if (!hasFetched.current) {
      getComments();
      hasFetched.current = true;
    }
  }, []);

  const handleComment = async () => {
    if (!newComment) return;
    if (isReply) {
    }
    const result = await uploadCommentApi(
      userDetails,
      value?._id,
      newComment.trim()
    );
    switch (result) {
      case 401:
        setNewComment("");
        return;
      case 500:
        setNewComment("");
        return;
      default:
        setCommentData((prev) => [result, ...prev]);
        setNewComment("");
    }
  };

  const handleReplyChange = (user) => {
    setIsReply(true);
    setReplyTo(user);
  };

  return (
    <div
      className={`z-[14] top-14 left-0 w-full h-full fixed bg-black flex justify-center pt-28 transition-opacity duration-500 ease-out ${
        boxAnimate ? "bg-opacity-20 dark:bg-opacity-50" : "bg-opacity-0"
      }`}
    >
      <div
        className={`w-full md:w-[70vw] xl:w-[50vw] h-full dark:bg-[#111111] bg-gray-300 p-5 rounded-t-xl transition-transform duration-500 ease-out ${
          boxAnimate ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              setBoxAnimate(false);
              handleComments();
            }}
          >
            <img src={isModeDark ? Cross_White : Cross_Black} alt="cross" />
          </button>
        </div>
        <div className="grid gap-1 overflow-y-auto  overflow-x-hidden max-h-[80%]">
          {loading ? (
            <PageLoadingComponent background={false} screen={false} />
          ) : commentData.length > 0 ? (
            commentData.map((item) => (
              <CommentMap
                item={item}
                handleReplyChange={handleReplyChange}
                key={item?._id}
                className="flex flex-col mb-5 w-full text-gray-800 dark:text-gray-200 justify-start"
              />
            ))
          ) : (
            <p className="text-center text-gray-800 dark:text-gray-200 text-2xl">
              No comment posted...
            </p>
          )}
        </div>
        <div className="w-full flex flex-col items-center fixed bottom-16 left-0 px-5 py-3 dark:bg-[#111111] bg-gray-300 ">
          <div
            className={`z-[10] flex items-center w-full px-2 py-1 rounded-t-md bg-gray-100 dark:bg-[#333333] justify-end transition-all duration-300 ease-out ${
              isReply
                ? "opacity-60 translate-y-0"
                : "opacity-0 translate-y-10 pointer-events-none"
            }`}
          >
            <p className="flex-1 px-3">Replying to {replyTo}</p>
            <button
              onClick={() => {
                setIsReply(false);
              }}
            >
              <img src={isModeDark ? Cross_White : Cross_Black} alt="cross" />
            </button>
          </div>

          <div
            className={`z-[11] flex items-center w-full px-2 py-1 bg-gray-100 dark:bg-[#333333] ${
              isReply ? "rounded-b-md" : "rounded-md"
            }`}
          >
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              placeholder="Write a comment..."
              className="bg-gray-100 dark:bg-[#333333] border-none focus:ring-0 w-full"
            />
            <button onClick={handleComment}>
              <img
                className="w-8 h-8"
                src={isModeDark ? Send_White : Send_Black}
                alt="Send"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentMap({ item, handleReplyChange }) {
  const { userDetails } = useAuth();
  const { isModeDark } = useMode();
  const [isLiked, setIsLiked] = useState(item?.liked);
  const [likesCount, setLikesCount] = useState((item?.likes).length || 0);
  const handleLikeClick = async () => {
    if (!isLiked) {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      await likeCommentApi(userDetails?._id, item?._id, true);
    } else {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
      await likeCommentApi(userDetails?._id, item?._id, false);
    }
  };
  return (
    <>
      <div className="flex gap-2 items-center">
        <img
          src={
            item?.user?.profilePicture
              ? `${URL}/bloggerNet/post/image/${item?.user?.profilePicture}`
              : isModeDark
              ? Profile_White
              : Profile_Black
          }
          alt={`Profile image for ${item?.user?.username}`}
          className="p-[2px] h-7 w-7 rounded-full object-cover mr-1"
        />
        <p className="text-sm font-semibold">{item?.user?.username}</p>
        <p className="text-xs opacity-40 flex items-center">
          {formatDistanceToNow(new Date(item?.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="grid grid-cols-[10fr_1fr] gap-x-1 justify-start">
        <div>
          <p className="text-lg break-words">{item?.text}</p>
          <button
            onClick={() => handleReplyChange(item?.user?.username)}
            className="text-sm text-left opacity-50 hover:opacity-70 duration-150"
          >
            Reply
          </button>
        </div>
        <button
          className="m-auto grid grid-rows-2 justify-center hover:scale-105 duration-300 focus:scale-110 text-center"
          onClick={handleLikeClick}
        >
          <img
            src={isLiked ? Like_Red : isModeDark ? Like_White : Like_Black}
            alt={`Like`}
            className="h-5 w-5 mx-auto object-cover"
          />
          <NumberFormatter number={likesCount} />
        </button>

        {item?.replies.length > 0 && (
          <button className="w-full text-opacity-80">view replies..</button>
        )}
      </div>
    </>
  );
}
