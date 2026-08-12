import type { Metadata } from "next";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import ThemeController from "../components/ThemeController";

export const metadata: Metadata = {
  title: "Phoneme Activity Builder",
  description:
    "A phoneme-based classroom activity builder for Speech Pathology teachers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <ThemeController />
        <Navbar />

        <div className="min-h-screen">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}