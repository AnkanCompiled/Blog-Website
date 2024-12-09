import React, { useEffect, useState } from "react";
import { getUser } from "../api/accountApi";
import { getCookie } from "../util/cookieUtil";
import EmailVerifiedComponent from "./EmailVerifiedComponent";

export default function AccountComponent() {
  const [isVerified, setVerifiedError] = useState(false);
  const userInfo = async () => {
    const token = getCookie("authToken");
    const result = await getUser(token);
    console.log(result);
  };
  useEffect(() => {
    userInfo();
  }, []);
  return (
    <>
      <EmailVerifiedComponent buttonProp={false} />
      <div>Account</div>
    </>
  );
}
