import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import PageLoadingComponent from "../components/PageLoadingComponent";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import { fetchPostApi } from "../api/postApi";
import { getCookie } from "../util/cookieUtil";
import LoadingComponent from "../components/LoadingComponent";
import { useAuth } from "../context/authContext";
import EmailVerifiedComponent from "../components/EmailVerifiedComponent";
const PostComponent = lazy(() => import("../components/PostComponent"));

export default function HomePage() {
  const { verifiedError } = useAuth();
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  const getPost = async () => {
    setLoading(true);
    const token = getCookie("authToken");
    const result = (await fetchPostApi(token, postData.length)) || [];
    console.log("Result", result);
    setPostData((prev) => [...prev, ...result]);
    setLoading(false);
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
      <div className="h-16 ">{verifiedError && <EmailVerifiedComponent />}</div>
      <div className="grid xl:grid-cols-2 justify-items-center gap-y-4 xl:gap-y-10">
        {postData.length > 0 ? (
          postData.map((value) => (
            <div key={value?._id}>
              <div className="flex flex-col rounded-md md:w-[60vw] xl:w-[40vw] shadow-lg text-gray-800 dark:text-gray-200">
                <Suspense
                  fallback={
                    <div className="w-full py-40 my-4">
                      <PageLoadingComponent background={false} />
                    </div>
                  }
                >
                  <PostComponent value={value} />
                </Suspense>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800 dark:text-gray-200 text-2xl">
            No posts available.
          </p>
        )}
      </div>
      <div className="p-10 w-full flex-1 flex items-start justify-center">
        {loading ? (
          <LoadingComponent />
        ) : (
          <button
            className="w-full md:w-[60vw] xl:w-[40vw] shadow-lg py-2 bg-gray-600 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:dark:bg-gray-900 transition duration-200"
            onClick={getPost}
          >
            <p>Load More Post</p>
          </button>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}
