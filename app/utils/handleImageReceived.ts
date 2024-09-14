import { getLatexFromImage } from './openai';
import { getDominantColor } from './imageUtils';

interface SnippetData {
  id: number;
  code: string;
  isLoading: boolean;
  imageUrl: string | null;
  backgroundColor: string;
}

export const handleImageReceived = (
  file: File,
  snippets: SnippetData[],
  setSnippets: React.Dispatch<React.SetStateAction<SnippetData[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  return async () => {
    const newId = snippets.length + 1;
    const imageUrl = URL.createObjectURL(file);

    try {
      const dominantColor = await getDominantColor(imageUrl);

      setSnippets(prev => [...prev, { 
        id: newId, 
        code: '', 
        isLoading: true, 
        imageUrl, 
        backgroundColor: dominantColor 
      }]);

      const latexCode = await getLatexFromImage(file);

      setSnippets(prev => prev.map(snippet => 
        snippet.id === newId ? { ...snippet, code: latexCode, isLoading: false } : snippet
      ));
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Something went wrong. Sorry about that!');
      setSnippets(prev => prev.filter(snippet => snippet.id !== newId));
      URL.revokeObjectURL(imageUrl);
    }
  };
};