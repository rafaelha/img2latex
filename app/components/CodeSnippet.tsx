'use client'

import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark.css'; // You can choose a different theme if you prefer
import latex from 'highlight.js/lib/languages/latex';

hljs.registerLanguage('latex', latex);

interface CodeSnippetProps {
  left: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ left }) => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
  }, [code]);

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
        '& .editor-container': {
          position: 'relative',
          minHeight: '60px', // Add this line
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: borderRadius,
            border: '1px solid #333',
            transition: 'border-color 0.3s',
            pointerEvents: 'none',
          },
          '&:hover::after': {
            borderColor: '#0077ff',
          },
          '&:focus-within::after': {
            borderColor: '#0077ff',
          },
        },
      }}>
        <div className="editor-container">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => hljs.highlight(code, { language: 'latex' }).value}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: '#000000',
              color: '#ffffff',
              minHeight: '60px',
            }}
          />
        </div>
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