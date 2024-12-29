import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { changeUserName, verifySendEmailApi } from "../api/accountApi";
import { getCookie } from "../util/cookieUtil";
import EmailVerifiedComponent from "./EmailVerifiedComponent";
import LoadingComponent from "./LoadingComponent";
import { useAuth } from "../context/authContext";
import PageLoadingComponent from "./PageLoadingComponent";

export default function AccountComponent() {
  const { logout, verifiedError, userDetails, userInfo } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [verifyText, setVerifyText] = useState("");
  const [changeUsernameVisibility, setChangeUsernameVisibility] =
    useState(false);

  const handleLogoutButton = async (event) => {
    logout();
  };

  const handleVerifyButton = async (event) => {
    setLoading(true);
    const token = getCookie("authToken");
    const result = await verifySendEmailApi(token);
    console.log(result);
    setLoading(false);
    switch (result) {
      case 200:
        setVerifyText(
          "Verification mail has been sent. Please refresh the page after verification"
        );
        break;
      default:
        setVerifyText("Unexpected error occurred");
    }
  };

  const onUsernameSubmit = async (data) => {
    setLoading(true);
    const token = getCookie("authToken");
    const result = await changeUserName(token, data.newUsername);
    switch (result) {
      case 200:
        await userInfo(token);
        setChangeUsernameVisibility(false);
        break;
      case 409:
        setError("newUsername", {
          type: "manual",
          message: "Username already exists",
        });
        break;
      default:
        setError("newUsername", {
          type: "manual",
          message: "Error occurred please refresh",
        });
    }
    setLoading(false);
  };

  function ChangeUsernameComponent() {
    return (
      <form
        onSubmit={handleSubmit(onUsernameSubmit)}
        className="grid gap-3 lg:min-w-[40vw] p-6 font-semibold bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-md overflow-hidden"
      >
        Change Username
        <input
          type="text"
          {...register("newUsername", {
            required: "Username cannot be empty",
            maxLength: {
              value: 15,
              message: "Username cannot be this long",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message:
                "Username should only contain Alphabets, Numbers, and Underscores",
            },
          })}
          className={`w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter new username"
        />
        {errors.newUsername && (
          <p className="login_error">{errors.newUsername.message}</p>
        )}
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="flex gap-8">
            <button
              type="submit"
              className="py-2 w-full bg-green-400 text-white rounded-sm hover:bg-green-500 transition duration-200"
            >
              Confirm
            </button>
            <button
              className="py-2 w-full bg-red-400 text-white rounded-sm hover:bg-red-500 transition duration-200"
              onClick={() => setChangeUsernameVisibility(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    );
  }

  return !userDetails ? (
    <PageLoadingComponent background={false} screen={false} />
  ) : (
    <>
      {verifiedError && (
        <>
          <EmailVerifiedComponent buttonProp={false} />
          <div className="dark:bg-gray-600 bg-gray-300 p-2 rounded-sm mb-3 grid grid-cols-2 items-center min-h-16">
            <div className="text-gray-800 dark:text-gray-200 sm:text-xl mx-3 sm:mx-10 font-semibold">
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
      <div className="flex flex-col h-full gap-4">
        <h3 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
          Username:
          {verifiedError
            ? ` Guest_${userDetails?.id}`
            : ` ${userDetails?.username}`}
        </h3>
        {!verifiedError && (
          <div className="lg:flex justify-start">
            {changeUsernameVisibility ? (
              <ChangeUsernameComponent />
            ) : (
              <button
                onClick={() => setChangeUsernameVisibility(true)}
                className="py-2 px-8 text-gray-800 dark:text-gray-200 border-2 border-gray-800 dark:border-gray-200 rounded-md shadow-xl"
              >
                Change Username
              </button>
            )}
          </div>
        )}

        <div className="flex justify-center my-10">
          <button
            onClick={handleLogoutButton}
            className="py-2 px-8 lg:px-20 w-full sm:w-[20vw] bg-red-800 text-white font-bold rounded-md shadow-xl hover:bg-red-900 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
