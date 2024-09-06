'use client'

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';

const CodeSnippet = () => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: '#000000',
    }}>
      <Box sx={{ 
        position: 'relative', 
        backgroundColor: '#000000',
        borderRadius: 2,
        width: '100%',
        maxWidth: '600px',
        overflow: 'hidden',
      }}>
        <TextField
          multiline
          fullWidth
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          slotProps={{
            input: {
              style: {
                fontFamily: 'Monospace',
                color: '#ffffff',
              },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#000000',
              borderRadius: 2,
              '& fieldset': {
                borderColor: '#333',
                borderRadius: 2,
                transition: 'border-color 0.3s',
              },
              '&:hover fieldset': {
                borderColor: '#0077ff', // Blue border on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0077ff', // Blue border when focused
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: 2,
            },
          }}
        />
        <Button 
          onClick={handleCopy}
          variant="contained"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '1px solid #333',
            '&:hover': {
              backgroundColor: '#111111',
              borderColor: '#0077ff', // Blue border on hover
            },
          }}
          startIcon={copied ? <Check /> : <ContentCopy />}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </Box>
    </Box>
  );
};

export default CodeSnippet;