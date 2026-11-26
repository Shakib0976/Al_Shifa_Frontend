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
          <label htmlFor="icon" className="block text-sm font-medium text-zinc-700">
            Icon (emoji)
          </label>
          <input
            id="icon"
            type="text"
            name="icon"
            defaultValue={initialProduct.icon || ""}
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
