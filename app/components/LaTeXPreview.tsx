import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import CodeSnippet from './CodeSnippet';

interface LaTeXPreviewProps {
  imageUrl: string | null;
  backgroundColor: string;
  code: string;
  isLoading: boolean;
}

const LaTeXPreview: React.FC<LaTeXPreviewProps> = ({ imageUrl, backgroundColor, code, isLoading }) => {
  return (
    <>
      {imageUrl && (
        <Box sx={{ 
          width: '100%', 
          marginTop: 2,
          marginBottom: 0, 
          borderRadius: '8px 8px 0 0',
          overflow: 'hidden',
          position: 'relative',
          borderTop: '1px solid var(--border-color)',
          borderRight: '1px solid var(--border-color)',
          borderLeft: '1px solid var(--border-color)',
          borderBottom: '0',
          transition: 'border-color 0.3s, background-color 0.3s',
          backgroundColor: backgroundColor,
        }}>
          <Box sx={{
            position: 'relative',
            width: '100%',
            padding: '0px',
          }}>
            <Box sx={{
              overflow: 'hidden',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                src={imageUrl}
                alt="Pasted image"
                unoptimized
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'scale-down',
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
      <CodeSnippet initialCode={code} isLoading={isLoading} />
    </>
  );
};

export default LaTeXPreview;