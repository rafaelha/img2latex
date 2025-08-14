import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with server-side environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Server-side only, no NEXT_PUBLIC_ prefix
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the base64 image
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Validate that the image is in base64 format
    if (!image.startsWith("data:image/")) {
      return NextResponse.json(
        { error: "Invalid image format" },
        { status: 400 }
      );
    }

    // Make the OpenAI API call - force use of gpt-4.1-mini model for security
    const response = await openai.chat.completions.create({
      model: "gpt-5-mini", // Hardcoded to prevent abuse
      max_completion_tokens: 1000, // Limit token usage
      reasoning_effort: "low",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Convert this image to LaTeX code. Only provide the LaTeX code, no explanations. The LaTeX code must be enclosed in a math environment, like \\begin{align} ... \\end{align} or \\begin{align*} ... \\end{align*} if no equation numbers are in the image. Do not use \\tag{}. Note that the align environment adds line numbers automatically. Also make sure to set & for alignment if there are multi line equations. Return the plain LaTeX. Do not use ```latex ...``` enclosings for our output, just simple LaTeX. If the pasted image is not valid LaTeX, first try your best to interpret it. For example, users might paste in a single symbol - you can return the appropriate LaTeX command for that symbol. Or users might upload a photo of a paper. Do your best to identify the equation in the centre and ignore any surrounding text. If there is really no way to transcribe the image into LaTeX, simply jokingly or casually describe what you see in a phrase that contains latex commands or symbols in some funny way - be creative!",
            },
            {
              type: "image_url",
              image_url: { url: image },
            },
          ],
        },
      ],
    });

    const latexCode = response.choices[0].message.content || "";

    return NextResponse.json({ latex: latexCode });
  } catch (error) {
    console.error("Error in convert-image API:", error);

    // Return a generic error message to avoid exposing internal details
    return NextResponse.json(
      { error: "Failed to convert image to LaTeX" },
      { status: 500 }
    );
  }
}
