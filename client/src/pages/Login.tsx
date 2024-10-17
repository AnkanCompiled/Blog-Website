import { useForm } from "react-hook-form";

interface LoginInput {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>();

  async function emailExists(email: string): Promise<false | LoginInput> {
    console.log(email);
    const tempData = {
      email: "ankan@gmail.com",
      password: "ankans",
    };
    return tempData;
  }

  async function onSubmit(data: LoginInput) {
    const checkEmail = await emailExists(data.email);
    if (checkEmail === false) {
      setError("email", { type: "manual", message: "Email does not exists" });
    } else {
      if (checkEmail.password === data.password) {
      } else {
        setError("password", { type: "manual", message: "Incorrect password" });
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-400">
      <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="text-gray-900 text-2xl font-bold">LOGIN</p>
        </div>
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className="form-input"
            id="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="form-input"
            id="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button className=" form-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
