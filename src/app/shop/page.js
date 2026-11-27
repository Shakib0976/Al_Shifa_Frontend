import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";
import { getApiUrl } from "@/lib/api-url";

export const metadata = {
  title: "Shop",
  description: "Browse animal nutrition and care products.",
};

// ⭐ এই লাইনটা ওয়ার্নিং ঠিক করবে
export const instant = false; 

async function getProducts() {
  const res = await fetch(getApiUrl("/api/products"), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ShopPage({ searchParams }) {
  const products = await getProducts();
  const { category, q } = await searchParams;
  const categoryFilter = typeof category === "string" ? category : null;
  const searchQuery = typeof q === "string" ? q.trim() : "";
  const normalizedQuery = searchQuery.toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      !categoryFilter || product.categorySlug === categoryFilter;
    const matchesName =
      !normalizedQuery ||
      (typeof product.name === "string" &&
        product.name.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesName;
  });

  return (
    <section className="mx-auto w-full px-4 py-10 sm:max-w-11/12 sm:px-6 sm:py-14 md:px-10">
      <div className="mb-10">
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Al-Shifa store</h1>
        <p className="mt-3 max-w-2xl leading-7 text-zinc-600">
          Explore nutrition and care essentials selected for healthy animals.
        </p>
      </div>
      {searchQuery ? (
        <p className="mb-6 text-sm text-zinc-600">
          Search results for{" "}
          <span className="font-semibold text-zinc-900">
            &ldquo;{searchQuery}&rdquo;
          </span>
        </p>
      ) : null}
      {categoryFilter || searchQuery ? (
        <Link
          className="mb-6 inline-flex font-semibold text-emerald-800 hover:text-emerald-600"
          href="/shop"
        >
          Clear filters
        </Link>
      ) : null}
      {visibleProducts.length ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-zinc-900">
            No products found
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            No product names match &ldquo;{searchQuery}&rdquo;. Try another
            search.
          </p>
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