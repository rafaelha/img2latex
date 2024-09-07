'use client'

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconButton } from '@mui/material';
import { ContentPaste } from '@mui/icons-material';

const Dropzone: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the dropped files here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handlePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const blob = await clipboardItem.getType(type);
            // Handle the pasted image here
            console.log('Pasted image:', blob);
            // You can process the blob as needed
          }
        }
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <div {...getRootProps()} style={{
      width: '100%',
      maxWidth: '700px',
      height: '120px',
      border: '1px dashed #333',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      marginBottom: '20px',
      position: 'relative',
      padding: '0 50px', // Add horizontal padding
    }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p style={{ textAlign: 'center' }}>Drop the image here ...</p> :
          <>
            <p style={{ textAlign: 'center' }}>Drag and drop an image to convert it to LaTeX. Or paste from clipboard.</p>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handlePaste();
              }}
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '36px',
                height: '36px',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: '1px solid #333',
                '&:hover': {
                  backgroundColor: '#111111',
                  borderColor: '#0077ff',
                },
                borderRadius: '25%',
              }}
            >
              <ContentPaste />
            </IconButton>
          </>
      }
    </div>
  );
};

export default Dropzone;