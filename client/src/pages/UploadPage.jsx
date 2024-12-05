import React, { useEffect, useCallback, useState, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import NoFileWhite from "../assets/NoFileWhite.jpg";
import NoFileBlack from "../assets/NoFileBlack.jpg";
import { useMode } from "../context/modeContext";

export default function UploadPage() {
  const { isModeDark } = useMode();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [quillLength, setQuillLength] = useState(0);
  const quillInstanceRef = useRef(null);

  const setPreviewNull = useCallback(() => {
    setPreview(isModeDark ? NoFileBlack : NoFileWhite);
  }, [isModeDark]);

  const contentRef = useCallback((content) => {
    if (content == null) return;

    content.innerHTML = "";

    const editor = document.createElement("div");
    content.append(editor);

    const quill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: [1, 2, 3, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
    });

    quillInstanceRef.current = quill;

    quill.on("text-change", (delta, oldDelta, source) => {
      setErrors("");
      setQuillLength(quillInstanceRef.current?.getContents().length() - 1);
    });
  }, []);

  useEffect(() => {
    document.title = "Upload";
    setPreviewNull();
  }, [isModeDark]);

  const onSubmit = async () => {
    setLoading(true);
    setErrors("");
    const quillContent = quillInstanceRef.current?.getContents();
    if (quillLength < 1) {
      setErrors("Not enough content");
      setLoading(false);
    } else if (quillLength > 800) {
      setErrors("Content size too large");
      setLoading(false);
    }
    console.log("Quill Content:", quillContent);
  };

  return (
    <div className="main_screen overflow-x-hidden">
      <NavbarComponent />
      <div className="flex-1 flex items-center -mt-40 sm:mt-0 justify-center">
        <div className="bg-gray-200 dark:bg-gray-700 py-4 px-0 sm:px-6 w-screen sm:w-[70vw] md:w-[60vw] xl:w-[40vw] sm:rounded-md shadow-md flex flex-col gap-4">
          <button className="hover:opacity-80 transition duration-200">
            <img src={preview} className="w-full sm:rounded-md" alt="preview" />
          </button>
          <div className="contentDiv" ref={contentRef}></div>
          <div className="grid grid-rows-1 grid-cols-2">
            <div>
              {errors && <p className="text-red-400 text-md">{errors}</p>}
            </div>
            <p className="text-right text-gray-600 dark:text-gray-400 px-2">
              {quillLength}/800
            </p>
          </div>

          {loading ? (
            <button
              disabled
              className="py-2 w-full bg-gray-500 font-semibold text-white sm:rounded-lg opacity-50 cursor-not-allowed"
            >
              Uploading...
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="py-2 w-full bg-gray-800 font-semibold text-white sm:rounded-lg hover:bg-gray-900 transition duration-200"
            >
              Upload
            </button>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
