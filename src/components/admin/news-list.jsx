"use client";

import Link from "next/link";

export default function NewsList({ initialNews }) {
  const confirmDelete = (event) => {
    if (!window.confirm("Are you sure you want to delete this news article?")) {
      event.preventDefault();
    }
  };

  if (initialNews.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
        <p className="text-zinc-500">No news articles found.</p>
        <Link
          href="/admin/news/new"
          className="mt-2 inline-block text-sm font-medium text-emerald-700 hover:underline"
        >
          Create your first article →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {initialNews.map((item) => (
        <div
          key={item._id || item.slug}
          className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5"
        >
          <div className="flex flex-1 items-start gap-4">
            {item.image?.src ? (
              <img
                src={item.image.src}
                alt={item.image.alt || item.title}
                className="h-16 w-24 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs text-zinc-400">
                No Image
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  {item.category}
                </span>
                <span className="text-xs text-zinc-400">{item.date}</span>
              </div>
              <h2 className="mt-1 text-base font-semibold text-zinc-800">
                {item.title}
              </h2>
              <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                {item.excerpt}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2 sm:self-center">
            <Link
              href={`/admin/news/${encodeURIComponent(item.slug)}`}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Edit
            </Link>
            <form
              action={`/api/news/${encodeURIComponent(item.slug)}`}
              method="post"
              onSubmit={confirmDelete}
            >
              <input type="hidden" name="_action" value="delete" />
              <button
                type="submit"
                className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
