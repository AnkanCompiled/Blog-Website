import React, { useEffect, useState } from "react";
import { getUser } from "../api/accountApi";
import { getCookie } from "../util/cookieUtil";
import EmailVerifiedComponent from "./EmailVerifiedComponent";

export default function AccountComponent() {
  const [verifiedError, setVerifiedError] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const userInfo = async () => {
    const token = getCookie("authToken");
    const result = await getUser(token);
    setUserDetails(result);
    if (!result?.verified) {
      setVerifiedError(true);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);

  return (
    <>
      {verifiedError && (
        <>
          <EmailVerifiedComponent buttonProp={false} />
          <div className="dark:bg-gray-600 bg-gray-300 p-2 rounded-sm mb-3 flex justify-between items-center shadow-md">
            <div className="dark:text-gray-100 text-gray-800 sm:text-xl mx-3 sm:mx-10 font-semibold">
              Verify Email
            </div>
            <button className="py-2 px-8 sm:px-20 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200">
              Verify
            </button>
          </div>
        </>
      )}
      <div>
        <h3 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
          Username: Guest_{userDetails?.data?.id}
        </h3>
      </div>
    </>
  );
}
