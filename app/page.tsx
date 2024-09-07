'use client'

import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CodeSnippet from './components/CodeSnippet';
import Dropzone from './components/Dropzone';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <div style={{ height: '100vh', margin: 100, padding: 0 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        <CodeSnippet initialCode='$\sqrt{x}$' side_by_side={false} isLoading={false}/>
        <CodeSnippet initialCode='$B(\nu, T) = \frac{2h\nu^3}{c^2} \cdot \frac{1}{\frac{h\nu}{ek_BT} - 1}$' side_by_side={false} isLoading={false}/>
        <CodeSnippet side_by_side={false} isLoading={true}/>
        <Dropzone />
      </Box>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
