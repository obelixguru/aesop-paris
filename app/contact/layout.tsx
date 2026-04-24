import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Aesop au Le Bon Marché, 24 Rue de Sèvres, Paris 7e. Prenez rendez-vous pour une consultation personnalisée ou envoyez-nous un message.",
  openGraph: {
    title: "Contactez Aesop Paris",
    description:
      "Le Bon Marché, 24 Rue de Sèvres, 75007 Paris. Consultation personnalisée sur rendez-vous.",
    url: "https://aesop-paris.com/contact",
    images: [
      {
        url: "https://images.unsplash.com/photo-1735448214729-64f6d1920c45?w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Boutique Aesop — intérieur minimaliste",
      },
    ],
  },
  twitter: {
    title: "Contactez Aesop Paris",
    description:
      "Le Bon Marché, 24 Rue de Sèvres, 75007 Paris. Consultation personnalisée.",
    images: [
      "https://images.unsplash.com/photo-1735448214729-64f6d1920c45?w=1200&auto=format&fit=crop",
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
