import React, { useEffect, useState, useRef } from "react";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import { fetchPostApi } from "../api/postApi";
import { getCookie } from "../util/cookieUtil";
import DisplayQuillContent from "../components/DisplayQuillComponent";
import PageLoadingComponent from "../components/PageLoadingComponent";
import Profile_Black from "../assets/Profile_Black.svg";
import Profile_White from "../assets/Profile_White.svg";
import Like_Black from "../assets/Like_Black.svg";
import Like_White from "../assets/Like_White.svg";
import Comment_Black from "../assets/Comment_Black.svg";
import Comment_White from "../assets/Comment_White.svg";
import Bookmark_Black from "../assets/Bookmark_Black.svg";
import Bookmark_White from "../assets/Bookmark_White.svg";
import { useMode } from "../context/modeContext";
const URL = import.meta.env.VITE_BACKEND_URL;

export default function HomePage() {
  const [postData, setPostData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [showFullContent, setShowFullContent] = useState([]);
  const hasFetched = useRef(false);
  const { isModeDark } = useMode();

  const getPost = async () => {
    const token = getCookie("authToken");
    const result = await fetchPostApi(token);
    setPostData((prev) => [...prev, ...result]);

    setImageUrls((prev) => {
      const updatedImageUrls = { ...prev };
      result.forEach((value) => {
        updatedImageUrls[
          value?.post?._id
        ] = `${URL}/bloggerNet/post/image/${value?.post?.mediaUrl}`;
        value?.profilePicture &&
          (updatedImageUrls[
            value?.username
          ] = `${URL}/bloggerNet/post/image/${value?.profilePicture}`);
      });
      return updatedImageUrls;
    });
  };

  useEffect(() => {
    document.title = "BloggerNet";
    if (!hasFetched.current) {
      getPost();
      hasFetched.current = true;
    }
  }, []);

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
    <div className="main_screen">
      <div className="fixed z-[12] w-screen dark:bg-[#111111] bg-gray-300">
        <NavbarComponent />
      </div>
      <div className="h-20 "></div>
      <div className="grid justify-items-center gap-4">
        {postData.length > 0 ? (
          postData.map((value) => (
            <div
              key={value?.post?._id}
              className="flex flex-col rounded-md md:max-w-[60vw] xl:max-w-[40vw] shadow-lg text-gray-800 dark:text-gray-200"
            >
              <div className="flex gap-2">
                <img
                  src={
                    imageUrls[value?.username]
                      ? imageUrls[value?.username]
                      : isModeDark
                      ? Profile_White
                      : Profile_Black
                  }
                  alt={`Profile image for ${value?.username}`}
                  className="p-[2px] h-8 w-8 rounded-full object-cover"
                />
                <p className="bold text-xl opacity-80">{value?.username}</p>
              </div>
              {imageUrls[value?.post?._id] ? (
                <img
                  src={imageUrls[value?.post?._id]}
                  alt={`Post image for ${value?.post?._id}`}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <PageLoadingComponent />
              )}
              <div className="p-2 h-full flex flex-col border-b-2 border-[#f0f0f0] dark:border-[#222222]">
                {showFullContent[value?.post?._id] ? (
                  <DisplayQuillContent
                    deltaData={JSON.parse(value?.post?.content)}
                  />
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
                    {showFullContent[value?.post?._id]
                      ? "Show Less"
                      : "Read More"}
                  </button>
                </div>
                <div className="grid grid-cols-2 w-full">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 hover:scale-105 duration-300">
                      <img
                        src={isModeDark ? Like_White : Like_Black}
                        alt={`Like`}
                        className="h-8 w-8 object-cover"
                      />
                      <p className="text-md">{(value?.post?.likes).length}</p>
                    </button>
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
                  <button></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800 dark:text-gray-200 text-2xl">
            No posts available.
          </p>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}
