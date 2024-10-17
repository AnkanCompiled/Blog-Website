import LogButton from "../components/logButton";

export default function Landing() {
  return (
    <div>
      <LogButton text="Sign In" link="/login" />
      <LogButton text="Sign Up" link="/register" />
    </div>
  );
}
