import React from "react";

// Re-export the page metadata from this server component so the client
// `page.tsx` still gets proper SEO tags for the /convert route.
export { metadata } from "./metadata";

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
