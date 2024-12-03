import React, { useState } from "react";
import { useForm } from "react-hook-form";
import VisibilityOnIcon from "../assets/VisibilityOnIcon.svg";
import VisibilityOffIcon from "../assets/VisibilityOffIcon.svg";
import LoadingComponent from "./LoadingComponent";

export default function LoginRegisterComponent() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async (data) => {};

  const onSubmit = async (data) => {
    setLoading(true);
    if (isLogin) {
      console.log("Login Data:", data);
    } else {
      console.log("Register Data:", data);
      await registerUser(data);
    }
  };

  return (
    <div className="max-w-md m-auto mt-10 bg-gray-200 dark:bg-gray-700  p-8 sm:rounded-lg shadow-xl">
      <h2 className="text-2xl text-left text-gray-800 dark:text-white mb-6">
        {isLogin ? (
          <>
            <p className="font-semibold">Welcome Back!</p>
            <p>Login to your account</p>
          </>
        ) : (
          <>
            <p className="font-semibold">Join us</p>
            <p>Create a BloggerNet account</p>
          </>
        )}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className={`block text-gray-600 dark:text-gray-300 mb-1`}>
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`login_input ${
              errors.email ? "ring-1 ring-red-400" : "ring-0"
            }`}
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className={`login_input ${
              errors.password ? "ring-1 ring-red-400" : "ring-0"
            }`}
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-600 dark:text-gray-100"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <img src={VisibilityOnIcon} alt="Visible" />
            ) : (
              <img src={VisibilityOffIcon} alt="Not Visible" />
            )}
          </span>
        </div>

        {/* Confirm Password (Register Only) */}
        {!isLogin && (
          <div className="relative">
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Confirm Password:
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (value, data) =>
                  value === data.password || "Passwords must match",
              })}
              className={`login_input ${
                errors.confirmPassword ? "ring-1 ring-red-400" : "ring-0"
              }`}
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600 dark:text-gray-100"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <img src={VisibilityOnIcon} alt="Visible" />
              ) : (
                <img src={VisibilityOffIcon} alt="Not Visible" />
              )}
            </span>
          </div>
        )}
        <div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          )}
        </div>
      </form>
      <p className="text-center dark:text-white mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 dark:text-blue-200 hover:underline focus:outline-none"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
