import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aesop Paris — Soins Premium",
  description:
    "Aesop Paris au Le Bon Marché, 24 Rue de Sèvres. Soins botaniques premium, formulations australiennes depuis 1987.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-aesop-cream text-aesop-dark font-sans">
        {children}
      </body>
    </html>
  );
}
