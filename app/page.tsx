'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CodeSnippet from './components/CodeSnippet';
import Dropzone from './components/Dropzone';
import { Box, Alert, Snackbar } from '@mui/material';
import { getLatexFromImage } from './utils/openai';

interface SnippetData {
  id: number;
  code: string;
  isLoading: boolean;
}

export default function Home() {
  const [snippets, setSnippets] = useState<SnippetData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageReceived = useCallback(async (file: File) => {
    const newId = snippets.length + 1;
    setSnippets(prev => [...prev, { id: newId, code: '', isLoading: true }]);

    try {
      const latexCode = await getLatexFromImage(file);
      setSnippets(prev => prev.map(snippet => 
        snippet.id === newId ? { ...snippet, code: latexCode, isLoading: false } : snippet
      ));
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Error processing image. Please try again.');
      setSnippets(prev => prev.filter(snippet => snippet.id !== newId));
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
    <div style={{ height: '100vh', margin: 100, padding: 0 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {snippets.map((snippet) => (
          <CodeSnippet 
            key={snippet.id}
            initialCode={snippet.code}
            side_by_side={false}
            isLoading={snippet.isLoading}
          />
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
