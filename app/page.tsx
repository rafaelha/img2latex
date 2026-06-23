"use client";

import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Latex from "react-latex-next";
import { useDropzone } from "react-dropzone";
import { EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { setPendingImage } from "./utils/pendingImage";

const serif = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const steps = [
  {
    title: "Upload or paste",
    body: "Drag in a screenshot, photo, or scan of any equation — or paste straight from your clipboard.",
  },
  {
    title: "We read the math",
    body: "An AI model trained on scientific notation transcribes the image into precise LaTeX.",
  },
  {
    title: "Copy the code",
    body: "Get clean, editable LaTeX ready to drop into your paper, thesis, or notes.",
  },
];

const faqs = [
  {
    q: "What is Img2LaTeX?",
    a: "Img2LaTeX is a free online tool that converts images of mathematical equations into editable LaTeX code using AI-powered OCR. Upload a screenshot, photo, or scan and get clean LaTeX in seconds.",
  },
  {
    q: "Is it really free?",
    a: "Yes. Img2LaTeX is completely free, with no account, no subscription, and no limits on how many equations you convert.",
  },
  {
    q: "What kinds of images work?",
    a: "Screenshots from papers and slides, photos of handwritten notes, scans, and clipboard pastes all work. The tool focuses on the equation and ignores surrounding text.",
  },
  {
    q: "What can I do with the output?",
    a: "The generated LaTeX drops directly into documents, theses, presentations, Overleaf projects, and notes — anywhere LaTeX is supported.",
  },
];

export default function LandingPage() {
  return (
    <div className={serif.className} style={{ color: "var(--primary-text)" }}>
      {/* ---------- Hero ---------- */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center max-w-3xl"
        >
          <h1
            className="leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)" }}
          >
            Convert images to <Latex>{"$\\LaTeX$"}</Latex>.
          </h1>

          <p
            className="mt-6"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.85rem)", opacity: 0.7 }}
          >
            From scientists for{" "}
            <em style={{ fontStyle: "italic" }}>everyone</em>. Always free.
          </p>

          <HeroDropzone />

          <Link
            href="/convert"
            className="mt-8 text-sm sm:text-base border-b pb-0.5 transition-opacity duration-200 hover:opacity-60"
            style={{ borderColor: "var(--primary-text)", opacity: 0.6 }}
          >
            Or click here &rarr;
          </Link>
        </motion.div>
      </section>

      {/* ---------- What it is (SEO intro) ---------- */}
      <Section>
        <h2 className="text-center" style={headingStyle}>
          Image to LaTeX, instantly
        </h2>
        <p
          className="mt-8 mx-auto text-center"
          style={{
            fontSize: "clamp(1.1rem, 2.4vw, 1.4rem)",
            lineHeight: 1.7,
            opacity: 0.8,
            maxWidth: "44rem",
          }}
        >
          Img2LaTeX is a free LaTeX OCR tool that converts images of
          mathematical equations into clean, editable LaTeX code. Paste a
          screenshot from a paper, snap a photo of handwritten notes, or drop in
          a scan — and get accurate LaTeX in seconds. Built by researchers for
          everyone.
        </p>
      </Section>

      {/* ---------- How it works ---------- */}
      <Section>
        <h2 className="text-center" style={headingStyle}>
          How it works
        </h2>
        <ol className="mt-14 mx-auto max-w-3xl grid gap-12 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="text-center">
              <div
                style={{ fontSize: "2.5rem", opacity: 0.4, fontStyle: "italic" }}
              >
                {i + 1}
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl">{step.title}</h3>
              <p
                className="mt-3 text-base"
                style={{ lineHeight: 1.65, opacity: 0.7 }}
              >
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- FAQ (SEO) ---------- */}
      <Section>
        <h2 className="text-center" style={headingStyle}>
          Questions
        </h2>
        <dl className="mt-14 mx-auto max-w-2xl flex flex-col gap-10">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="text-xl sm:text-2xl">{faq.q}</dt>
              <dd
                className="mt-2 text-base"
                style={{ lineHeight: 1.7, opacity: 0.7 }}
              >
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------- Closing CTA ---------- */}
      <section className="px-6 py-28 text-center">
        <h2 style={headingStyle}>
          Always free. For <em style={{ fontStyle: "italic" }}>everyone</em>.
        </h2>
        <div className="mt-10">
          <Link
            href="/convert"
            className="text-lg sm:text-xl border-b pb-1 transition-opacity duration-200 hover:opacity-60"
            style={{ borderColor: "var(--primary-text)" }}
          >
            Convert an image &rarr;
          </Link>
        </div>
      </section>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}

const headingStyle: React.CSSProperties = {
  fontSize: "clamp(1.85rem, 4.5vw, 2.75rem)",
  lineHeight: 1.15,
  letterSpacing: "-0.01em",
};

function HeroDropzone() {
  const router = useRouter();

  const forward = useCallback(
    (file: File) => {
      setPendingImage(file);
      router.push("/convert");
    },
    [router]
  );

  const onDrop = useCallback(
    (files: File[]) => {
      if (files[0]) forward(files[0]);
    },
    [forward]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Paste an image anywhere on the landing page (Ctrl/Cmd+V).
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const items = Array.from(event.clipboardData?.items || []);
      for (const item of items) {
        if (item.type.startsWith("image")) {
          const file = item.getAsFile();
          if (file) {
            event.preventDefault();
            forward(file);
            return;
          }
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [forward]);

  return (
    <div
      {...getRootProps()}
      className="mt-12 w-full max-w-xl cursor-pointer rounded-lg border border-dashed px-8 py-10 text-center transition-opacity duration-200 hover:opacity-70"
      style={{
        borderColor: "var(--primary-text)",
        opacity: isDragActive ? 0.7 : 1,
      }}
    >
      <input {...getInputProps()} />
      <p className="text-lg sm:text-xl">
        {isDragActive
          ? "Drop to convert"
          : "Drop an image, click to upload, or paste"}
      </p>
      <p className="mt-2 text-sm" style={{ opacity: 0.5 }}>
        PNG, JPEG, GIF, or WebP
      </p>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="px-6 py-24 border-t"
      style={{ borderColor: "var(--border-color)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-5xl"
      >
        {children}
      </motion.div>
    </section>
  );
}
