import React from "react";

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Img2LaTeX - LaTeX Image to Code Converter",
    description:
      "Free online tool to convert images of mathematical equations to editable LaTeX code using AI-powered image recognition.",
    url: "https://img2latex.xyz",
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
      "Free with no usage limitations",
    ],
    screenshot: "https://img2latex.xyz/og-image.jpg",
    softwareVersion: "1.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "Img2LaTeX",
      url: "https://img2latex.xyz",
    },
    publisher: {
      "@type": "Organization",
      name: "Img2LaTeX",
      url: "https://img2latex.xyz",
    },
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I convert an image to LaTeX?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply upload or paste your equation image and our AI will instantly convert it to editable LaTeX code.",
        },
      },
      {
        "@type": "Question",
        name: "Is Img2LaTeX free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Img2LaTeX is completely free with no usage limitations or subscriptions required.",
        },
      },
      {
        "@type": "Question",
        name: "What types of equations can be converted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our tool can handle a wide range of mathematical notations including fractions, integrals, matrices, Greek symbols, and complex expressions.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is the conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI-powered recognition system provides high accuracy for most equation images, especially those with clear visibility.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
    </>
  );
};

export default StructuredData;
