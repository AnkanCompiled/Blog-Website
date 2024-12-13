import React, { useEffect, useState } from "react";
import { getUserApi, verifySendEmailApi } from "../api/accountApi";
import { getCookie } from "../util/cookieUtil";
import EmailVerifiedComponent from "./EmailVerifiedComponent";
import LoadingComponent from "./LoadingComponent";
import { useAuth } from "../context/authContext";

export default function AccountComponent() {
  const { logout } = useAuth();
  const [verifiedError, setVerifiedError] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [verifyText, setVerifyText] = useState("");
  const [loading, setLoading] = useState(false);
  const userInfo = async () => {
    const token = getCookie("authToken");
    const result = await getUserApi(token);
    setUserDetails(result);
    if (!result?.verified) {
      setVerifiedError(true);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);

  const handleLogoutButton = async (event) => {
    logout();
  };

  const handleVerifyButton = async (event) => {
    setLoading(true);
    const token = getCookie("authToken");
    const result = await verifySendEmailApi(token);
    console.log(result);
    setLoading(false);
    console.log(result);
    switch (result) {
      case 200:
        setVerifyText(
          "Verification mail has been sent. Please Logout and Login after verification"
        );
        break;
      default:
        setVerifyText("Unexpected error occurred");
    }
  };

  return (
    <>
      {verifiedError && (
        <>
          <EmailVerifiedComponent buttonProp={false} />
          <div className="dark:bg-gray-600 bg-gray-300 p-2 rounded-sm mb-3 grid grid-cols-2 items-center min-h-16">
            <div className="dark:text-gray-100 text-gray-800 sm:text-xl mx-3 sm:mx-10 font-semibold">
              Verify Email
            </div>
            {loading ? (
              <LoadingComponent />
            ) : (
              <button
                onClick={handleVerifyButton}
                className="py-2 px-8 sm:px-20 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200"
              >
                Verify
              </button>
            )}
          </div>
          <p className="dark:text-red-100 text-red-950 sm:text-md">
            {verifyText}
          </p>
        </>
      )}
      <div>
        <h3 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
          Username: Guest_{userDetails?.data?.id}
        </h3>
        <button
          onClick={handleLogoutButton}
          className="my-2 py-2 w-full sm:w-[20vw] px-8 sm:px-20 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition duration-200"
        >
          Logout
        </button>
      </div>
    </>
  );
}
