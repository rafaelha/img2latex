import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "./components/StructuredData";
import Link from "next/link";
import "katex/dist/katex.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image to LaTeX Converter | Convert Equation Images to LaTeX Code",
  description:
    "Free online tool to convert images of mathematical equations to editable LaTeX code using AI-powered image recognition. Instantly transform handwritten or digital equation images into perfect LaTeX.",
  keywords:
    "LaTeX, Image to LaTeX, Snip to LaTeX, LaTeX Image to Code Converter, AI-powered image recognition, equation converter, math to LaTeX, OCR for math, math equation converter",
  authors: [{ name: "Img2LaTeX" }],
  creator: "Img2LaTeX",
  publisher: "Img2LaTeX",
  metadataBase: new URL("https://img2latex.xyz"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "LaTeX Image to Code Converter | Free Math Equation Converter",
    description:
      "Convert images of LaTeX equations to editable LaTeX code using AI-powered image recognition. Free, instant and accurate.",
    type: "website",
    url: "https://img2latex.xyz",
    siteName: "Img2LaTeX",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LaTeX Image to Code Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Equation Images to LaTeX Code Instantly",
    description:
      "Free tool to transform equation images into perfect LaTeX code",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen`}
        style={{ backgroundColor: "var(--primary-background)" }}
      >
        <main className="flex-grow">{children}</main>
        <footer className="w-full py-4 text-center border-t border-gray-100">
          <div className="container mx-auto">
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "4px",
              }}
            >
              About
            </Link>
          </div>
        </footer>
        <StructuredData />
      </body>
    </html>
  );
}
