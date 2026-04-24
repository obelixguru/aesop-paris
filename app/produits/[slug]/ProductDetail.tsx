"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const productData: Record<
  string,
  {
    name: string;
    price: Record<string, number>;
    images: string[];
    description: string;
    benefits: string[];
    ingredients: string[];
    application: string;
    rating: number;
    reviews: number;
    badge: string | null;
  }
> = {
  "serum-graine-de-persil": {
    name: "Sérum Hydratant à la Graine de Persil",
    price: { "60ml": 85, "120ml": 145 },
    images: [
      "https://images.unsplash.com/photo-1715702449456-01929266fea8?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1715702480583-1f4e3db0408c?w=1200&auto=format&fit=crop",
    ],
    description:
      "Une hydratation intense et durable qui fortifie la peau contre le froid parisien. Sa texture légère est absorbée instantanément.",
    benefits: [
      "Hydratation profonde pendant 72 heures",
      "Protège contre les agressions climatiques urbaines",
      "Texture légère, absorption immédiate",
      "Convient à tous les types de peau",
    ],
    ingredients: [
      "Extrait de Graine de Persil — antioxydant puissant",
      "Niacinamide — renforce la barrière cutanée",
      "Acide hyaluronique — hydratation multi-couches",
      "Huile de Jojoba — nourrit sans obstruer",
    ],
    application:
      "Appliquer matin et soir sur le visage et le cou nettoyés. Déposer quelques gouttes au creux de la paume, presser délicatement sur la peau. Laisser absorber avant d'appliquer votre crème hydratante.",
    rating: 4.8,
    reviews: 127,
    badge: "Best-seller Le Bon Marché",
  },
  "gel-nettoyant-camomille": {
    name: "Gel Nettoyant à la Camomille",
    price: { "100ml": 45, "200ml": 75 },
    images: [
      "https://images.unsplash.com/photo-1715702480583-1f4e3db0408c?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1690725219036-87400582edab?w=1200&auto=format&fit=crop",
    ],
    description:
      "Un nettoyant doux qui purifie sans dessécher. La camomille apaise les peaux sensibles et prépare le teint à recevoir vos soins.",
    benefits: [
      "Nettoyage en douceur, sans tiraillement",
      "Apaise les peaux réactives et sensibles",
      "Prépare la peau aux soins suivants",
      "Texture gel fraîche et sensorielle",
    ],
    ingredients: [
      "Extrait de Camomille — anti-inflammatoire naturel",
      "Aloe Vera — hydratation et apaisement",
      "Glycérine végétale — maintient l'hydratation",
      "Huile essentielle de Lavande — purifiant doux",
    ],
    application:
      "Masser sur le visage humide matin et soir. Rincer à l'eau tiède. Suivre avec votre tonique et sérum.",
    rating: 4.6,
    reviews: 89,
    badge: null,
  },
  "creme-hydratante-camelia": {
    name: "Crème Hydratante au Camélia",
    price: { "60ml": 67, "120ml": 115 },
    images: [
      "https://images.unsplash.com/photo-1690725219036-87400582edab?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1715702449456-01929266fea8?w=1200&auto=format&fit=crop",
    ],
    description:
      "Une crème riche et enveloppante qui nourrit en profondeur les peaux sèches et déshydratées. L'huile de Camélia restaure l'éclat naturel.",
    benefits: [
      "Nutrition intense pour peaux sèches",
      "Restaure l'éclat naturel du teint",
      "Barrière protectrice contre le froid",
      "Texture fondante, fini satiné",
    ],
    ingredients: [
      "Huile de Camélia — nutrition et éclat",
      "Beurre de Karité — réparation cutanée",
      "Vitamine E — antioxydant naturel",
      "Extrait de Rose — apaisement et confort",
    ],
    application:
      "Appliquer matin et soir sur le visage et le cou après votre sérum. Masser en mouvements circulaires ascendants jusqu'à absorption complète.",
    rating: 4.9,
    reviews: 34,
    badge: "Nouveau",
  },
  "baume-levres-rosehip": {
    name: "Baume à Lèvres au Rosehip",
    price: { "15ml": 29 },
    images: [
      "https://images.unsplash.com/photo-1602631637744-95548611264d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1672883435480-81b9f385654e?w=1200&auto=format&fit=crop",
    ],
    description:
      "Un baume protecteur et réparateur pour les lèvres fragilisées par le climat parisien. Le Rosehip nourrit et régénère en continu.",
    benefits: [
      "Protection et réparation des lèvres sèches",
      "Hydratation longue durée jusqu'à 12 heures",
      "Fini naturel, non collant",
      "Format compact pour un usage quotidien",
    ],
    ingredients: [
      "Huile de Rosehip — régénération cellulaire",
      "Cire d'abeille — barrière protectrice naturelle",
      "Beurre de Cacao — nutrition profonde",
      "Vitamine C — éclat et protection",
    ],
    application:
      "Appliquer généreusement sur les lèvres aussi souvent que nécessaire. Idéal avant l'exposition au froid ou au vent.",
    rating: 4.7,
    reviews: 201,
    badge: null,
  },
  "lotion-corps-geranium": {
    name: "Lotion Corporelle au Géranium",
    price: { "200ml": 53, "500ml": 89 },
    images: [
      "https://images.unsplash.com/photo-1672883435480-81b9f385654e?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602631637744-95548611264d?w=1200&auto=format&fit=crop",
    ],
    description:
      "Une lotion corporelle légère au parfum délicat de géranium et mandarine. Hydrate et parfume la peau tout au long de la journée.",
    benefits: [
      "Hydratation corporelle longue durée",
      "Parfum frais et botanique de géranium",
      "Absorption rapide, fini non gras",
      "Convient à toutes les peaux",
    ],
    ingredients: [
      "Huile essentielle de Géranium — tonifiant et parfumant",
      "Mandarine — fraîcheur et vitalité",
      "Aloe Vera — hydratation apaisante",
      "Huile d'Amande douce — nutrition légère",
    ],
    application:
      "Appliquer sur le corps après la douche, sur peau encore légèrement humide pour optimiser l'absorption. Masser en remontant vers le cœur.",
    rating: 4.5,
    reviews: 76,
    badge: null,
  },
  "creme-mains-resurrection": {
    name: "Crème pour les Mains Resurrection",
    price: { "75ml": 33, "500ml": 73 },
    images: [
      "https://images.unsplash.com/photo-1576536176095-ad6fc461266c?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1690725219036-87400582edab?w=1200&auto=format&fit=crop",
    ],
    description:
      "La crème pour les mains la plus emblématique d'Aesop. Un parfum signature de mandarine, romarin et cèdre qui nourrit les mains abîmées.",
    benefits: [
      "Réparation des mains sèches et abîmées",
      "Parfum signature Aesop reconnaissable",
      "Absorption rapide, pas de résidu gras",
      "Adoucit les cuticules et les ongles",
    ],
    ingredients: [
      "Mandarine — fraîcheur et protection",
      "Romarin — stimulation et réparation",
      "Cèdre de l'Atlas — parfum boisé signature",
      "Beurre de Karité — nutrition intense",
    ],
    application:
      "Appliquer une noisette sur les mains aussi souvent que nécessaire. Masser entre les doigts et sur les cuticules pour un soin complet.",
    rating: 4.9,
    reviews: 312,
    badge: "Best-seller Le Bon Marché",
  },
};

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-aesop-amber/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="text-sm font-medium tracking-wide text-aesop-earth">
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={`text-aesop-dark/40 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {open && <div className="pb-4 text-sm text-aesop-dark/70 leading-relaxed">{children}</div>}
    </div>
  );
}

export default function ProductDetail({ slug }: { slug: string }) {
  const [imageIndex, setImageIndex] = useState(0);

  const product = productData[slug] || productData["serum-graine-de-persil"];
  const sizes = Object.keys(product.price);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const currentPrice = product.price[selectedSize];

  return (
    <>
      <Header />
      <main className="flex-1 pb-20">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <ol className="flex items-center gap-2 text-xs text-aesop-dark/50">
            <li>
              <Link href="/" className="hover:text-aesop-earth transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/produits" className="hover:text-aesop-earth transition-colors">
                Soins
              </Link>
            </li>
            <li>/</li>
            <li className="text-aesop-dark/80">{product.name}</li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Gallery — 100vw on mobile */}
          <div className="-mx-6 md:mx-0">
            <div className="relative aspect-square bg-aesop-light overflow-hidden">
              <Image
                src={product.images[imageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest uppercase bg-aesop-earth text-aesop-cream">
                  {product.badge}
                </span>
              )}
            </div>
            {/* Pagination dots */}
            {product.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === imageIndex ? "bg-aesop-earth" : "bg-aesop-amber/40"
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:pt-4">
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-aesop-earth leading-tight">
              {product.name}
            </h1>

            <p className="mt-2 text-lg font-medium text-aesop-dark">
              {currentPrice}€
            </p>

            {/* Social proof */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-aesop-amber">
                {"★".repeat(Math.floor(product.rating))}
              </span>
              <span className="text-xs text-aesop-dark/50">
                {product.rating}/5 — {product.reviews} avis
              </span>
            </div>

            <p className="mt-6 text-sm text-aesop-dark/70 leading-relaxed max-w-md">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mt-8 flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 text-sm tracking-wide border transition-colors ${
                    selectedSize === size
                      ? "border-aesop-earth bg-aesop-earth text-aesop-cream"
                      : "border-aesop-amber/40 text-aesop-dark/70 hover:border-aesop-earth"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <button className="hidden md:block w-full mt-8 py-3.5 bg-aesop-earth text-aesop-cream text-sm tracking-wide hover:bg-aesop-dark transition-colors">
              Ajouter au panier — {currentPrice}€
            </button>

            {/* Accordion */}
            <div className="mt-10 border-t border-aesop-amber/20">
              <AccordionItem title="Bénéfices cutanés" defaultOpen>
                <ul className="space-y-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="text-aesop-amber mt-0.5">·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem title="Ingrédients clés">
                <ul className="space-y-2">
                  {product.ingredients.map((ing) => (
                    <li key={ing} className="flex items-start gap-2">
                      <span className="text-aesop-amber mt-0.5">·</span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </AccordionItem>

              <AccordionItem title="Gestuelle d'application">
                <p>{product.application}</p>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Sticky mobile CTA with size selector */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-aesop-cream border-t border-aesop-amber/20 px-6 py-3 space-y-2">
          <div className="flex gap-2 justify-center">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-1 text-xs tracking-wide border transition-colors ${
                  selectedSize === size
                    ? "border-aesop-earth bg-aesop-earth text-aesop-cream"
                    : "border-aesop-amber/40 text-aesop-dark/70"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button className="w-full py-3 bg-aesop-earth text-aesop-cream text-sm tracking-wide">
            Ajouter au panier — {currentPrice}€
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
