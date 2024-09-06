'use client'

import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';

interface CodeSnippetProps {
  left: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ left }) => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const borderRadius = left ? '8px 0 0 8px' : '0 0 8px 8px';

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
        borderRadius: borderRadius,
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
              borderRadius: borderRadius,
              '& fieldset': {
                borderColor: '#333',
                borderRadius: borderRadius,
                transition: 'border-color 0.3s',
              },
              '&:hover fieldset': {
                borderColor: '#0077ff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0077ff',
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
            borderRadius: 0, // No rounded corners for the button
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