'use client'

import React, { useState, useCallback, useEffect } from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import Editor from '@monaco-editor/react';
import { useDropzone } from 'react-dropzone';
import OpenAI from 'openai';
import { FiCopy, FiCheck, FiClipboard } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const initialText = '%Drag and drop an image here to convert it to LaTeX\n';

function LatexRenderer() {
  const [text, setText] = useState(initialText);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const processImage = useCallback(async (imageFile: File) => {
    const base64Image = await convertToBase64(imageFile);
    const latexCode = await getLatexFromImage(base64Image);
    setText(prevText => {
      if (prevText.trim() === initialText.trim()) {
        return latexCode;
      }
      return prevText + '\n' + latexCode;
    });
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
      setIsLoading(false);
    }
  }, [processImage]);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

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
      return response.choices[0].message.content + '\n\\\\\n' || '';
    } catch (error) {
      console.error('Error calling GPT-4 Vision API:', error);
      return 'Error converting image to LaTeX';
    }
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
        <h1>LaTeX Editor</h1>
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
            disabled={isLoading}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '20px',
            }}
          >
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <FiClipboard />}
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
        }}>
          <Latex>{'$$' + text + '$$'}</Latex>
        </div>
      </div>
    </div>
  );
}

export default LatexRenderer;