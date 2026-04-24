import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} — Le Journal Aesop Paris`,
      description: post.description,
      url: `https://aesop-paris.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: `https://aesop-paris.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== slug);
  const related = allPosts.slice(0, 2);

  const mdxComponents = {
    h2: (props: React.ComponentProps<"h2">) => (
      <h2 className="text-xl md:text-2xl font-medium text-aesop-earth mt-10 mb-4 tracking-tight" {...props} />
    ),
    h3: (props: React.ComponentProps<"h3">) => (
      <h3 className="text-lg font-medium text-aesop-dark mt-6 mb-3" {...props} />
    ),
    p: (props: React.ComponentProps<"p">) => (
      <p className="text-aesop-dark/80 leading-[1.8] mb-5 text-[15px]" {...props} />
    ),
    strong: (props: React.ComponentProps<"strong">) => (
      <strong className="font-medium text-aesop-dark" {...props} />
    ),
    ul: (props: React.ComponentProps<"ul">) => (
      <ul className="list-disc pl-6 mb-5 space-y-1.5" {...props} />
    ),
    li: (props: React.ComponentProps<"li">) => (
      <li className="text-aesop-dark/80 leading-relaxed text-[15px]" {...props} />
    ),
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative h-[50vh] min-h-[350px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aesop-dark/70 via-aesop-dark/30 to-transparent" />
        </div>

        {/* Article */}
        <article className="max-w-2xl mx-auto px-6 -mt-20 relative z-10">
          {/* Meta */}
          <div className="mb-6">
            <span className="text-[10px] tracking-widest uppercase text-aesop-amber">
              {post.category}
            </span>
            <h1 className="mt-2 text-2xl md:text-3xl font-medium text-aesop-cream tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-xs text-aesop-cream/60">
              {post.readingTime} &middot;{" "}
              {new Date(post.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Content */}
          <div className="bg-aesop-cream p-6 md:p-10">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Credit */}
          {post.imageCredit && (
            <p className="mt-4 text-xs text-aesop-dark/40 text-center">
              {post.imageCredit}
            </p>
          )}
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <h2 className="text-lg font-medium tracking-tight text-aesop-earth mb-8">
              À lire aussi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex gap-6 items-start"
                >
                  <div className="relative w-24 h-24 bg-aesop-light overflow-hidden shrink-0">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-aesop-amber">
                      {r.category}
                    </span>
                    <h3 className="mt-1 text-sm font-medium text-aesop-dark group-hover:text-aesop-earth transition-colors leading-snug">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-xs text-aesop-dark/40">
                      {r.readingTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-aesop-dark">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <p className="text-sm text-aesop-cream/60 mb-4">
              Retrouvez nos consultants pour des conseils personnalisés
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-aesop-cream/30 text-aesop-cream text-sm tracking-wide hover:bg-aesop-cream/10 transition-colors"
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
