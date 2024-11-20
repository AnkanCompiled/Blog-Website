import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { verifyOTP } from "../api/userApi";
import { setCookie } from "../util/cookieUtil";
import { generateOTP } from "../api/userApi";

export default function OTPComponent(props) {
  const [resend, setResend] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    resendTimer();
  });

  function resendTimer() {
    setTimeout(() => {
      setResend(true);
      console.log("timer");
    }, 60000);
  }

  async function createOTP() {
    await generateOTP(props.userEmail);
    return;
  }

  async function otpVerification(data) {
    const result = await verifyOTP(props.userEmail, data.otp);
    return result;
  }

  const onSubmit = async (data) => {
    const result = await otpVerification(data);
    console.log(result);
    switch (result.success) {
      case true:
        setCookie("user", props.userData, 7, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        setTimeout(() => {
          window.location.reload();
        }, 200);
        break;
      case false:
        setError("otpError", {
          type: "manual",
          message: result.message,
        });
        break;
    }
  };

  return (
    <div className="absolute flex items-center justify-center h-full w-full bg-black bg-opacity-20 z-20">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("otp", {
              required: "OTP is required",
            })}
            maxLength="6"
            className="w-20 h-10 text-center text-lg border-2 border-gray-300 rounded-md focus:border-black focus:outline-none my-4"
            id="otp"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-300 text-white font-semibold rounded-md hover:bg-red-400 transition duration-200"
          >
            Verify OTP
          </button>
        </form>
        {errors.otpError && (
          <p className="form-error">{errors.otpError.message}</p>
        )}
        {resend ? (
          <button
            className="py-2 text-blue-900"
            onClick={() => {
              createOTP();
              setResend(false);
              resendTimer();
            }}
          >
            resend OTP
          </button>
        ) : (
          <p className="py-2 text-red-300">wait 1 min to resend OTP...</p>
        )}
      </div>
    </div>
  );
}
