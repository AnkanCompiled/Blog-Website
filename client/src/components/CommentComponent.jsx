import React, { useEffect, useRef, useState } from "react";
import {
  fetchCommentsApi,
  fetchRepliesApi,
  likeCommentApi,
  uploadCommentApi,
  uploadReplyApi,
} from "../api/commentApi";
import { useMode } from "../context/modeContext";
import { useAuth } from "../context/authContext";
import { formatDistanceToNow } from "date-fns";
import CommentLoadingComponent from "./CommentLoadingComponent";
import Cross_Black from "../assets/Cross_Black.svg";
import Cross_White from "../assets/Cross_White.svg";
import Like_Black from "../assets/Like_Black.svg";
import Like_White from "../assets/Like_White.svg";
import Like_Red from "../assets/Like_Red.svg";
import Profile_Black from "../assets/Profile_Black.svg";
import Profile_White from "../assets/Profile_White.svg";
import Send_Black from "../assets/Send_Black.svg";
import Send_White from "../assets/Send_White.svg";
import NumberFormatter from "./NumberFormatter";

export default function CommentComponent({ value }) {
  const isModeDark = useMode();
  const { userDetails } = useAuth();
  const hasFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [replyTo, setReplyTo] = useState("");

  useEffect(() => {
    if (!hasFetched.current) {
      getComments();
      hasFetched.current = true;
    }
  }, []);

  const getComments = async () => {
    setLoading(true);
    const result = (await fetchCommentsApi(userDetails?._id, value?._id)) || [];
    console.log("comments", result);
    setCommentData(result);
    setLoading(false);
  };

  const handleReplyChange = (commentId, user) => {
    setIsReply(commentId);
    setReplyTo(user);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;
    const result = isReply
      ? await uploadReplyApi(userDetails, isReply, newComment.trim())
      : await uploadCommentApi(userDetails, value?._id, newComment.trim());
    console.log("result", result);
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
          setCommentData((prev) =>
            Array.isArray(prev) ? [result, ...prev] : [result]
          );
        }
        setNewComment("");
    }
  };

  return loading ? (
    <CommentLoadingComponent />
  ) : (
    <div className="flex flex-col gap-3 w-full overflow-y-auto max-h-full">
      {commentData.length > 0 ? (
        <>
          {commentData.map((comment) => (
            <CommentMap
              comment={comment}
              isModeDark={isModeDark}
              handleReplyChange={handleReplyChange}
              key={comment?._id}
            />
          ))}
          <div className="w-full h-10"></div>
        </>
      ) : (
        <p className="text-left opacity-60 text-2xl">
          Be the first to share your thoughts...!
        </p>
      )}
      <div className="w-full fixed bottom-0 left-0 px-2 py-5 pointer-events-none">
        <div
          className={`z-[10] flex items-center w-full px-2 py-1 rounded-t-md bg-gray-200 dark:bg-[#222222] justify-end transition-all duration-300 ease-out ${
            isReply
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-full pointer-events-none"
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
        <form
          onSubmit={handleComment}
          className={`z-[12]  w-full max-h-10 flex items-center  px-2 bg-gray-100 dark:bg-[#333333] pointer-events-auto ${
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
          <button>
            <img
              className="w-8 h-8 hover:scale-105 duration-300"
              src={isModeDark ? Send_White : Send_Black}
              alt="Send"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

function CommentMap({ comment, isModeDark, handleReplyChange }) {
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyCount, setReplyCount] = useState(comment?.replies?.length || 0);
  const [replyData, setReplyData] = useState([]);

  const getReplies = async (commentId) => {
    if (replyData.length > 0) return;
    setLoading(true);
    const result = (await fetchRepliesApi(userDetails?._id, commentId)) || [];
    setReplyData(result);
    setLoading(false);
  };

  const toggleReplies = async () => {
    if (!showReply) {
      await getReplies(comment?._id);
    }
    setShowReply((prev) => !prev);
  };

  return (
    <>
      <CommentUi
        comment={comment}
        userDetails={userDetails}
        isModeDark={isModeDark}
        extraUi={
          <>
            <button
              onClick={() =>
                handleReplyChange(comment?._id, comment?.user?.username)
              }
              className="w-min text-sm opacity-40  hover:opacity-60 duration-150"
            >
              Reply
            </button>
          </>
        }
      />
      {showReply && (
        <div className="flex flex-col gap-1 pl-10">
          {loading ? (
            <CommentLoadingComponent />
          ) : (
            replyData.map((data) => (
              <CommentUi
                key={data?._id}
                comment={data}
                userDetails={userDetails}
                isModeDark={isModeDark}
              />
            ))
          )}
        </div>
      )}
      {replyCount > 0 && (
        <button
          onClick={toggleReplies}
          className=" w-full flex justify-center gap-1 opacity-60 text-sm"
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
    </>
  );
}

function CommentUi({ comment, userDetails, isModeDark, extraUi }) {
  const [isLiked, setIsLiked] = useState(comment?.liked || false);
  const [likesCount, setLikesCount] = useState(comment?.likes?.length || 0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLikeClick = async () => {
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
    await likeCommentApi(userDetails?._id, comment?._id, !isLiked, true);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText =
    comment?.text?.length > 90 ? comment?.text?.slice(0, 90) : comment?.text;

  const likeIcon = isLiked ? Like_Red : isModeDark ? Like_White : Like_Black;
  return (
    <div className="flex flex-row gap-2 w-full justify-start overflow-x-hidden">
      <img
        src={
          comment?.user?.profilePicture
            ? `${URL}/bloggerNet/post/image/${comment?.user?.profilePicture}`
            : isModeDark
            ? Profile_White
            : Profile_Black
        }
        className="h-8 w-8 rounded-full"
      />
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm font-semibold">{comment?.user?.username}</p>
          <p className="text-xs opacity-40 flex comments-center">
            {formatDistanceToNow(new Date(comment?.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <p className="text-lg">
          {isExpanded ? comment?.text : truncatedText}
          {comment?.text?.length > 90 && (
            <button
              onClick={handleToggle}
              className="px-1 opacity-50 hover:opacity-70 duration-150"
            >
              {isExpanded ? "show less.." : "..show more"}
            </button>
          )}
        </p>
        {extraUi && <div>{extraUi}</div>}
      </div>
      <button
        className="m-auto text-xs grid grid-rows-2 justify-center hover:scale-105 duration-300 focus:scale-110 text-center"
        onClick={handleLikeClick}
      >
        <img
          src={likeIcon}
          alt="Like"
          className="h-5 w-5 mx-auto object-cover"
        />
        <NumberFormatter number={likesCount} />
      </button>
    </div>
  );
}
