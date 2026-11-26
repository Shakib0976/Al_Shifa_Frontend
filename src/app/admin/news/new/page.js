import { Suspense } from "react";
import Link from "next/link";

async function NewNewsContent({ searchParams }) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/news" className="text-sm text-emerald-700 hover:underline">
        ← Back to News
      </Link>
      <h1 className="mt-3 text-2xl font-bold">Add News Article</h1>

      {typeof error === "string" && error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <form
        action="/api/news"
        method="post"
        encType="multipart/form-data"
        className="mt-6 space-y-4"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
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
            placeholder="e.g. winter-care-tips"
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
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-zinc-700">
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-zinc-700">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            defaultValue="Al-Shifa"
            required
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-zinc-700">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-zinc-700">
            News image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Choose an image to upload to ImgBB, or provide an image URL below.
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
            placeholder="https://..."
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
            placeholder="Describe the news image"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800"
        >
          Create News
        </button>
      </form>
    </div>
  );
}

export default function NewNewsPage(props) {
  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading news form...</p>}>
      <NewNewsContent {...props} />
    </Suspense>
  );
}
