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
  marginBottom?: string;
  initialCode?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ 
  side_by_side, 
  isLoading = false, 
  marginBottom = '20px',
  initialCode = ''
}) => {
  const [code, setCode] = useState(initialCode);  // Initialize with initialCode
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

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
      maxWidth: '700px',
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
      marginBottom: marginBottom,
      width: '100%',
      maxWidth: '700px',
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
            maxWidth: '700px',
            overflow: 'hidden',
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
          }}>
            <div style={{
              paddingRight: '44px', // Add padding to the right for the button
              width: '100%',
              boxSizing: 'border-box',
            }}>
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={code => hljs.highlight(code, { language: 'latex' }).value}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  minHeight: '60px',
                  width: '100%', // Ensure the editor takes full width
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
                borderRadius: '25%', // Make it circular
                minWidth: '36px', // Set a fixed width
                width: '36px', // Set a fixed width
                height: '36px', // Set a fixed height
                padding: 0, // Remove padding
                '&:hover': {
                  backgroundColor: '#111111',
                  borderColor: '#0077ff', // Blue border on hover
                },
              }}
            >
              {copied ? 
                <Check sx={{ fontSize: 20 }} /> : 
                <ContentCopy sx={{ fontSize: 20 }} />
              }
            </Button>
          </Box>
          
          <Box sx={{
            width: '100%',
            maxWidth: '700px',
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
            <Latex>{code.startsWith('$') && code.endsWith('$') ? code : `$${code}$`}</Latex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CodeSnippet;