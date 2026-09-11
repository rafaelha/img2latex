import React from "react";
import { faqs } from "../utils/faqs";

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Img2LaTeX - LaTeX Image to Code Converter",
    description:
      "Free online tool to convert images of mathematical equations to editable LaTeX code using AI-powered image recognition.",
    url: "https://www.img2latex.xyz",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Instant conversion of equation images to LaTeX",
      "High accuracy AI-powered recognition",
      "Support for complex mathematical notations",
      "Free LaTeX OCR tool with no usage limitations",
    ],
    logo: "https://www.img2latex.xyz/logo.png",
    softwareVersion: "1.0",
    author: {
      "@type": "Organization",
      name: "Img2LaTeX",
      url: "https://www.img2latex.xyz",
    },
    publisher: {
      "@type": "Organization",
      name: "Img2LaTeX",
      url: "https://www.img2latex.xyz",
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c") }}
      />
    </>
  );
};

export default StructuredData;
