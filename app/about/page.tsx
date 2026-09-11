"use client";

import React from "react";
import Link from "next/link";
import { EB_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const serif = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export default function About() {
  return (
    <div
      className={serif.className}
      style={{ color: "var(--primary-text)" }}
    >
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center max-w-2xl"
        >
          <h1
            className="leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
          >
            About
          </h1>

          <p
            className="mt-8"
            style={{
              fontSize: "clamp(1.15rem, 2.6vw, 1.5rem)",
              lineHeight: 1.7,
              opacity: 0.8,
            }}
          >
            Img2LaTeX was built by researchers, for{" "}
            <em style={{ fontStyle: "italic" }}>everyone</em>. A free tool that
            turns a picture of any equation into clean, editable LaTeX — so you
            can spend your time on the ideas, not the typing.
          </p>

          <div
            className="mt-14 pt-10 border-t w-full"
            style={{ borderColor: "var(--border-color)" }}
          >
            <p className="text-xl sm:text-2xl">Made by Rafael Haenel</p>
            <p className="mt-2 text-base" style={{ opacity: 0.6 }}>
              Vancouver, BC
            </p>
            <p
              className="mt-8 text-base"
              style={{ fontStyle: "italic", opacity: 0.55 }}
            >
              Transforming equations into code, one image at a time.
            </p>
          </div>

          <Link
            href="/"
            className="mt-14 text-base sm:text-lg border-b pb-0.5 transition-opacity duration-200 hover:opacity-60"
            style={{ borderColor: "var(--primary-text)", opacity: 0.7 }}
          >
            &larr; Back to home
          </Link>
        </motion.div>
      </section>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
