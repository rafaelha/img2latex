import type { Dispatch, SetStateAction } from 'react';
import { getLatexFromImage } from './openai';
import { getDominantColor } from './imageUtils';

export interface SnippetData {
  id: string;
  code: string;
  isLoading: boolean;
  imageUrl: string | null;
  backgroundColor: string;
}

export async function handleImageReceived(
  file: File,
  setSnippets: Dispatch<SetStateAction<SnippetData[]>>,
  setError: Dispatch<SetStateAction<string | null>>
): Promise<void> {
  const id = crypto.randomUUID();
  const imageUrl = URL.createObjectURL(file);

  try {
    const dominantColor = await getDominantColor(imageUrl);

    setSnippets(prev => [
      ...prev,
      { id, code: '', isLoading: true, imageUrl, backgroundColor: dominantColor },
    ]);

    const latexCode = await getLatexFromImage(file);

    setSnippets(prev =>
      prev.map(snippet =>
        snippet.id === id ? { ...snippet, code: latexCode, isLoading: false } : snippet
      )
    );
  } catch (error) {
    console.error('Error processing image:', error);

    if (error instanceof Error && error.message.includes('unsupported image')) {
      setError('Unsupported image format. Please use PNG, JPEG, GIF, or WebP images under 20MB.');
    } else {
      setError('Something went wrong. Sorry about that!');
    }

    setSnippets(prev => prev.filter(snippet => snippet.id !== id));
    URL.revokeObjectURL(imageUrl);
  }
}
