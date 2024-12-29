import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import PageLoadingComponent from "./PageLoadingComponent";

export default function CropperComponent({ src, handleCrop, aspect = 16 / 9 }) {
  const [pageLoading, setPageLoading] = useState(false);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    unit: "px",
    width: 0,
    height: 0,
    aspect: aspect,
  });

  const imgRef = useRef(null);

  const getMaxCrop = () => {
    const image = imgRef.current;
    if (image.width / image.height > aspect) {
      const maxHeight = image.height;
      const maxWidth = maxHeight * aspect;
      return { width: maxWidth, height: maxHeight };
    } else {
      const maxWidth = image.width;
      const maxHeight = maxWidth / aspect;
      return { width: maxWidth, height: maxHeight };
    }
  };

  useEffect(() => {
    setPageLoading(true);
    const maxCrop = getMaxCrop();
    setCrop((prev) => ({ ...prev, ...maxCrop }));
    setPageLoading(false);
  }, [src]);

  const getCroppedImg = (crop) => {
    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const scaledX = crop.x * scaleX;
    const scaledY = crop.y * scaleY;
    const scaledWidth = crop.width * scaleX;
    const scaledHeight = crop.height * scaleY;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    ctx.drawImage(
      image,
      scaledX,
      scaledY,
      scaledWidth,
      scaledHeight,
      0,
      0,
      scaledWidth,
      scaledHeight
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    return base64Image;
  };

  const onCropButtonClick = () => {
    if (crop) {
      const croppedImage = getCroppedImg(crop);
      handleCrop(croppedImage);
    }
  };

  return pageLoading ? (
    <PageLoadingComponent background={false} screen={false} />
  ) : (
    <div className="flex flex-col gap-2 bg-black bg-opacity-20 p-2">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        aspect={aspect}
        minWidth={30}
        minHeight={30}
      >
        <img src={src} ref={imgRef} alt="Image to crop" />
      </ReactCrop>
      <div className="flex justify-center">
        <button
          onClick={onCropButtonClick}
          className="px-10 py-2 rounded-md w-full bg-green-800 font-semibold text-white sm:rounded-lg hover:bg-green-900 shadow-lg transition duration-200"
        >
          Crop
        </button>
      </div>
    </div>
  );
  //   x: 0,
  //   y: 0,
  //   unit: "%",
  //   width: 0,
  //   height: 0,
  //   aspect: aspect,
  // });

  // const imgRef = useRef(null);

  // const getMaxCrop = (imageWidth, imageHeight) => {
  //   if (imageWidth / imageHeight > aspect) {
  //     const maxHeight = imageHeight;
  //     const maxWidth = maxHeight * aspect;
  //     return {
  //       width: convertToPercentage(maxWidth, imageWidth),
  //       height: convertToPercentage(maxHeight, imageHeight),
  //     };
  //   } else {
  //     const maxWidth = imageWidth;
  //     const maxHeight = maxWidth / aspect;
  //     return {
  //       width: convertToPercentage(maxWidth, imageWidth),
  //       height: convertToPercentage(maxHeight, imageHeight),
  //     };
  //   }
  // };

  // useEffect(() => {
  //   const image = imgRef.current;
  //   const maxCrop = getMaxCrop(image.width, image.height);
  //   setCrop((prev) => ({ ...prev, ...maxCrop }));
  // }, [src]);

  // const convertToPercentage = (value, dimension) => (value / dimension) * 100;

  // const getCroppedImg = (crop) => {
  //   const image = imgRef.current;
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");

  //   const imageWidth =
  //     (convertToPercentage(crop.width, image.width) / 100) * image.naturalWidth;
  //   const imageHeight =
  //     (convertToPercentage(crop.height, image.height) / 100) *
  //     image.naturalHeight;
  //   const cropX = convertToPercentage(crop.x, image.width);
  //   const cropY = convertToPercentage(crop.y, image.height);

  //   canvas.width = imageWidth;
  //   canvas.height = imageHeight;
  //   console.log("crop", imageWidth, imageHeight);
  //   ctx.drawImage(
  //     image,
  //     cropX,
  //     cropY,
  //     imageWidth,
  //     imageHeight,
  //     0,
  //     0,
  //     imageWidth,
  //     imageHeight
  //   );

  //   const base64Image = canvas.toDataURL("image/jpeg");
  //   return base64Image;
  // };

  // const onCropButtonClick = () => {
  //   if (crop) {
  //     const croppedImage = getCroppedImg(crop);
  //     handleCrop(croppedImage);
  //   }
  // };

  // return (
  //   <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-80 flex flex-col justify-center items-center pointer-events-auto z-10">
  //     <div className="bg-gradient-to-b dark:from-gray-700 dark:to-[#333333] from-gray-300 to-gray-100 p-5 max-w-full max-h-full overflow-auto">
  //       <ReactCrop
  //         crop={crop}
  //         onChange={(c) => setCrop(c)}
  //         aspect={aspect}
  //         minWidth={30}
  //         minHeight={30}
  //       >
  //         <img
  //           className="max-w-full max-h-screen object-contain"
  //           src={src}
  //           ref={imgRef}
  //           alt="Image to crop"
  //         />
  //       </ReactCrop>
  //       <div className="flex justify-center">
  //         <button
  //           onClick={onCropButtonClick}
  //           className="px-10 py-2 rounded-md w-full bg-green-800 font-semibold text-white sm:rounded-lg hover:bg-green-900 shadow-lg transition duration-200"
  //         >
  //           Crop
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
