'use client'

import React, { useState, useEffect } from 'react';
import { Box, Button, Skeleton } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark.css'; // You can choose a different theme if you prefer
import latex from 'highlight.js/lib/languages/latex';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

hljs.registerLanguage('latex', latex);

interface CodeSnippetProps {
  side_by_side: boolean;
  isLoading?: boolean;
  maxWidth?: string;  // Add this line
  marginBottom?: string;  // Add this line
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  side_by_side, 
  isLoading = false, 
  maxWidth = '600px',
  marginBottom = '20px'  // Add this line
}) => {
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

  const borderRadius = side_by_side ? '8px 0 0 8px' : '8px 8px 0 0';
  const borderRadiusLatex = side_by_side ? '0 8px 8px 0' : '0 0 8px 8px';

  const LoadingSkeleton = () => (
    <Box sx={{ 
      width: '100%',
      maxWidth: maxWidth,
      borderRadius: '8px',
      border: '1px solid #333',
      height: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      padding: 2,
    }}>
      {[...Array(3)].map((_, index) => (
        <Skeleton 
          key={index}
          width="100%"
          height="15px"
          animation="pulse"
          variant="rectangular"
          sx={{ bgcolor: 'grey.800', borderRadius: '6px' }}
        />
      ))}
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: '#000000',
      position: 'relative',
      marginBottom: marginBottom,  // Use the prop here
    }}>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <Box sx={{ 
            position: 'relative', 
            backgroundColor: '#000000',
            borderRadius: borderRadius,
            width: '100%',
            maxWidth: maxWidth,
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
                borderRadius: 2, // Rounded corners for the button
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
          
          <Box sx={{
            width: '100%',
            maxWidth: maxWidth,
            marginTop: 0,
            padding: 2,
            backgroundColor: '#000000',
            borderRadius: borderRadiusLatex,
            borderLeft: '1px solid #333',
            borderRight: '1px solid #333',
            borderBottom: '1px solid #333',
            borderTop: 'none',
            minHeight: '60px',
            overflowX: 'auto',
            color: '#ffffff',
          }}>
            <Latex>{code}</Latex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CodeSnippet;