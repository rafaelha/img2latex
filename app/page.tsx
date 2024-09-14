'use client'

import React, { useState, useCallback } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Dropzone from './components/Dropzone';
import { Box, Alert, Snackbar } from '@mui/material';
import { useIsMobile } from './utils/useIsMobile';
import LaTeXPreview from './components/LaTeXPreview';
import { handleImageReceived } from './utils/handleImageReceived';

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

  const handleImageReceivedCallback = useCallback((file: File) => {
    handleImageReceived(file, snippets, setSnippets, setError)();
  }, [snippets]);

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
        <Dropzone onImageReceived={handleImageReceivedCallback} />
        
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
