import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/products/product-details";

export const instant = false;

async function getProduct(slug) {
  // ⭐ এখানে products এর API কল হবে, news এর না
  const res = await fetch(`http://localhost:3000/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return product
    ? {
        title: product.name,
        description: product.description,
      }
    : { title: "Product not found" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}