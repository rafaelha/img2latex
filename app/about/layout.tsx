import type { Metadata } from "next";

const title = "About Img2LaTeX | Free Image to LaTeX Converter";
const description =
  "Learn about Img2LaTeX, the free, open-source equation image to LaTeX converter created by Rafael Haenel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: "https://www.img2latex.xyz/about",
    type: "website",
    siteName: "Img2LaTeX",
    images: [{
      url: "/logo.png",
      width: 1200,
      height: 630,
      alt: "LaTeX Image to Code Converter",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
