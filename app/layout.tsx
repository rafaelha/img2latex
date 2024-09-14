import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from './components/StructuredData';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image to LaTeX Converter",
  description: "Convert images of LaTeX equations to editable LaTeX code using AI-powered image recognition. Simply snap an equation and paste.",
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
      <head>
        <StructuredData />
      </head>
      <body className={inter.className} style={{ backgroundColor: 'var(--primary-background)' }}>{children}</body>
    </html>
  );
}
