import { useForm } from "react-hook-form";

interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterInput>();

  async function emailExists(email: string): Promise<boolean> {
    console.log(email);
    return false;
  }

  async function addToDB(data: RegisterInput) {
    console.log(data);
  }

  async function onSubmit(data: RegisterInput) {
    const checkEmail = await emailExists(data.email);
    if (checkEmail === false) {
      setError("email", { type: "manual", message: "Email exists" });
    } else {
      await addToDB(data);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-400">
      <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="text-gray-900 text-2xl font-bold">REGISTER</p>
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
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            className="form-input"
            id="name"
            placeholder="Name"
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
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
          <button className="form-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
