'use client'

import React, { useState, useEffect } from 'react';
import { Box, Button, Skeleton } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';
import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark.css';
import latex from 'highlight.js/lib/languages/latex';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { getLatexPreviewSource, normalizeLatexSource } from '../utils/latex';

hljs.registerLanguage('latex', latex);

interface CodeSnippetProps {
  isLoading?: boolean;
  marginBottom?: string;
  initialCode?: string;
}

const LoadingSkeleton = () => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '700px',
      borderRadius: '0 0 8px 8px',
      border: '1px solid var(--border-color)',
      height: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--secondary-background)',
      gap: 2,
      padding: 2,
    }}
  >
    {[...Array(3)].map((_, index) => (
      <Skeleton
        key={index}
        width="100%"
        height="15px"
        animation="pulse"
        variant="rectangular"
        sx={{ bgcolor: 'var(--skeleton-background)', borderRadius: '6px' }}
      />
    ))}
  </Box>
);

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  isLoading = false,
  marginBottom = '20px',
  initialCode = '',
}) => {
  const [code, setCode] = useState(() => normalizeLatexSource(initialCode));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(normalizeLatexSource(initialCode));
  }, [initialCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(normalizeLatexSource(code));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeChange = (value: string) => {
    setCode(normalizeLatexSource(value));
  };

  const previewSource = getLatexPreviewSource(code);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        marginBottom,
        width: '100%',
        maxWidth: '700px',
      }}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <Box
            sx={{
              position: 'relative',
              backgroundColor: 'var(--secondary-background)',
              width: '100%',
              maxWidth: '700px',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                border: '1px solid var(--border-color)',
                transition: 'border-color 0.3s',
                pointerEvents: 'none',
              },
              '&:hover::after': {
                borderColor: 'var(--hover-border-color)',
              },
              '&:focus-within::after': {
                borderColor: 'var(--hover-border-color)',
              },
            }}
          >
            <Editor
              value={code}
              onValueChange={handleCodeChange}
              highlight={(value) => hljs.highlight(value, { language: 'latex' }).value}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                color: 'var(--primary-text)',
                border: 'transparent',
                backgroundColor: 'transparent',
                minHeight: '60px',
                width: '100%',
                outline: 'none',
              }}
              textareaClassName="editor-textarea"
            />
            <Button
              onClick={handleCopy}
              aria-label="Copy LaTeX to clipboard"
              variant="text"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'var(--button-background)',
                color: 'var(--primary-text)',
                border: '1px solid var(--border-color)',
                borderRadius: '25%',
                minWidth: '36px',
                width: '36px',
                height: '36px',
                padding: 0,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'var(--button-background)',
                  borderColor: 'var(--hover-border-color)',
                  boxShadow: 'none',
                },
              }}
            >
              {copied ? <Check sx={{ fontSize: 20 }} /> : <ContentCopy sx={{ fontSize: 20 }} />}
            </Button>
          </Box>

          <Box
            sx={{
              width: '100%',
              maxWidth: '700px',
              padding: 2,
              backgroundColor: 'var(--secondary-background)',
              borderRadius: '0 0 8px 8px',
              borderLeft: '1px solid var(--border-color)',
              borderRight: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              borderTop: 'none',
              minHeight: '60px',
              overflowX: 'auto',
              color: 'var(--primary-text)',
            }}
          >
            <Latex>{previewSource}</Latex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CodeSnippet;
