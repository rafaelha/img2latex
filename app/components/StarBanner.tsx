import React from "react";

const REPO = "rafaelha/img2latex";

// Live GitHub star count via shields.io — no JS, auto-updating, cached upstream.
const BADGE_URL =
  `https://img.shields.io/github/stars/${REPO}` +
  `?style=flat&label=Like%20img2latex%3F%20Leave%20a%20star&color=yellow&logo=github`;

export default function StarBanner() {
  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Star img2latex on GitHub"
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 1000,
        lineHeight: 0,
        borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* shields.io serves a dynamic SVG; a plain <img> avoids remote-image config. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BADGE_URL}
        alt="Like img2latex? Leave a star on GitHub"
        height={28}
        style={{ display: "block", borderRadius: 6 }}
      />
    </a>
  );
}
