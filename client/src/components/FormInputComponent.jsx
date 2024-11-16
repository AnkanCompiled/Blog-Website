import React from "react";

export function FormEmailComponent({ register, value }) {
  return (
    <input
      {...register(value, {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email format",
        },
      })}
      className="form-input"
      id={value}
      placeholder="Email"
    />
  );
}

export function FormNameComponent({ register, value }) {
  return (
    <input
      {...register(value, {
        required: "Name is required",
      })}
      className="form-input"
      id={value}
      placeholder="Full Name"
    />
  );
}

export function FormPasswordComponent({ register, value }) {
  return (
    <input
      {...register(value, {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      })}
      type="password"
      className="form-input"
      id={value}
      placeholder="Password"
    />
  );
}
export function FormErrorComponent({ errors }) {
  return <>{errors && <p className="form-error">{errors.message}</p>}</>;
}
