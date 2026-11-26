import { Suspense } from "react";
import Link from "next/link";
import { categories } from "@/data/products";

async function NewProductContent({ searchParams }) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/products"
        className="text-sm text-emerald-700 hover:underline"
      >
        ← Back to Products
      </Link>
      <h1 className="mt-3 text-2xl font-bold">Add New Product</h1>

      {typeof error === "string" && error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <form
        action="/api/products"
        method="post"
        encType="multipart/form-data"
        className="mt-6 space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-zinc-700">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            name="slug"
            required
            placeholder="e.g. dairy-mineral-mix"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="categorySlug" className="block text-sm font-medium text-zinc-700">
              Category
            </label>
            <select
              id="categorySlug"
              name="categorySlug"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <p className="self-end pb-2 text-xs text-zinc-500">
            The category name and slug are saved from your selection.
          </p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-zinc-700">
              Price (৳)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              min="0"
              step="any"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-zinc-700">
              Unit
            </label>
            <input
              id="unit"
              type="text"
              name="unit"
              required
              placeholder="e.g. 5 kg bag"
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-zinc-700">
            Product image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            required
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Images up to 32 MB are uploaded to ImgBB and saved with the product.
          </p>
        </div>
        <div>
          <label htmlFor="imageAlt" className="block text-sm font-medium text-zinc-700">
            Image alt text
          </label>
          <input
            id="imageAlt"
            type="text"
            name="imageAlt"
            placeholder="Describe the product image"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="highlights" className="block text-sm font-medium text-zinc-700">
            Highlights (comma-separated)
          </label>
          <textarea
            id="highlights"
            name="highlights"
            rows={3}
            placeholder="Feature 1, Feature 2, Feature 3"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default function NewProductPage(props) {
  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading product form...</p>}>
      <NewProductContent {...props} />
    </Suspense>
  );
}
