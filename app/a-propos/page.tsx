import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "Fondée à Melbourne en 1987, Aesop crée des formulations botaniques rigoureuses. Découvrez notre philosophie et notre engagement envers la qualité.",
  openGraph: {
    title: "Notre histoire — Aesop Paris",
    description:
      "De Melbourne à Paris. Depuis 1987, des formulations botaniques rigoureuses au service de la peau.",
    url: "https://aesop-paris.com/a-propos",
    images: [
      {
        url: "https://images.unsplash.com/photo-1761746604770-abc00f8e55b8?w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Ingrédients botaniques Aesop",
      },
    ],
  },
  twitter: {
    title: "Notre histoire — Aesop Paris",
    description:
      "De Melbourne à Paris. Formulations botaniques rigoureuses depuis 1987.",
    images: [
      "https://images.unsplash.com/photo-1761746604770-abc00f8e55b8?w=1200&auto=format&fit=crop",
    ],
  },
};

const timeline = [
  {
    year: "1987",
    title: "Fondation à Melbourne",
    text: "Dennis Paphitis crée Aesop dans un salon de coiffure, formulant à la main des soins capillaires à base de plantes.",
  },
  {
    year: "1996",
    title: "Premiers soins visage",
    text: "Lancement de la gamme Soins du Visage, avec le Sérum à la Graine de Persil qui deviendra un classique mondial.",
  },
  {
    year: "2004",
    title: "Expansion internationale",
    text: "Ouverture des premières boutiques en Europe et en Asie, chacune conçue par un architecte différent.",
  },
  {
    year: "2015",
    title: "Arrivée à Paris",
    text: "Aesop s'installe au Bon Marché Rive Gauche, écrin naturel pour une marque qui mêle design et botanique.",
  },
];

const values = [
  {
    title: "Rigueur botanique",
    text: "Chaque formulation est le fruit de recherches approfondies sur les propriétés des plantes. Nous sélectionnons nos ingrédients pour leur efficacité prouvée, jamais pour leur marketing.",
  },
  {
    title: "Design architectural",
    text: "Nos boutiques, nos flacons, nos espaces — tout est pensé comme un objet fonctionnel. Le design n'est pas un ornement, c'est une méthode.",
  },
  {
    title: "Durabilité silencieuse",
    text: "Nous préférons les actes aux déclarations. Nos emballages sont recyclables, nos formules biodégradables, nos chaînes d'approvisionnement transparentes.",
  },
];

export default function AProposPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[350px] flex items-end">
          <Image
            src="https://images.unsplash.com/photo-1761746604770-abc00f8e55b8?w=1400&auto=format&fit=crop"
            alt="Ingrédients botaniques — formulations Aesop"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aesop-dark/70 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
            <h1 className="text-3xl md:text-4xl font-medium text-aesop-cream tracking-tight">
              Notre histoire
            </h1>
            <p className="mt-3 text-sm text-aesop-cream/80 max-w-lg leading-relaxed">
              Depuis 1987, nous formulons des soins botaniques avec une seule
              obsession : l&apos;efficacité sans compromis.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-medium tracking-tight text-aesop-earth">
              Une approche sans superflu
            </h2>
            <p className="mt-6 text-sm text-aesop-dark/70 leading-relaxed">
              Aesop est née d&apos;une conviction simple : les meilleurs soins
              naissent de la rencontre entre la science botanique et le design
              fonctionnel. Nous ne suivons pas les tendances. Nous investissons
              dans la recherche, le sourcing éthique et la formulation
              rigoureuse.
            </p>
            <p className="mt-4 text-sm text-aesop-dark/70 leading-relaxed">
              Chaque produit est conçu pour faire exactement ce qu&apos;il
              promet, rien de plus. Cette discipline se retrouve dans nos
              boutiques, nos emballages et notre communication. Le luxe, pour
              nous, réside dans la substance — jamais dans le spectacle.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-aesop-light border-y border-aesop-amber/20">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <h2 className="text-2xl font-medium tracking-tight text-aesop-earth mb-12">
              Nos principes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="text-sm font-medium tracking-wide text-aesop-earth">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-aesop-dark/60 leading-relaxed">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h2 className="text-2xl font-medium tracking-tight text-aesop-earth mb-12">
            Chronologie
          </h2>
          <div className="space-y-10 max-w-2xl">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="flex gap-6 md:gap-10 items-start"
              >
                <span className="text-2xl font-medium text-aesop-amber/60 shrink-0 w-16 tabular-nums">
                  {item.year}
                </span>
                <div className="border-l border-aesop-amber/30 pl-6 md:pl-10">
                  <h3 className="text-sm font-medium text-aesop-earth">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-aesop-dark/60 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-aesop-dark">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-2xl font-medium text-aesop-cream tracking-tight">
              Rencontrons-nous
            </h2>
            <p className="mt-4 text-sm text-aesop-cream/60 max-w-md mx-auto leading-relaxed">
              Nos consultants vous accueillent au Bon Marché Rive Gauche pour
              une consultation personnalisée.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-8 px-8 py-3 border border-aesop-cream/30 text-aesop-cream text-sm tracking-wide hover:bg-aesop-cream/10 transition-colors"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
