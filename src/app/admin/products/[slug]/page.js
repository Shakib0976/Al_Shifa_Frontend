import { Suspense } from "react";
import Link from "next/link";
import EditProductForm from "@/components/admin/edit-product-form";
import { getApiUrl } from "@/lib/api-url";

async function EditProductContent({ params, searchParams }) {
  const { slug } = await params;
  const { error } = await searchParams;
  const response = await fetch(
    getApiUrl(`/api/products/${encodeURIComponent(slug)}`),
    { cache: "no-store" }
  );

  if (response.status === 404) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-red-600">Product not found.</p>
        <Link
          href="/admin/products"
          className="mt-3 inline-block text-sm text-emerald-700 hover:underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (!response.ok) {
    throw new Error(`Unable to load product (${response.status}).`);
  }

  const product = await response.json();

  if (!product || typeof product !== "object" || !product.slug) {
    throw new Error("The product API returned an invalid response.");
  }

  return (
    <EditProductForm
      initialProduct={product}
      error={typeof error === "string" ? error : ""}
    />
  );
}

export default function EditProductPage(props) {
  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading product...</p>}>
      <EditProductContent {...props} />
    </Suspense>
  );
}
