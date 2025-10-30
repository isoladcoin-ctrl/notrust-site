import "./globals.css";
import React from "react";

export const metadata = { title: "NOTRUST", description: "Tokenomics & Roadmap" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-black text-white">{children}</body>
    </html>
  );
}
