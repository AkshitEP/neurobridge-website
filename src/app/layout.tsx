import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuroBridge | Intent-Based Communication",
  description: "NeuroBridge - Revolutionary assistive technology that transforms intent into natural communication through advanced sensors, vision, and AI.",
  keywords: ["assistive technology", "communication device", "accessibility", "AI", "NeuroBridge"],
  authors: [{ name: "NeuroBridge" }],
  openGraph: {
    title: "NeuroBridge | Intent-Based Communication",
    description: "Transform intent into natural communication with NeuroBridge.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
