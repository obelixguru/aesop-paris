import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllPosts, getCategories } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le Journal",
  description:
    "Routines de soins, ingrédients botaniques et conseils d'experts. Le journal Aesop Paris pour une peau architecturale.",
  openGraph: {
    title: "Le Journal — Aesop Paris",
    description:
      "Routines de soins, ingrédients botaniques et conseils d'experts.",
    url: "https://aesop-paris.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-8 md:pt-16 md:pb-10">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-aesop-earth">
            Le Journal
          </h1>
          <p className="mt-3 text-sm text-aesop-dark/60 max-w-lg leading-relaxed">
            Réflexions sur la peau, les ingrédients et l&apos;art de prendre
            soin de soi. Une approche sans superflu, fidèle à notre philosophie.
          </p>
        </section>

        {/* Category chips */}
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`px-4 py-1.5 text-xs tracking-wide whitespace-nowrap ${
                  i === 0
                    ? "bg-aesop-earth text-aesop-cream"
                    : "border border-aesop-amber/40 text-aesop-dark/70 hover:border-aesop-earth hover:text-aesop-earth transition-colors cursor-pointer"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Featured article */}
        {featured && (
          <section className="max-w-7xl mx-auto px-6 pb-12">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-aesop-light overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aesop-dark/70 via-aesop-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span className="text-[10px] tracking-widest uppercase text-aesop-amber">
                    {featured.category}
                  </span>
                  <h2 className="mt-2 text-xl md:text-2xl font-medium text-aesop-cream tracking-tight leading-tight max-w-2xl">
                    {featured.title}
                  </h2>
                  <p className="mt-2 text-xs text-aesop-cream/60">
                    {featured.readingTime} &middot;{" "}
                    {new Date(featured.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Article feed */}
        <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
          <div className="space-y-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-6 items-start"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-aesop-light overflow-hidden shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] tracking-widest uppercase text-aesop-amber">
                    {post.category}
                  </span>
                  <h3 className="mt-1 text-sm md:text-base font-medium text-aesop-dark leading-snug group-hover:text-aesop-earth transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-aesop-dark/50 line-clamp-2 leading-relaxed hidden md:block">
                    {post.description}
                  </p>
                  <p className="mt-2 text-xs text-aesop-dark/40">
                    {post.readingTime} &middot;{" "}
                    {new Date(post.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Inline newsletter CTA */}
          <div className="mt-16 p-8 md:p-12 bg-aesop-light border border-aesop-amber/20 text-center">
            <h3 className="text-lg font-medium tracking-tight text-aesop-earth">
              Recevez nos routines
            </h3>
            <p className="mt-2 text-sm text-aesop-dark/60 max-w-md mx-auto">
              Conseils de soins, nouveaux articles et événements au Bon Marché.
              Pas de spam, jamais.
            </p>
            <form className="mt-6 flex max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                required
                className="flex-1 border border-aesop-amber/40 bg-transparent px-4 py-2.5 text-sm text-aesop-dark placeholder:text-aesop-dark/30 focus:outline-none focus:border-aesop-earth"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-aesop-earth text-aesop-cream text-sm tracking-wide hover:bg-aesop-dark transition-colors"
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
