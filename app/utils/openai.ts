// 'use client'

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export async function getLatexFromImage(imageFile: File): Promise<string> {
  try {
    const base64Image = await convertToBase64(imageFile);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Convert this image to LaTeX code. Only provide the LaTeX code, no explanations. The LaTeX could must be enclosed in a math environment, either single or double dollar signs ($ or $$). Other environments, i.e., anything with \\begin{}, are not allowed. Return the plane latex. Do not use any latex environments (no ```latex ...```), just simple latex. If the pasted image is not valid latex, simply jokingly or casually describe what you see in a \\text{} command, making a joke about this not being math." },
            { type: "image_url", image_url: { url: base64Image } }
          ],
        },
      ],
    });
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error in getLatexFromImage:', error);
    throw error;
  }
}