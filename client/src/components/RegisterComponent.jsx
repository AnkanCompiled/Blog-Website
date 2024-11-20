import React, { useEffect, useState } from "react";
import {
  FormEmailComponent,
  FormErrorComponent,
  FormNameComponent,
  FormPasswordComponent,
} from "./FormInputComponent";
import { useForm } from "react-hook-form";
import { generateOTP, registerUser } from "../api/userApi";
import { setCookie } from "../util/cookieUtil";
import GoogleLoginComponent from "./GoogleLoginComponent";
import Cancel_Icon from "../assets/Cancel_Icon.svg";
import OTPComponent from "./OTPComponent";

export default function RegisterComponent(props) {
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
    formState: { errors },
    setError,
  } = useForm();

  const handleCrossClick = (e) => {
    setVisibility(false);
  };

  async function createOTP(email) {
    await generateOTP(email);
    return;
  }

  async function addUser(data) {
    const result = await registerUser(data);
    return result;
  }
  const onSubmit = async (data) => {
    await createOTP(data.registerEmail);
    const result = await addUser(data);
    switch (result) {
      case 409:
        setError("registerEmail", {
          type: "manual",
          message: "Email is already exists",
        });
        break;
      case 500:
        setError("registerEmail", {
          type: "manual",
          message: "An unexpected error occurred",
        });
        break;
      case undefined:
        setError("registerEmail", {
          type: "manual",
          message: "Server Down",
        });
        break;
      default:
        setEmail(data.registerEmail);
        setData(result);
        setOTPVisible(true);
    }
  };

  return (
    <div className={isVisible ? "form-screen" : "opacity-0 fixed"}>
      {otpVisible && <OTPComponent userEmail={userEmail} userData={userData} />}
      <div
        className={`form-box ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2/4 opacity-0"
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
          <h1 className="form-header text-2xl">Join Us</h1>
          <h1 className="form-header text-xl">Create a BloggerNet account</h1>
          <FormNameComponent register={register} value="registerName" />
          <FormErrorComponent errors={errors.registerName} />

          <FormEmailComponent register={register} value="registerEmail" />
          <FormErrorComponent errors={errors.registerEmail} />

          <FormPasswordComponent register={register} value="registerPassword" />
          <FormErrorComponent errors={errors.registerPassword} />

          <button type="submit" className="form-button">
            <span className="font-medium">Sign Up</span>
          </button>
        </form>
        <hr className="border-t border-gray-400 my-4"></hr>
        {/* <GoogleLoginComponent /> */}
      </div>
    </div>
  );
}
