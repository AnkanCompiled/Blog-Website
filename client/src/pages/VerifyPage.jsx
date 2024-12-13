import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLoadingComponent from "../components/PageLoadingComponent";
import { verifyUserApi } from "../api/accountApi";
import DarkModeComponent from "../components/DarkModeComponent";

export default function VerifyPage() {
  const { token } = useParams();
  const [verifyText, setVerifyText] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async (token) => {
    const result = await verifyUserApi(token);
    return result;
  };
  const verify = async (token) => {
    setLoading(true);
    const result = await verifyEmail(token);
    setLoading(false);
    switch (result) {
      case 200:
        setIsVerified(true);
        setVerifyText("Email has been verified");
        break;
      case 409:
        setIsVerified(false);
        setVerifyText("Email already been verified");
        break;
      default:
        setVerifyText("Unexpected error occurred");
    }
  };
  useEffect(() => {
    document.title = "Verify";
    verify(token);
  }, [token]);
  return (
    <div className="main_screen overflow-x-hidden">
      <div className="w-screen flex justify-end">
        <DarkModeComponent />
      </div>

      {loading ? (
        <PageLoadingComponent />
      ) : (
        <div className="text-center m-10 w-full">
          <h1
            className={`text-5xl font-bold ${
              isVerified ? "text-green-400" : "text-red-400"
            }`}
          >
            {verifyText}
          </h1>
        </div>
      )}
    </div>
  );
}
