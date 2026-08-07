import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { normalizeLatexSource } from "../../utils/latex";

// Initialize OpenAI client with server-side environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Server-side only, no NEXT_PUBLIC_ prefix
});

// Model is hardcoded (not taken from the request) so the public endpoint can't
// be abused to call arbitrary/expensive models.
const MODEL = "gpt-5.6-luna";

const PROMPT = [
  "Convert this image to LaTeX code. Only provide the LaTeX code, no explanations.",
  "Return only the equation contents that belong inside an implicit \\begin{align*} ... \\end{align*} renderer.",
  "Do not return a top-level math environment or delimiters such as \\begin{...}, \\end{...}, $, \\(, \\), \\[, or \\].",
  "Keep meaningful inner environments such as \\begin{matrix} or \\begin{cases} when they are part of the expression.",
  "Also make sure to set & for alignment if there are multi line equations.",
  "Return the plain LaTeX. Do not wrap the output in ```latex ... ``` fences, just plain LaTeX.",
  "If the image is not valid LaTeX, first try your best to interpret it — e.g. a single pasted symbol",
  "should return the appropriate LaTeX command for that symbol.",
  "If the user uploads a photo of a paper, identify the equation in the centre and ignore surrounding text.",
  "If there is really no way to transcribe the image, jokingly or casually describe what you see in a",
  "phrase that uses LaTeX commands or symbols in some funny way — be creative!",
].join(" ");

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

    const response = await openai.chat.completions.create({
      model: MODEL,
      max_completion_tokens: 4000,
      reasoning_effort: "medium",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
    });

    const latexCode = normalizeLatexSource(
      response.choices[0].message.content || ""
    );

    return NextResponse.json({ latex: latexCode });
  } catch (error) {
    // Log the actionable parts of OpenAI errors (status/code/message) so issues
    // like an invalid key, missing scope, or deprecated model are obvious in the
    // server logs instead of a bare 500.
    if (error instanceof OpenAI.APIError) {
      console.error(
        `OpenAI API error in convert-image: status=${error.status} code=${error.code} type=${error.type} message=${error.message}`
      );
    } else {
      console.error("Error in convert-image API:", error);
    }

    // Return a generic error message to avoid exposing internal details
    return NextResponse.json(
      { error: "Failed to convert image to LaTeX" },
      { status: 500 }
    );
  }
}
