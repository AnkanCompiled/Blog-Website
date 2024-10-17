import { useNavigate } from "react-router-dom";

export default function LogButton({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      className="bg-red-300 text-white font-bold py-2 px-4 rounded"
      onClick={() => navigate(link)}
    >
      {text}
    </button>
  );
}
