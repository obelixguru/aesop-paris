import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soins Botaniques",
  description:
    "Découvrez la gamme complète de soins botaniques Aesop. Sérums, nettoyants, hydratants et baumes formulés avec des ingrédients naturels premium.",
  openGraph: {
    title: "Soins Botaniques — Aesop Paris",
    description:
      "Sérums, nettoyants, hydratants et baumes. Ingrédients naturels premium, formulations australiennes.",
    url: "https://aesop-paris.com/produits",
    images: [
      {
        url: "https://images.unsplash.com/photo-1715702480583-1f4e3db0408c?w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Gamme de soins botaniques Aesop",
      },
    ],
  },
  twitter: {
    title: "Soins Botaniques — Aesop Paris",
    description:
      "Sérums, nettoyants, hydratants et baumes. Ingrédients naturels premium.",
    images: [
      "https://images.unsplash.com/photo-1715702480583-1f4e3db0408c?w=1200&auto=format&fit=crop",
    ],
  },
};

const categories = [
  { id: "visage", label: "Visage" },
  { id: "corps", label: "Corps" },
  { id: "mains", label: "Mains" },
  { id: "cheveux", label: "Cheveux" },
];

const products = [
  {
    slug: "serum-graine-de-persil",
    name: "Sérum Hydratant à la Graine de Persil",
    category: "visage",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1715702449456-01929266fea8?w=800&auto=format&fit=crop",
    badge: "Best-seller",
    rating: 4.8,
    reviews: 127,
  },
  {
    slug: "gel-nettoyant-camomille",
    name: "Gel Nettoyant à la Camomille",
    category: "visage",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1715702480583-1f4e3db0408c?w=800&auto=format&fit=crop",
    badge: null,
    rating: 4.6,
    reviews: 89,
  },
  {
    slug: "creme-hydratante-camelia",
    name: "Crème Hydratante au Camélia",
    category: "visage",
    price: 67,
    image:
      "https://images.unsplash.com/photo-1690725219036-87400582edab?w=800&auto=format&fit=crop",
    badge: "Nouveau",
    rating: 4.9,
    reviews: 34,
  },
  {
    slug: "baume-levres-rosehip",
    name: "Baume à Lèvres au Rosehip",
    category: "visage",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1602631637744-95548611264d?w=800&auto=format&fit=crop",
    badge: null,
    rating: 4.7,
    reviews: 201,
  },
  {
    slug: "lotion-corps-geranium",
    name: "Lotion Corporelle au Géranium",
    category: "corps",
    price: 53,
    image:
      "https://images.unsplash.com/photo-1672883435480-81b9f385654e?w=800&auto=format&fit=crop",
    badge: null,
    rating: 4.5,
    reviews: 76,
  },
  {
    slug: "creme-mains-resurrection",
    name: "Crème pour les Mains Resurrection",
    category: "mains",
    price: 33,
    image:
      "https://images.unsplash.com/photo-1576536176095-ad6fc461266c?w=800&auto=format&fit=crop",
    badge: "Best-seller",
    rating: 4.9,
    reviews: 312,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-xs text-aesop-amber tracking-wide">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}{" "}
      <span className="text-aesop-dark/50">{rating}/5</span>
    </span>
  );
}

export default function ProduitsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-8 md:pt-16 md:pb-12">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-aesop-earth">
            Soins
          </h1>
          <p className="mt-3 text-sm text-aesop-dark/60 max-w-lg leading-relaxed">
            Des formulations botaniques rigoureuses, conçues pour accompagner
            votre peau au quotidien. Chaque produit est le fruit d&apos;années
            de recherche et d&apos;un engagement envers l&apos;efficacité.
          </p>
        </section>

        {/* Category filters */}
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="px-4 py-1.5 text-xs tracking-wide bg-aesop-earth text-aesop-cream whitespace-nowrap">
              Tous
            </span>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="px-4 py-1.5 text-xs tracking-wide border border-aesop-amber/40 text-aesop-dark/70 whitespace-nowrap hover:border-aesop-earth hover:text-aesop-earth transition-colors cursor-pointer"
              >
                {cat.label}
              </span>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/produits/${product.slug}`}
                className="group"
              >
                <div className="relative aspect-square bg-aesop-light overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-[10px] tracking-widest uppercase bg-aesop-earth text-aesop-cream">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-aesop-dark leading-snug">
                    {product.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-[10px] text-aesop-dark/40">
                      ({product.reviews} avis)
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-aesop-earth">
                    {product.price}€
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
