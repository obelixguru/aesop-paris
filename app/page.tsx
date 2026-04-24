import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Aesop Paris — Soins Botaniques Premium au Le Bon Marché",
  description:
    "Découvrez les soins botaniques Aesop au Le Bon Marché, 24 Rue de Sèvres, Paris 7e. Formulations australiennes premium depuis 1987. Sérums, nettoyants, hydratants.",
  openGraph: {
    title: "Aesop Paris — Soins Botaniques Premium",
    description:
      "Formulations australiennes premium depuis 1987. Retrouvez-nous au Le Bon Marché, Paris 7e.",
    url: "https://aesop-paris.com",
    images: [
      {
        url: "https://images.unsplash.com/photo-1715702449456-01929266fea8?w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Soins botaniques Aesop — sérum premium",
      },
    ],
  },
  twitter: {
    title: "Aesop Paris — Soins Botaniques Premium",
    description:
      "Formulations australiennes premium depuis 1987. Au Le Bon Marché, Paris 7e.",
    images: [
      "https://images.unsplash.com/photo-1715702449456-01929266fea8?w=1200&auto=format&fit=crop",
    ],
  },
};

const bestsellers = [
  {
    name: "Sérum Graine de Persil",
    price: "85€",
    image:
      "https://images.unsplash.com/photo-1715702449456-01929266fea8?w=800&auto=format&fit=crop",
    href: "/produits/serum-graine-de-persil",
  },
  {
    name: "Gel Nettoyant Camomille",
    price: "45€",
    image:
      "https://images.unsplash.com/photo-1715702480583-1f4e3db0408c?w=800&auto=format&fit=crop",
    href: "/produits/gel-nettoyant-camomille",
  },
  {
    name: "Crème Hydratante Camélia",
    price: "67€",
    image:
      "https://images.unsplash.com/photo-1690725219036-87400582edab?w=800&auto=format&fit=crop",
    href: "/produits/creme-hydratante-camelia",
  },
  {
    name: "Baume à Lèvres Rosehip",
    price: "29€",
    image:
      "https://images.unsplash.com/photo-1602631637744-95548611264d?w=800&auto=format&fit=crop",
    href: "/produits/baume-levres-rosehip",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero — vh-60, CTA visible sans scroll */}
        <section className="relative h-[60vh] min-h-[400px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1715702449456-01929266fea8?w=1400&auto=format&fit=crop"
            alt="Soins Aesop — formulations botaniques premium"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aesop-dark/60 via-aesop-dark/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
            <h1 className="text-4xl md:text-5xl font-medium text-aesop-cream tracking-tight leading-tight">
              L&apos;architecture de la peau.
            </h1>
            <p className="mt-3 text-lg text-aesop-cream/80 max-w-md">
              Formules australiennes pures. Une routine minimaliste pour
              affronter le climat urbain parisien.
            </p>
            <Link
              href="/produits"
              className="inline-block mt-6 px-8 py-3 bg-aesop-earth text-aesop-cream text-sm tracking-wide hover:bg-aesop-dark transition-colors"
            >
              Découvrir la gamme
            </Link>
          </div>
        </section>

        {/* Value Pillars — Ancrage local en premier */}
        <section className="bg-aesop-amber/20 border-y border-aesop-amber/30">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm font-medium tracking-wide text-aesop-earth">
                Ancrage local
              </p>
              <p className="text-xs mt-1 text-aesop-dark/60">
                Retrouvez nos experts au Bon Marché, Paris 7e
              </p>
            </div>
            <div>
              <p className="text-sm font-medium tracking-wide text-aesop-earth">
                Science botanique
              </p>
              <p className="text-xs mt-1 text-aesop-dark/60">
                Des ingrédients sourcés pour leur efficacité absolue
              </p>
            </div>
            <div>
              <p className="text-sm font-medium tracking-wide text-aesop-earth">
                Design fonctionnel
              </p>
              <p className="text-xs mt-1 text-aesop-dark/60">
                Aucun superflu, de la formulation au flacon
              </p>
            </div>
          </div>
        </section>

        {/* Bestsellers — Grid 2 colonnes mobile, 4 desktop */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-2xl font-medium tracking-tight text-aesop-earth mb-10">
            Les essentiels de la saison
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group"
              >
                <div className="relative aspect-square bg-aesop-light overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium text-aesop-dark">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-aesop-earth">{product.price}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Localisation */}
        <section className="bg-aesop-light border-y border-aesop-amber/20">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-2xl font-medium tracking-tight text-aesop-earth">
                Rencontrons-nous.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-aesop-dark/70 max-w-md">
                Nos consultants vous reçoivent au Bon Marché Rive Gauche pour
                une prescription sur mesure. Découvrez nos formulations et
                trouvez la routine qui convient à votre peau.
              </p>
              <address className="mt-6 not-italic text-sm text-aesop-dark/60 leading-relaxed">
                Le Bon Marché, 24 Rue de Sèvres
                <br />
                Ground Floor, 75007 Paris
              </address>
              <Link
                href="/contact"
                className="inline-block mt-6 px-6 py-2 border border-aesop-earth text-aesop-earth text-sm tracking-wide hover:bg-aesop-earth hover:text-aesop-cream transition-colors"
              >
                Nous trouver
              </Link>
            </div>
            <div className="w-full md:w-1/2 aspect-[4/3] relative bg-aesop-amber/10">
              <Image
                src="https://images.unsplash.com/photo-1735448213858-6bdfdf78967a?w=800&auto=format&fit=crop"
                alt="Boutique Aesop au Bon Marché Paris"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
