import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from './components/StructuredData';
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image to LaTeX Converter",
  description: "Convert images of LaTeX equations to editable LaTeX code using AI-powered image recognition. Simply snap an equation and paste.",
  keywords: "LaTeX, Image to LaTeX, Snip to LaTeX, LaTeX Image to Code Converter, AI-powered image recognition",
  openGraph: {
    title: "LaTeX Image to Code Converter",
    description: "Convert images of LaTeX equations to editable LaTeX code using AI-powered image recognition.",
    type: "website",
    url: "https://img2latex.xyz",
    // images: [
    //   {
    //     url: "https://your-website-url.com/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "LaTeX Image to Code Converter",
    //   },
    // ],
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
        style={{ backgroundColor: 'var(--primary-background)' }}
      >
        <main className="flex-grow">{children}</main>
        <footer className="text-center text-xs mt-8 mb-2">
          <Link href="/about" className="text-gray-500 hover:text-gray-700">
            About
          </Link>
        </footer>
        <StructuredData />
      </body>
    </html>
  );
}
