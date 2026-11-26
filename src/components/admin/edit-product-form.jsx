import Link from "next/link";

export default function EditProductForm({ initialProduct, error }) {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/products"
        className="text-sm text-emerald-700 hover:underline"
      >
        ← Back to Products
      </Link>
      <h1 className="mt-3 text-2xl font-bold">Edit Product</h1>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <form
        action={`/api/products/${encodeURIComponent(initialProduct.slug)}`}
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
            defaultValue={initialProduct.name}
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
            defaultValue={initialProduct.slug}
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-zinc-700">
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              defaultValue={initialProduct.category}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="categorySlug" className="block text-sm font-medium text-zinc-700">
              Category Slug
            </label>
            <input
              id="categorySlug"
              type="text"
              name="categorySlug"
              defaultValue={initialProduct.categorySlug}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={initialProduct.description}
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
              defaultValue={initialProduct.price}
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
              defaultValue={initialProduct.unit}
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-zinc-700">
            Replace product image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Leave empty to keep the current image.
          </p>
        </div>
        <div>
          <label htmlFor="imageSrc" className="block text-sm font-medium text-zinc-700">
            Image URL
          </label>
          <input
            id="imageSrc"
            type="url"
            name="imageSrc"
            defaultValue={initialProduct.image?.src || ""}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="imageAlt" className="block text-sm font-medium text-zinc-700">
            Image alt text
          </label>
          <input
            id="imageAlt"
            type="text"
            name="imageAlt"
            defaultValue={initialProduct.image?.alt || ""}
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
            defaultValue={initialProduct.highlights?.join(", ") || ""}
            rows={3}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
