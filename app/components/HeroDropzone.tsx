"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { setPendingImage } from "../utils/pendingImage";

export default function HeroDropzone() {
  const router = useRouter();

  const forward = useCallback(
    (file: File) => {
      setPendingImage(file);
      router.push("/convert");
    },
    [router]
  );

  const onDrop = useCallback(
    (files: File[]) => {
      if (files[0]) forward(files[0]);
    },
    [forward]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Paste an image anywhere on the landing page (Ctrl/Cmd+V).
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const items = Array.from(event.clipboardData?.items || []);
      for (const item of items) {
        if (item.type.startsWith("image")) {
          const file = item.getAsFile();
          if (file) {
            event.preventDefault();
            forward(file);
            return;
          }
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [forward]);

  return (
    <div
      {...getRootProps({ role: "button" })}
      className={`upload-panel ${isDragActive ? "upload-active" : ""}`}
      aria-label="Upload an equation image"
    >
      <input {...getInputProps()} />
      <span className="upload-plus" aria-hidden="true">+</span>
      <strong>{isDragActive ? "Drop your equation here" : "Drop a little math here."}</strong>
      <span>Drag an image, click to browse, or paste.</span>
      <span className="upload-formats">PNG · JPEG · GIF · WebP</span>
    </div>
  );
}
