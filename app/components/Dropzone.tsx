"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import { ContentPaste, CancelOutlined } from "@mui/icons-material";
import Latex from "react-latex-next";

interface DropzoneProps {
  onImageReceived: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onImageReceived }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [pasteError, setPasteError] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageReceived(acceptedFiles[0]);
      }
    },
    [onImageReceived]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handlePaste = useCallback(
    async (event?: ClipboardEvent) => {
      try {
        let items;
        if (event) {
          items = Array.from(event.clipboardData?.items || []);
        } else {
          const clipboardItems = await navigator.clipboard.read();
          items = clipboardItems[0].types.map((type) => ({
            type,
            getAsFile: async () => {
              const blob = await clipboardItems[0].getType(type);
              return new File([blob], "pasted-image", { type });
            },
          }));
        }

        for (const item of items) {
          if (item.type.indexOf("image") !== -1) {
            const blob = await item.getAsFile();
            if (blob) {
              onImageReceived(blob);
              return;
            }
          }
        }
        throw new Error("No valid image found in clipboard");
      } catch (err) {
        console.error("Failed to read clipboard contents: ", err);
        setPasteError(true);
        setTimeout(() => setPasteError(false), 2000);
      }
    },
    [onImageReceived]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "v") {
        event.preventDefault();
        handlePaste();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  return (
    <div
      {...getRootProps()}
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "120px",
        border: "1px dashed var(--border-color)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "20px",
        position: "relative",
        backgroundColor: "var(--secondary-background)",
        padding: "0 50px",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ textAlign: "center" }}>Drop the image here ...</p>
      ) : (
        <>
          <p style={{ textAlign: "center" }}>
            {isMobile ? (
              <>
                Tap to upload an image and convert it to{" "}
                <Latex>{"$\\LaTeX$"}</Latex>.
              </>
            ) : (
              <>
                Drag and drop an image to convert it to{" "}
                <Latex>{"$\\LaTeX$"}</Latex>. <br />
                Or paste from clipboard.
              </>
            )}
          </p>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handlePaste();
            }}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "36px",
              height: "36px",
              backgroundColor: "var(--button-background)",
              color: pasteError ? "red" : "var(--primary-text)",
              border: "1px solid var(--border-color)",
              transition:
                "border-color 0.3s, background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "var(--button-background)",
                borderColor: "var(--hover-border-color)",
              },
              borderRadius: "25%",
            }}
          >
            {pasteError ? <CancelOutlined /> : <ContentPaste />}
          </IconButton>
        </>
      )}
    </div>
  );
};

export default Dropzone;
