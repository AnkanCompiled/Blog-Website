import { useState, useEffect } from "react";
import { NoUserNavComponent } from "../components/NavbarComponent";
import OTPComponent from "../components/OTPComponent";

export default function LandingPage() {
  useEffect(() => {
    document.title = "BloggerNet";
  });
  const [clickbtn, setClickbtn] = useState(false);
  const signUpBtn = (
    <button
      className="hidden xl:inline w-40 h-16 bg-red-300 text-white text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:translate-y-1 hover:bg-red-400 z-10"
      onClick={() => {
        setClickbtn((prev) => !prev);
      }}
    >
      Create Your Blog
    </button>
  );
  return (
    <>
      <NoUserNavComponent clickbtn={clickbtn} />
      <div className="w-full h-[600px] bg-red-100 grid grid-rows-2 gap-40 px-3 sm:px-32 py-44">
        <div className="grid justify-left">
          <h1 className="text-gray-700 text-3xl sm:text-4xl md:text-5xl my-3 font-bold">
            Discover insightful blogs crafted to inspire, inform, and spark
            curiosity.
          </h1>
          <h1 className="text-gray-700 text-xl sm:text-3xl font-semibold">
            Dive into diverse topics, from tech to lifestyle, and explore a
            world of engaging ideas.
          </h1>
        </div>
        <div className="flex justify-center">{signUpBtn}</div>
      </div>
      <div className="w-full h-[600px] bg-orange-200 grid grid-rows-2 gap-40 px-3 sm:px-20 py-20">
        <div className="grid justify-center">
          <h1 className="text-center text-gray-700 text-3xl sm:text-4xl my-3 font-bold">
            Be a Blogger
          </h1>
          <p className="text-center text-gray-700 text-xl sm:text-3xl font-semibold">
            "Share your thoughts, insights, or breaking news — whatever inspires
            you. Join BloggerNet and connect with a community of like-minded
            creators. Sign up now to begin yourblog journey!
          </p>
        </div>
        <div className="flex justify-center">{signUpBtn}</div>
      </div>
    </>
  );
}
