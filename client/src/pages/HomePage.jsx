import React, { useEffect, useState, useRef } from "react";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import { fetchPostApi } from "../api/postApi";
import { getCookie } from "../util/cookieUtil";
import DisplayQuillContent from "../components/DisplayQuillComponent";

export default function HomePage() {
  const [postData, setPostData] = useState([]);
  const hasFetched = useRef(false);

  const getPost = async () => {
    const token = getCookie("authToken");
    try {
      const result = await fetchPostApi(token);
      setPostData(result.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
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
      <NavbarComponent />
      <div className=" flex flex-col items-center justify-center">
        {postData.length > 0 ? (
          postData.map((post) => (
            <div
              key={post._id}
              className="p-4 m-2 lg:w-[60vw] shadow-lg  bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 "
            >
              <DisplayQuillContent deltaData={JSON.parse(post.content)} />
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}
