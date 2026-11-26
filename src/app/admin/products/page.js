import { Suspense } from "react";
import ProductsList from "@/components/admin/products-list";
import { getApiUrl } from "@/lib/api-url";

async function ProductsContent() {
  const response = await fetch(getApiUrl("/api/products"), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status}).`);
  }

  const products = await response.json();

  if (!Array.isArray(products)) {
    throw new Error("The products API returned an invalid response.");
  }

  return <ProductsList initialProducts={products} />;
}

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-800">
          Products Management
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          View, edit, and manage all your products.
        </p>
      </div>

      <Suspense fallback={<p className="text-sm text-zinc-500">Loading products...</p>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
