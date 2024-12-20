import React, { useEffect, useState, useRef } from "react";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import { fetchPostApi } from "../api/postApi";
import { getCookie } from "../util/cookieUtil";
import PostComponent from "../components/PostComponent";
const URL = import.meta.env.VITE_BACKEND_URL;

export default function HomePage() {
  const [postData, setPostData] = useState([]);

  const hasFetched = useRef(false);

  const getPost = async () => {
    const token = getCookie("authToken");
    const result = (await fetchPostApi(token)) || [];
    setPostData((prev) => [...prev, ...result]);
  };

  useEffect(() => {
    document.title = "BloggerNet";
    if (!hasFetched.current) {
      getPost();
      hasFetched.current = true;
    }
  }, []);

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
              <PostComponent value={value} />
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
