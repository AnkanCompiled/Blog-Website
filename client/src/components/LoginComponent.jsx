import React, { useEffect, useState } from "react";
import {
  FormEmailComponent,
  FormErrorComponent,
  FormPasswordComponent,
} from "./FormInputComponent";
import { useForm } from "react-hook-form";
import { generateOTP, loginUser } from "../api/userApi";
import { setCookie } from "../util/cookieUtil";
import GoogleLoginComponent from "./GoogleLoginComponent";
import Cancel_Icon from "../assets/Cancel_Icon.svg";
import OTPComponent from "./OTPComponent";

export default function LoginComponent(props) {
  const [isVisible, setVisibility] = useState(false);
  const [otpVisible, setOTPVisible] = useState(false);
  const [userEmail, setEmail] = useState("");
  const [userData, setData] = useState("");

  useEffect(() => {
    setVisibility((prev) => !prev);
  }, [props.visible]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleCrossClick = (e) => {
    setVisibility(false);
  };

  async function createOTP(email) {
    await generateOTP(email);
    return;
  }

  async function logUser(data) {
    const result = await loginUser(data);
    return result;
  }

  const onSubmit = async (data) => {
    await createOTP(data.loginEmail);
    const result = await logUser(data);
    switch (result) {
      case 404:
        setError("loginEmail", {
          type: "manual",
          message: "Email does not exists",
        });
        break;

      case 401:
        setError("loginPassword", {
          type: "manual",
          message: "Password Incorrect",
        });
        break;
      case 500:
        setError("loginEmail", {
          type: "manual",
          message: "An unexpected error occurred",
        });
        break;
      case undefined:
        setError("loginEmail", {
          type: "manual",
          message: "Server Down",
        });
        break;
      default:
        setEmail(data.loginEmail);
        setData(result);
        setOTPVisible(true);
    }
  };

  return (
    <div className={isVisible ? "form-screen" : "opacity-0 fixed"}>
      {otpVisible && <OTPComponent userEmail={userEmail} userData={userData} />}
      <div
        className={`form-box ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-1/4 opacity-0"
        }`}
        style={{ transitionDuration: "0.5s" }}
      >
        <div className="grid justify-end">
          <button onClick={handleCrossClick}>
            <img
              src={Cancel_Icon}
              alt="Cancel"
              className="w-10 h-10 hover:scale-110"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form-header text-2xl">Welcome back!</h1>
          <h1 className="form-header text-xl">Login to your Account</h1>
          <FormEmailComponent register={register} value="loginEmail" />
          <FormErrorComponent errors={errors.loginEmail} />

          <FormPasswordComponent register={register} value="loginPassword" />
          <FormErrorComponent errors={errors.loginPassword} />

          <button type="submit" className="form-button">
            <span className="font-medium">Sign In</span>
          </button>
        </form>
        <hr className="border-t border-gray-400 my-4"></hr>
        {/* <GoogleLoginComponent /> */}
      </div>
    </div>
  );
}
