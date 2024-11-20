import React, { useEffect, useRef, useState } from "react";
import { UserNavComponent } from "../components/NavbarComponent";
import { useForm } from "react-hook-form";
import Empty_Image from "../assets/Empty_Image.png";
import { uploadApi } from "../api/uploadApi";

export default function UploadPage() {
  useEffect(() => {
    document.title = "Upload - BloggerNet";
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const inputimageRef = useRef();
  const [preview, setPreview] = useState(Empty_Image);

  function handleImagePreview(event) {
    const file = event.target.files?.[0];

    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        img.src = reader.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const aspectRatio = width / height;

          if (aspectRatio >= 4 / 3 && aspectRatio <= 16 / 9) {
            clearErrors();
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 1920;
            canvas.height = 1080;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            setPreview(canvas.toDataURL("image/jpeg"));
          } else {
            setError("uploadError", {
              type: "manual",
              message:
                "Please upload an image with a 4:3 to 16:9 aspect ratio.",
            });
            event.target.value = "";
          }
        };
      };
    }
  }

  function handleImageButton() {
    if (inputimageRef.current) {
      inputimageRef.current.click();
    }
  }

  async function uploadData(data) {
    const result = await uploadApi(data);
    return result;
  }

  const onSubmit = async (data) => {
    if (preview === Empty_Image) {
      setError("uploadError", {
        type: "manual",
        message: "Please upload an image with a 4:3 to 16:9 aspect ratio.",
      });
    } else {
      const formData = new FormData();
      const requiredData = { title: data.title, content: data.content };
      formData.append("data", JSON.stringify(requiredData));
      formData.append("image", preview);
      const result = await uploadData(formData);
      window.location.reload();
    }
  };

  return (
    <div className="bg-red-50 w-full overflow-hidden">
      <UserNavComponent />
      <div className="grid xl:grid-cols-2">
        <div className="hidden xl:grid items-center justify-center">
          <div className="mt-10 grid justify-center text-left bg-red-100 p-7 rounded-md shadow-lg">
            <h1 className="text-5xl font-semibold text-red-400 [text-shadow:0px_2px_2px_rgba(0,0,0,0.5)] cursor-default">
              Create Your Unique Blog
            </h1>
            <br />
            <ul className="list-none text-xl font-medium gap-10 px-10 text-gray-600 cursor-default">
              <li>Upload a image</li>
              <br />
              <li>Give a unique title</li>
              <br />
              <li>Write your blog</li>
              <br />
              <li>Publish to the World!</li>
            </ul>
          </div>
        </div>
        <div className="my-8 sm:my-10  w-full justify-center grid">
          <button
            className="flex justify-center w-screen sm:w-[600px] h-auto bg-[#cdcdcd]"
            onClick={handleImageButton}
          >
            <div>
              <img
                className="w-auto h-auto shadow-md"
                src={preview}
                alt="Preview"
              />
            </div>
          </button>
          {errors.uploadError && (
            <p className="form-error">{errors.uploadError.message}</p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 my-3 bg-red-100 p-3 py-8"
          >
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImagePreview}
              ref={inputimageRef}
              hidden={true}
            />
            <input
              {...register("title", {
                required: "Title is required",
              })}
              className="py-3 px-6 shadow-md"
              id="title"
              placeholder="Enter a title"
            />
            {errors.title && (
              <p className="form-error">{errors.title.message}</p>
            )}
            <textarea
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 5,
                  message: "Blog must be at least 5 characters long",
                },
              })}
              rows="10"
              className="py-3 px-6 shadow-md"
              id="content"
              placeholder="Write your blog..."
            />
            {errors.content && (
              <p className="form-error">{errors.content.message}</p>
            )}
            <button
              type="submit"
              className="py-2 w-full mt-4  bg-red-300  hover:bg-red-400 focus:bg-red-500  rounded-lg "
            >
              <span className="text-white font-bold ">Publish</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
