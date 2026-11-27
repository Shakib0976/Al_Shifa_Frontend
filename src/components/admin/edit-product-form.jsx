import Link from "next/link";

const labelClassName = "block text-sm font-semibold text-zinc-700";
const inputClassName =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 transition focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100";
const textareaClassName =
  "mt-2 w-full resize-y rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm leading-6 text-zinc-900 transition focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100";
const fileClassName =
  "mt-2 block w-full rounded-xl border border-zinc-300 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-800 hover:file:bg-emerald-200";

export default function EditProductForm({ initialProduct, error }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
      >
        ← Back to Products
      </Link>
      <div className="mb-6 mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Product management
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
          Edit Product
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Update product details, pricing, and store imagery.
        </p>
      </div>

      {error && (
        <p
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <form
        action={`/api/products/${encodeURIComponent(initialProduct.slug)}`}
        method="post"
        encType="multipart/form-data"
        className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="name" className={labelClassName}>
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={initialProduct.name}
            required
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClassName}>
            Slug
          </label>
          <input
            id="slug"
            type="text"
            name="slug"
            defaultValue={initialProduct.slug}
            required
            className={inputClassName}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={labelClassName}>
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              defaultValue={initialProduct.category}
              required
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="categorySlug" className={labelClassName}>
              Category Slug
            </label>
            <input
              id="categorySlug"
              type="text"
              name="categorySlug"
              defaultValue={initialProduct.categorySlug}
              required
              className={inputClassName}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className={labelClassName}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={initialProduct.description}
            required
            rows={3}
            className={textareaClassName}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className={labelClassName}>
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
              className={inputClassName}
            />
          </div>
          <div>
            <label htmlFor="unit" className={labelClassName}>
              Unit
            </label>
            <input
              id="unit"
              type="text"
              name="unit"
              defaultValue={initialProduct.unit}
              required
              className={inputClassName}
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className={labelClassName}>
            Replace product image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            className={fileClassName}
          />
          <p className="mt-1 text-xs text-zinc-500">
            Leave empty to keep the current image.
          </p>
        </div>
        <div>
          <label htmlFor="imageSrc" className={labelClassName}>
            Image URL
          </label>
          <input
            id="imageSrc"
            type="url"
            name="imageSrc"
            defaultValue={initialProduct.image?.src || ""}
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="imageAlt" className={labelClassName}>
            Image alt text
          </label>
          <input
            id="imageAlt"
            type="text"
            name="imageAlt"
            defaultValue={initialProduct.image?.alt || ""}
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="highlights" className={labelClassName}>
            Highlights (comma-separated)
          </label>
          <textarea
            id="highlights"
            name="highlights"
            defaultValue={initialProduct.highlights?.join(", ") || ""}
            rows={3}
            className={textareaClassName}
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
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
