import type { Metadata } from "next";
import ProductDetail, { productData } from "./ProductDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productData[slug];

  if (!product) {
    return {
      title: "Produit introuvable",
      description: "Ce produit n'existe pas dans notre catalogue.",
    };
  }

  const firstPrice = Object.values(product.price)[0];

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Aesop Paris`,
      description: `${product.description} À partir de ${firstPrice}€.`,
      url: `https://aesop-paris.com/produits/${slug}`,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      title: `${product.name} — Aesop Paris`,
      description: `${product.description} À partir de ${firstPrice}€.`,
      images: [product.images[0]],
    },
    alternates: {
      canonical: `https://aesop-paris.com/produits/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}
