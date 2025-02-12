import React, { useEffect, useCallback, useState, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import NoFileWhite from "../assets/NoFileWhite.jpg";
import NoFileBlack from "../assets/NoFileBlack.jpg";
import { useMode } from "../context/modeContext";
import LoadingComponent from "../components/LoadingComponent";
import CropperComponent from "../components/CropperComponent";
import { getCookie } from "../util/cookieUtil";
import { uploadApi } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import EmailVerifiedComponent from "../components/EmailVerifiedComponent";
import { useAuth } from "../context/authContext";

export default function UploadPage() {
  const { isModeDark } = useMode();
  const { verifiedError } = useAuth();
  const inputFileRef = useRef(null);
  const [cropWindow, setCropWindow] = useState(false);
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [quillLength, setQuillLength] = useState(0);
  const quillInstanceRef = useRef(null);
  const navigate = useNavigate();

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

    const qlEditor = editor.querySelector(".ql-editor");
    if (qlEditor) {
      qlEditor.classList.add("text-base", "min-h-[150px]");
    }

    quill.on("text-change", (delta, oldDelta, source) => {
      setErrors("");
      setQuillLength(quillInstanceRef.current?.getContents().length() - 1);
    });
  }, []);

  useEffect(() => {
    document.title = "Upload";
    setPreviewNull();
  }, [isModeDark]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedExtensions.includes(file.type)) {
        setErrors("");
        const reader = new FileReader();
        reader.onload = (event) => {
          setSrc(event.target.result);
          setCropWindow(true);
        };
        reader.readAsDataURL(file);
      } else {
        setErrors("Image should be of type jpg, jpeg, png");
      }
    }
    inputFileRef.current.value = null;
  };

  const handleCrop = (image) => {
    setCropWindow(false);
    setPreview(image);
  };

  const uploadContent = async (formData) => {
    const token = getCookie("authToken");
    const result = await uploadApi(token, formData);
    return result;
  };

  const onSubmit = async () => {
    setLoading(true);
    setErrors("");
    const quillContent = quillInstanceRef.current?.getContents();
    if (quillLength < 1) {
      setErrors("Not enough content");
    } else if (quillLength > 2000) {
      setErrors("Content size too large");
    } else if (preview === NoFileBlack || preview === NoFileWhite) {
      setErrors("Provide an image for the blog");
    } else {
      const formData = new FormData();
      formData.append("image", preview);
      formData.append("content", JSON.stringify(quillContent));
      const result = await uploadContent(formData);
      switch (result) {
        case 200:
          navigate("/home");
          break;
        case 400:
          setErrors("Image size too large");
          break;
        default:
          setErrors("Unexpected error occurred! Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="main_screen overflow-x-hidden">
      {verifiedError && <EmailVerifiedComponent />}
      <NavbarComponent />
      <div className="flex-1 flex items-center justify-center">
        <div className=" bg-gradient-to-b dark:from-gray-700 dark:to-[#333333] from-gray-300 to-gray-100  py-6 px-0 sm:px-6 w-screen sm:w-[70vw] md:w-[60vw] xl:w-[40vw] sm:rounded-md shadow-md flex flex-col gap-4">
          {cropWindow ? (
            <CropperComponent src={src} handleCrop={handleCrop} />
          ) : (
            <button
              onClick={() => {
                inputFileRef.current.click();
              }}
              className="hover:opacity-70 transition duration-200"
            >
              <img
                src={preview}
                className="w-full sm:rounded-md"
                alt="preview"
              />
            </button>
          )}

          <input
            type="file"
            onChange={handleFileChange}
            ref={inputFileRef}
            hidden
          />
          <div className="contentDiv" ref={contentRef}></div>
          <div className="grid grid-rows-1 grid-cols-2">
            <div>
              {errors && <p className="text-red-400 text-md">{errors}</p>}
            </div>
            <p className="text-right text-gray-600 dark:text-gray-400 px-2">
              {quillLength}/2000
            </p>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              disabled={verifiedError}
              onClick={onSubmit}
              className="py-2 w-full bg-gray-800 font-semibold text-white sm:rounded-lg hover:bg-gray-900 transition duration-200 disabled:opacity-10 disabled:hover:bg-gray-800"
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
