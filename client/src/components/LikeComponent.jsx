import React, { useState } from "react";
import Like_Black from "../assets/Like_Black.svg";
import Like_White from "../assets/Like_White.svg";
import Like_Red from "../assets/Like_Red.svg";
import { useMode } from "../context/modeContext";
import { likePostApi } from "../api/postApi";
import { getCookie } from "../util/cookieUtil";
import { useAuth } from "../context/authContext";
import NumberFormatter from "./NumberFormatter";

export default function LikeComponent({ value }) {
  const { useDetails } = useAuth();
  const { verifiedError } = useAuth();
  const { isModeDark } = useMode();
  const [isLiked, setIsLiked] = useState(value?.liked);
  const [likesCount, setLikesCount] = useState((value?.likes).length);
  const handleLikeClick = async () => {
    const token = getCookie("authToken");
    if (!isLiked) {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      await likePostApi(token, value?._id, true);
    } else {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
      await likePostApi(token, value?._id, false);
    }
  };
  const handleUserClick = async () => {
    const token = getCookie("authToken");
    if (!isLiked) {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      await likePostApi(token, value?._id, true);
    } else {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
      await likePostApi(token, value?._id, false);
    }
  };
  return (
    <div className="flex items-center gap-1 ">
      <button
        disabled={verifiedError}
        className="flex items-center gap-1 hover:scale-105 duration-300 focus:scale-110 disabled:opacity-50 disabled:hover:scale-100 disabled:focus:scale-100"
        onClick={handleLikeClick}
      >
        <img
          src={isLiked ? Like_Red : isModeDark ? Like_White : Like_Black}
          alt={`Like`}
          className="h-8 w-8 object-cover"
        />
      </button>
      <button
        disabled={verifiedError}
        className="hover:scale-105 duration-300 focus:scale-110 disabled:opacity-50 disabled:hover:scale-100 disabled:focus:scale-100"
        onClick={handleUserClick}
      >
        <NumberFormatter number={likesCount} />
      </button>
    </div>
  );
}
