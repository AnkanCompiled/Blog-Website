import React, { useState } from "react";
import { useForm } from "react-hook-form";
import VisibilityOnIcon from "../assets/VisibilityOnIcon.svg";
import VisibilityOffIcon from "../assets/VisibilityOffIcon.svg";
import LoadingComponent from "./LoadingComponent";
import { loginApi, registerApi } from "../api/loginApi";
import { useAuth } from "../context/authContext";

export default function LoginRegisterComponent() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const loginSubmit = async (data) => {
    console.log("Login Data:", data);
    const result = await loginApi(data.email, data.password);
    if (result === 404 || result === 401) {
      setError("email", {
        type: "manual",
        message: (
          <>
            The email or password you entered is incorrect.
            <br />
            Please try again.
          </>
        ),
      });
      setError("password", {
        type: "manual",
        message: "",
      });
      setLoading(false);
    } else if (result?.token) {
      setError("success", {
        type: "manual",
        message: "Login Successful",
      });
      login(result?.token);
    } else {
      setError("unknown", {
        type: "manual",
        message: "Error occurred please refresh",
      });
      setLoading(false);
    }
  };

  const registerSubmit = async (data) => {
    console.log("Register Data:", data);
    const result = await registerApi(data.email, data.password);
    if (result === 409) {
      setError("email", {
        type: "manual",
        message: "Email already exist",
      });
      setLoading(false);
    } else if (result?.token) {
      setError("success", {
        type: "manual",
        message: "Registered Successfully",
      });
      login(result?.token);
    } else {
      setError("unknown", {
        type: "manual",
        message: "Error occurred please refresh",
      });
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (isLogin) {
      await loginSubmit(data);
    } else {
      await registerSubmit(data);
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
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
                  value === data.password || "Confirm password must match",
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
            <p className="login_error">{errors.email.message}</p>
          )}
          {errors.password && (
            <p className="login_error">{errors.password.message}</p>
          )}
          {errors.confirmPassword && (
            <p className="login_error">{errors.confirmPassword.message}</p>
          )}
          {errors.unknown && (
            <p className="login_error">{errors.unknown.message}</p>
          )}
          {errors.success && (
            <p className="text-green-400 text-lg mt-1">
              {errors.success.message}
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
