import { Suspense } from "react";
import Link from "next/link";
import { categories } from "@/data/products";

async function NewProductContent({ searchParams }) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
      >
        ← Back to Products
      </Link>
      <div className="mb-6 mt-5">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
          Add New Product
        </h1>
      </div>

      {typeof error === "string" && error && (
        <p
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <form
        action="/api/products"
        method="post"
        encType="multipart/form-data"
        className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-zinc-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 transition placeholder:text-zinc-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-semibold text-zinc-700">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            name="slug"
            required
            placeholder="e.g. dairy-mineral-mix"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 transition placeholder:text-zinc-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="categorySlug" className="block text-sm font-semibold text-zinc-700">
              Category
            </label>
            <select
              id="categorySlug"
              name="categorySlug"
              required
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 transition focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
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
          <p className="self-end pb-1 text-xs leading-5 text-zinc-500">
            The category name and slug are saved from your selection.
          </p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-zinc-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm leading-6 text-zinc-900 transition focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-zinc-700">
              Price (৳)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              min="0"
              step="any"
              required
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 transition focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
            />
          </div>
          <div>
            <label htmlFor="unit" className="block text-sm font-semibold text-zinc-700">
              Unit
            </label>
            <input
              id="unit"
              type="text"
              name="unit"
              required
              placeholder="e.g. 5 kg bag"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 transition placeholder:text-zinc-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-zinc-700">
            Product image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            required
            className="mt-2 block w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-800 hover:file:bg-emerald-200"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Images up to 32 MB are uploaded to ImgBB and saved with the product.
          </p>
        </div>
        <div>
          <label htmlFor="imageAlt" className="block text-sm font-semibold text-zinc-700">
            Image alt text
          </label>
          <input
            id="imageAlt"
            type="text"
            name="imageAlt"
            placeholder="Describe the product image"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 transition placeholder:text-zinc-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
          />
        </div>
        <div>
          <label htmlFor="highlights" className="block text-sm font-semibold text-zinc-700">
            Highlights (comma-separated)
          </label>
          <textarea
            id="highlights"
            name="highlights"
            rows={3}
            placeholder="Feature 1, Feature 2, Feature 3"
            className="mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm leading-6 text-zinc-900 transition placeholder:text-zinc-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100"
          />
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:justify-end">
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Create Product
          </button>
        </div>
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
