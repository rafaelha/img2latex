'use client'

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CodeSnippet from './CodeSnippet';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const CodeSnippetWithLatex: React.FC = () => {
  const [code, setCode] = useState('');

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      height: '100%',
      backgroundColor: '#000000',
    }}>
      <Box sx={{ flex: 1, maxWidth: '50%' }}>
        <CodeSnippet side_by_side={true} />
      </Box>
      <Box sx={{ 
        flex: 1,
        maxWidth: '50%',
        backgroundColor: '#ffffff',
        padding: 2,
        borderRadius: '0 8px 8px 0',
        overflow: 'auto',
      }}>
        <Latex>{code}</Latex>
      </Box>
    </Box>
  );
};

export default CodeSnippetWithLatex;