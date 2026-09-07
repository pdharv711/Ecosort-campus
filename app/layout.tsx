import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoSort Campus – Smart Waste Segregation",
  description:
    "AI-powered waste classification assistant for university campuses. Know it. Sort it. Sustain it.",
  keywords: ["waste segregation", "AI", "sustainability", "SDG 12", "campus", "IBM Granite"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
