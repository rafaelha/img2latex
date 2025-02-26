import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images to LaTeX | Free Online Equation Converter",
  description:
    "Upload or paste images of mathematical equations and instantly convert them to LaTeX code. Free, accurate and easy-to-use tool for students, researchers and professionals.",
  keywords:
    "image to LaTeX converter, equation image converter, mathematical expression OCR, convert equation to LaTeX, math OCR tool, LaTeX generator",
  alternates: {
    canonical: "/convert",
  },
  openGraph: {
    title: "Convert Equation Images to LaTeX | Free Online Tool",
    description:
      "Transform photos of mathematical equations into perfect LaTeX code instantly. No signup required.",
    url: "https://img2latex.xyz/convert",
    images: [
      {
        url: "/convert-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image to LaTeX Conversion Tool",
      },
    ],
  },
};
