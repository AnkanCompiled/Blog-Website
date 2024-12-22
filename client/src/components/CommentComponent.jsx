import React, { useEffect, useRef, useState } from "react";
import EmailVerifiedComponent from "./EmailVerifiedComponent";
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
import { getCookie } from "../util/cookieUtil";
import { formatDistanceToNow } from "date-fns";
import { fetchCommentsApi, uploadCommentApi } from "../api/postApi";
import PageLoadingComponent from "./PageLoadingComponent";
import { useAuth } from "../context/authContext";

export default function CommentComponent({ value, handleComments }) {
  const { isModeDark } = useMode();
  const { verifiedError, notVerified } = useAuth();
  const hasFetched = useRef(false);
  const [boxAnimate, setBoxAnimate] = useState(undefined);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  const getComments = async () => {
    setLoading(true);
    const token = getCookie("authToken");
    const result = (await fetchCommentsApi(token, value?._id)) || [];
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
    const token = getCookie("authToken");
    const result = await uploadCommentApi(token, value?._id, newComment);
    switch (result) {
      case 401:
        setNewComment("");
        notVerified();
        return;
      case 500:
        setNewComment("");
        notVerified();
        return;
      default:
        setCommentData((prev) => [result, ...prev]);
        setNewComment("");
    }
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
        <div className="grid gap-1 pr-2 overflow-y-auto  overflow-x-hidden max-h-[80%]">
          {loading ? (
            <PageLoadingComponent background={false} />
          ) : commentData.length > 0 ? (
            commentData.map((item) => (
              <div
                key={item?._id}
                className="flex flex-col w-full text-gray-800 dark:text-gray-200 justify-start"
              >
                <div className="my-1">
                  <div className="flex gap-2">
                    <img
                      src={
                        item?.user?.profilePicture
                          ? `${URL}/bloggerNet/post/image/${item?.user?.profilePicture}`
                          : isModeDark
                          ? Profile_White
                          : Profile_Black
                      }
                      alt={`Profile image for ${item?.user?.username}`}
                      className="p-[2px] h-7 w-7 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex gap-1">
                        <p className="text-sm">{item?.user?.username}</p>
                        <p className="text-sm opacity-50">
                          {formatDistanceToNow(new Date(item?.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <p className="text-lg">{item?.text}</p>
                    </div>

                    <button className="h-min w-minflex flex-col items-center justify-center text-center hover:scale-105 duration-300 focus:scale-110">
                      <img
                        src={isModeDark ? Like_White : Like_Black}
                        alt={`Like`}
                        className="h-5 w-5 object-cover"
                      />
                      <p className="text-md w-full">{item.likes}</p>
                    </button>
                  </div>
                  <div className="mx-9">
                    {item?.replies.length > 0 ? (
                      <div className="flex gap-1">
                        <button className="w-min text-opacity-80">
                          show replies
                        </button>
                        <button className="w-min text-blue-400 hover:text-blue-500">
                          reply
                        </button>
                      </div>
                    ) : (
                      <button className="w-min text-blue-400 hover:text-blue-500">
                        reply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-800 dark:text-gray-200 text-2xl">
              No comment posted...
            </p>
          )}
        </div>
        <div className="w-full flex items-center fixed bottom-16 left-0 px-5 py-3 dark:bg-[#111111] bg-gray-300 rounded-xl">
          <div className="flex items-center w-full px-2 py-1 rounded-md bg-gray-100 dark:bg-[#333333]">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              placeholder="Add a comment..."
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
