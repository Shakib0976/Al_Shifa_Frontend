import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop",
  description: "Browse animal nutrition and care products.",
};

export default async function ShopPage({ searchParams }) {
  const { category } = await searchParams;
  const categoryFilter = typeof category === "string" ? category : null;
  const visibleProducts = categoryFilter
    ? products.filter((product) => product.categorySlug === categoryFilter)
    : products;

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Al-Shifa store
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Shop</h1>
        <p className="mt-3 max-w-2xl leading-7 text-zinc-600">
          Explore nutrition and care essentials selected for healthy animals.
        </p>
      </div>
      {categoryFilter ? (
        <Link
          className="mb-6 inline-flex font-semibold text-emerald-800 hover:text-emerald-600"
          href="/shop"
        >
          Clear category filter
        </Link>
      ) : null}
      {visibleProducts.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-zinc-200 p-8 text-zinc-600">
          No products are listed in this category yet. Browse all products to
          see what is available.
        </p>
      )}
    </section>
  );
}
