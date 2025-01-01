import React, { useCallback, useEffect, useRef, useState } from "react";
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
  fetchRepliesApi,
  likeCommentApi,
  uploadCommentApi,
  uploadReplyApi,
} from "../api/commentApi";
import PageLoadingComponent from "./PageLoadingComponent";
import NumberFormatter from "./NumberFormatter";
import { useAuth } from "../context/authContext";

export default function CommentComponent({ value, handleComments }) {
  const { isModeDark } = useMode();
  const { userDetails } = useAuth();
  const hasFetched = useRef(false);
  const [boxAnimate, setBoxAnimate] = useState(undefined);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [replyTo, setReplyTo] = useState("");

  const getComments = async () => {
    setLoading(true);
    const result = (await fetchCommentsApi(userDetails?._id, value?._id)) || [];
    console.log("comments", result);
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
    const result = isReply
      ? await uploadReplyApi(userDetails, isReply, newComment.trim())
      : await uploadCommentApi(userDetails, value?._id, newComment.trim());
    switch (result) {
      case 401:
        setNewComment("");
        return;
      case 500:
        setNewComment("");
        return;
      default:
        if (isReply) {
          setIsReply(false);
        } else {
          setCommentData((prev) => [result, ...prev]);
        }
        setNewComment("");
    }
  };

  const handleReplyChange = (commentId, user) => {
    setIsReply(commentId);
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
                // replyData={replyData[item?._id]}
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
  const [isLiked, setIsLiked] = useState(item?.liked || false);
  const [likesCount, setLikesCount] = useState(item?.likes?.length || 0);
  const [replyCount, setReplyCount] = useState(item?.replies?.length || 0);
  const [replyData, setReplyData] = useState([]);
  const [showReply, setShowReply] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLiked(item?.liked || false);
    setLikesCount(item?.likes?.length || 0);
    setReplyCount(item?.replies?.length || 0);
  }, [item]);

  const getReplies = async (commentId) => {
    if (replyData.length > 0) return;
    setLoading(true);
    const result = (await fetchRepliesApi(userDetails?._id, commentId)) || [];
    setReplyData(result);
    setLoading(false);
  };

  const toggleReplies = async () => {
    if (!showReply) {
      await getReplies(item?._id);
    }
    setShowReply((prev) => !prev);
  };

  const handleLikeClick = useCallback(async () => {
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
    await likeCommentApi(userDetails?._id, item?._id, !isLiked);
  }, [isLiked, userDetails, item]);

  const likeIcon = isLiked ? Like_Red : isModeDark ? Like_White : Like_Black;

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
          alt={`Profile image for ${item?.user?.username || "User"}`}
          className="p-[2px] h-7 w-7 rounded-full object-cover mr-1"
        />
        <p className="text-sm font-semibold">{item?.user?.username}</p>
        <p className="text-xs opacity-40 flex items-center">
          {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="grid grid-cols-[10fr_1fr] gap-x-1 justify-start">
        <div>
          <p className="text-lg break-words">{item?.text}</p>
          <button
            onClick={() => handleReplyChange(item?._id, item?.user?.username)}
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
            src={likeIcon}
            alt="Like"
            className="h-5 w-5 mx-auto object-cover"
          />
          <NumberFormatter number={likesCount} />
        </button>
        <div className="flex flex-col w-full">
          {showReply && (
            <div className="ml-4 mt-2 grid gap-1">
              {loading ? (
                <PageLoadingComponent background={false} screen={false} />
              ) : (
                replyData.map((data) => <ReplyMap key={data._id} data={data} />)
              )}
            </div>
          )}
          {replyCount > 0 && (
            <button
              onClick={toggleReplies}
              className="flex justify-center gap-1 opacity-60 text-sm"
            >
              {showReply ? (
                `Hide ${replyCount > 1 ? "replies" : "reply"}`
              ) : (
                <>
                  View <NumberFormatter number={replyCount} />{" "}
                  {replyCount > 1 ? "replies" : "reply"}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function ReplyMap({ data }) {
  const { isModeDark } = useMode();
  const [isLiked, setIsLiked] = useState(data?.liked || false);
  const [likesCount, setLikesCount] = useState(data?.likes?.length || 0);
  const likeIcon = isLiked ? Like_Red : isModeDark ? Like_White : Like_Black;
  return (
    <>
      <div className="flex gap-1 items-center">
        <img
          src={
            data?.user?.profilePicture
              ? `${URL}/bloggerNet/post/image/${data?.user?.profilePicture}`
              : isModeDark
              ? Profile_White
              : Profile_Black
          }
          alt={`Profile image for ${data?.user?.username || "User"}`}
          className="p-[2px] h-6 w-6 rounded-full object-cover mr-1"
        />
        <p className="text-sm opacity-70 font-semibold">
          {data?.user?.username}
        </p>
        <p className="text-xs opacity-40 flex items-center">
          {formatDistanceToNow(new Date(data?.createdAt), { addSuffix: true })}
        </p>
      </div>
      <div className="grid grid-cols-[10fr_1fr] gap-x-1 justify-start">
        {" "}
        <p className="text-base break-words">{data?.text}</p>
        <button
          className="m-auto grid grid-cols-2 justify-center hover:scale-105 duration-300 focus:scale-110 text-center"
          //onClick={handleLikeClick}
        >
          <img
            src={likeIcon}
            alt="Like"
            className="h-5 w-5 mx-auto object-cover"
          />
          <NumberFormatter number={likesCount} />
        </button>
      </div>
    </>
  );
}
