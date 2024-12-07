import React, { useEffect, useState } from "react";

export default function AccountComponent() {
  const [isVerified, setVerifiedError] = useState(false);
  const userInfo = async () => {};
  useEffect(() => {
    userInfo();
  }, []);
  return <div>AccountComponent</div>;
}
