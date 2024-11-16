import React, { useEffect, useState } from "react";
import {
  FormEmailComponent,
  FormErrorComponent,
  FormNameComponent,
  FormPasswordComponent,
} from "./FormInputComponent";
import { useForm } from "react-hook-form";
import GoogleLoginComponent from "./GoogleLoginComponent";
import Cancel_Icon from "../assets/Cancel_Icon.svg";

export default function RegisterComponent(props) {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility((prev) => !prev);
  }, [props.visible]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCrossClick = (e) => {
    setVisibility(false);
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div
      className={
        isVisible
          ? "flex justify-center bg-black bg-opacity-30  w-screen h-screen fixed shadow-md"
          : "opacity-0 fixed"
      }
    >
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

        <form
          className="grid justify-center text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="form-header text-2xl">Join Us</h1>
          <h1 className="form-header text-xl">Create a BloggerNet account</h1>
          <FormNameComponent register={register} value="name" />
          <FormErrorComponent errors={errors.name} />

          <FormEmailComponent register={register} value="registerEmail" />
          <FormErrorComponent errors={errors.registerEmail} />

          <FormPasswordComponent register={register} value="registerPassword" />
          <FormErrorComponent errors={errors.registerPassword} />

          <button type="submit" className="form-button">
            <span className="font-medium">Sign Up</span>
          </button>
        </form>
        <hr className="border-t border-gray-400 my-4"></hr>
        <GoogleLoginComponent />
      </div>
    </div>
  );
}
