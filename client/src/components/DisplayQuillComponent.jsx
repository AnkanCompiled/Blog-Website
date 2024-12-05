import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function DisplayQuillContent({ deltaData }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        readOnly: true,
        modules: { toolbar: false },
      });

      quill.setContents(deltaData);
    }
  }, [deltaData]);

  return <div ref={editorRef}></div>;
}
