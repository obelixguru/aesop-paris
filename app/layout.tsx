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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://aesop-paris.com/#localbusiness",
  name: "Aesop Le Bon Marché",
  image: "https://aesop-paris.com/logo.png",
  url: "https://aesop-paris.com",
  telephone: "+33-1-42-22-88-00",
  description:
    "Boutique Aesop au Le Bon Marché. Soins botaniques premium, formulations australiennes depuis 1987.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "24 Rue de Sèvres, Ground Floor",
    addressLocality: "Paris",
    postalCode: "75007",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.8509,
    longitude: 2.3241,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "19:00",
    },
  ],
  priceRange: "€€€",
  sameAs: [
    "https://www.instagram.com/aesopskincare/",
    "https://www.facebook.com/AesopSkinCare/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-aesop-cream text-aesop-dark font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
