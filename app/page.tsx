'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CodeSnippet from './components/CodeSnippet';
import Dropzone from './components/Dropzone';
import { Box, Alert, Snackbar, useTheme, useMediaQuery } from '@mui/material';
import { getLatexFromImage } from './utils/openai';
import { getDominantColor } from './utils/imageUtils';
import Image from 'next/image';
import { useIsMobile } from './utils/useIsMobile';
interface SnippetData {
  id: number;
  code: string;
  isLoading: boolean;
  imageUrl: string | null;
  backgroundColor: string;
}

export default function Home() {
  const [snippets, setSnippets] = useState<SnippetData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleImageReceived = useCallback(async (file: File) => {
    const newId = snippets.length + 1;
    const imageUrl = URL.createObjectURL(file);

    try {
      // Get the dominant color immediately
      const dominantColor = await getDominantColor(imageUrl);

      // Add the new snippet with the correct background color
      setSnippets(prev => [...prev, { 
        id: newId, 
        code: '', 
        isLoading: true, 
        imageUrl, 
        backgroundColor: dominantColor 
      }]);

      // Now process the LaTeX
      const latexCode = await getLatexFromImage(file);

      // Update the snippet with the LaTeX code
      setSnippets(prev => prev.map(snippet => 
        snippet.id === newId ? { ...snippet, code: latexCode, isLoading: false } : snippet
      ));
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Something went wrong. Sorry about that!');
      setSnippets(prev => prev.filter(snippet => snippet.id !== newId));
      URL.revokeObjectURL(imageUrl);
    }
  }, [snippets.length]);

  useEffect(() => {
    const handlePaste = async (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              await handleImageReceived(blob);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [handleImageReceived]);

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(null);
  };

  return (

    <div style={{ height: '100vh', marginLeft: isMobile ? 20 : 70, marginRight: isMobile ? 20 : 70, marginTop: 40, padding: 0 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {snippets.map((snippet) => (
          <React.Fragment key={snippet.id}>
            {snippet.imageUrl && (
              <Box sx={{ 
                width: '100%', 
                marginBottom: 2, 
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #333',
                transition: 'border-color 0.3s, background-color 0.3s',
                backgroundColor: snippet.backgroundColor,
              }}>
                <Box sx={{
                  position: 'relative',
                  width: '100%',
                  padding: '4px',
                }}>
                  <Box sx={{
                    overflow: 'hidden',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Image 
                      src={snippet.imageUrl} 
                      alt="Pasted image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: 'auto',
                        height: 'auto',
                        maxHeight: '500px',
                        objectFit: 'scale-down',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            <CodeSnippet 
              initialCode={snippet.code}
              side_by_side={false}
              isLoading={snippet.isLoading}
            />
          </React.Fragment>
        ))}
        <Dropzone onImageReceived={handleImageReceived} />
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
