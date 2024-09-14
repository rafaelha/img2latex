'use client'

import React, { useState, useCallback } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Dropzone from './components/Dropzone';
import { Box, Alert, Snackbar } from '@mui/material';
import { getLatexFromImage } from './utils/openai';
import { getDominantColor } from './utils/imageUtils';
import { useIsMobile } from './utils/useIsMobile';
import LaTeXPreview from './components/LaTeXPreview';

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
      const dominantColor = await getDominantColor(imageUrl);

      setSnippets(prev => [...prev, { 
        id: newId, 
        code: '', 
        isLoading: true, 
        imageUrl, 
        backgroundColor: dominantColor 
      }]);

      const latexCode = await getLatexFromImage(file);

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

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      marginLeft: isMobile ? 20 : 70, 
      marginRight: isMobile ? 20 : 70, 
      marginTop: 40, 
      padding: 0,
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        <Dropzone onImageReceived={handleImageReceived} />
        
        {snippets.slice().reverse().map((snippet) => (
          <LaTeXPreview
            key={snippet.id}
            imageUrl={snippet.imageUrl}
            backgroundColor={snippet.backgroundColor}
            code={snippet.code}
            isLoading={snippet.isLoading}
          />
        ))}
        
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
