'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import Editor, { BeforeMount } from '@monaco-editor/react';
import { useDropzone } from 'react-dropzone';
import OpenAI from 'openai';
import { FiCopy, FiCheck, FiClipboard } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoMdClose, IoMdResize } from 'react-icons/io';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const initialText = 'Drag and drop an image here to convert it to LaTeX!';

function LatexRenderer() {
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 20, y: 20 });
  const [previewSize, setPreviewSize] = useState({ width: 200, height: 200 });
  const [aspectRatio, setAspectRatio] = useState(1);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const isResizingRef = useRef(false);
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0, direction: '' });

  const processImage = useCallback(async (imageFile: File) => {
    setIsProcessing(true);
    try {
      const base64Image = await convertToBase64(imageFile);
      setPreviewImage(base64Image);
      
      // Set aspect ratio and size based on the new image
      const img = new Image();
      img.onload = () => {
        const newAspectRatio = img.width / img.height;
        setAspectRatio(newAspectRatio);

        // Set the preview size to match the image dimensions
        let newWidth = img.width;
        let newHeight = img.height;

        // Adjust size if it exceeds the viewport
        const maxWidth = window.innerWidth * 0.8; // 80% of viewport width
        const maxHeight = window.innerHeight * 0.8; // 80% of viewport height
        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          newHeight = newWidth / newAspectRatio;
        }
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = newHeight * newAspectRatio;
        }

        setPreviewSize({ width: newWidth, height: newHeight });

        // Position the preview in the bottom right corner
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        setPreviewPosition({
          x: windowWidth - newWidth - 20, // 20px padding from right edge
          y: windowHeight - newHeight - 20 // 20px padding from bottom edge
        });
      };
      img.src = base64Image;

      const latexCode = await getLatexFromImage(base64Image);
      setText(prevText => {
        if (prevText.trim() === initialText.trim()) {
          return latexCode;
        }
        return prevText + '\n' + latexCode;
      });
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      await processImage(file);
    }
  }, [processImage]);

  const handlePaste = useCallback(async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            event.preventDefault();
            await processImage(blob);
            break;
          }
        }
      }
    }
  }, [processImage]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [text]);

  const handlePasteButton = useCallback(async () => {
    setIsProcessing(true);
    try {
      setIsLoading(true);
      const items = await navigator.clipboard.read();
      for (const item of items) {
        if (item.types.includes('image/png') || item.types.includes('image/jpeg')) {
          const blob = await item.getType(item.types.includes('image/png') ? 'image/png' : 'image/jpeg');
          await processImage(new File([blob], 'pasted-image', { type: blob.type }));
          break;
        }
      }
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
      // Fallback to legacy clipboard API
      navigator.clipboard.readText().then(text => {
        if (text.startsWith('data:image')) {
          const arr = text.split(',');
          const mimeMatch = arr[0].match(/:(.*?);/);
          const mime = mimeMatch ? mimeMatch[1] : 'image/png'; // Default to 'image/png' if match fails
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const file = new File([u8arr], 'pasted-image', { type: mime });
          processImage(file);
        }
      }).catch(err => {
        console.error('Clipboard read failed: ', err);
      });
    } finally {
      setIsProcessing(false);
    }
  }, [processImage]);

  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isResizingRef.current) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX - previewPosition.x,
        y: e.clientY - previewPosition.y
      };
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDraggingRef.current && !isResizingRef.current) {
      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;
      setPreviewPosition({ x: newX, y: newY });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    isResizingRef.current = false;
  }, []);

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    isResizingRef.current = true;
    isDraggingRef.current = false;
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: previewSize.width,
      height: previewSize.height,
      left: previewPosition.x,
      top: previewPosition.y,
      direction: direction
    };
  };

  const handleResize = useCallback((e: MouseEvent) => {
    if (isResizingRef.current) {
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;
      const direction = resizeStartRef.current.direction;
      
      let newWidth = resizeStartRef.current.width;
      let newHeight = resizeStartRef.current.height;
      let newLeft = resizeStartRef.current.left;
      let newTop = resizeStartRef.current.top;

      if (direction.includes('e')) {
        newWidth = Math.max(100, resizeStartRef.current.width + deltaX);
        newHeight = newWidth / aspectRatio;
      } else if (direction.includes('w')) {
        newWidth = Math.max(100, resizeStartRef.current.width - deltaX);
        newHeight = newWidth / aspectRatio;
        newLeft = resizeStartRef.current.left + (resizeStartRef.current.width - newWidth);
      }

      if (direction.includes('s')) {
        newHeight = Math.max(100, resizeStartRef.current.height + deltaY);
        newWidth = newHeight * aspectRatio;
      } else if (direction.includes('n')) {
        newHeight = Math.max(100, resizeStartRef.current.height - deltaY);
        newWidth = newHeight * aspectRatio;
        newTop = resizeStartRef.current.top + (resizeStartRef.current.height - newHeight);
      }

      setPreviewSize({ width: newWidth, height: newHeight });
      setPreviewPosition({ x: newLeft, y: newTop });
    }
  }, [aspectRatio]);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleResize);
    return () => {
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleResize);
    };
  }, [handlePaste, handleMouseMove, handleMouseUp, handleResize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    noClick: true, // Disable click to open file dialog
    noKeyboard: true // Disable keyboard interaction
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const getLatexFromImage = async (base64Image: string): Promise<string> => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Convert this image to LaTeX code. Only provide the LaTeX code, no explanations. Return the plane latex without any latex code block." },
              { type: "image_url", image_url: { url: base64Image } }
            ],
          },
        ],
      });
      return response.choices[0].message.content + '\n\n' || '';
    } catch (error) {
      console.error('Error calling GPT-4 Vision API:', error);
      return 'Error converting image to LaTeX';
    }
  };

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.languages.register({ id: 'latex' });
    monaco.languages.setMonarchTokensProvider('latex', {
      // Basic LaTeX syntax highlighting rules
      tokenizer: {
        root: [
          [/\\[a-zA-Z]+/, 'keyword'],
          [/\{|\}|\[|\]/, 'delimiter.bracket'],
          [/\$\$?/, 'delimiter.latex'],
          [/%.*$/, 'comment'],
        ]
      }
    });
  };

  return (
    <div
      {...getRootProps()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        padding: '20px',
        position: 'relative',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <p>Drop the image here ...</p>
        </div>
      )}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h1></h1>
        <div style={{
          display: 'flex',
          gap: '10px',
        }}>
          <button
            onClick={handleCopy}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '20px',
            }}
          >
            {isCopied ? <FiCheck /> : <FiCopy />}
          </button>
          <button
            onClick={handlePasteButton}
            disabled={isProcessing}
            style={{
              background: 'none',
              border: 'none',
              cursor: isProcessing ? 'wait' : 'pointer',
              color: '#ffffff',
              fontSize: '20px',
            }}
          >
            {isProcessing ? <AiOutlineLoading3Quarters className="animate-spin" /> : <FiClipboard />}
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flex: 1, gap: '20px' }}>
        <div style={{ position: 'relative', width: '50%' }}>
          <Editor
            height="100%"
            width="100%"
            language="latex"
            theme="vs-dark"
            value={text}
            onChange={(value) => setText(value || '')}
            beforeMount={handleEditorWillMount}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
              overviewRulerBorder: false,
            }}
          />
        </div>
        <div style={{
          width: '50%',
          backgroundColor: '#2d2d2d',
          borderRadius: '8px',
          padding: '20px',
          overflowY: 'auto',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}>
          {text ? (
            <Latex>{'$$' + text.replace(/\n/g, '\\\\') + '$$'}</Latex>
          ) : (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#666',
              padding: '20px',
              whiteSpace: 'pre-wrap',
            }}>
              {initialText}
            </div>
          )}
        </div>
      </div>
      {previewImage && (
        <div 
          style={{
            position: 'fixed',
            top: `${previewPosition.y}px`,
            left: `${previewPosition.x}px`,
            width: `${previewSize.width}px`,
            height: `${previewSize.height}px`,
            backgroundColor: '#2d2d2d',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.5)',
            zIndex: 1000,
            cursor: 'move',
          }}
          onMouseDown={handleMouseDown}
        >
          <button
            onClick={closePreview}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '16px',
              zIndex: 1002,
            }}
          >
            <IoMdClose />
          </button>
          <img
            src={previewImage}
            alt="Pasted or dropped image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              borderRadius: '8px',
            }}
          />
          {['nw', 'ne', 'sw', 'se'].map((direction) => (
            <div
              key={direction}
              style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                background: 'transparent',
                [direction[0]]: direction[0] === 'n' ? '-15px' : 'auto',
                [direction[1]]: direction[1] === 'w' ? '-15px' : 'auto',
                [direction[0] === 'n' ? 'top' : 'bottom']: '-15px',
                [direction[1] === 'w' ? 'left' : 'right']: '-15px',
                cursor: `${direction}-resize`,
                zIndex: 1001,
              }}
              onMouseDown={(e) => handleResizeStart(e, direction)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatexRenderer;