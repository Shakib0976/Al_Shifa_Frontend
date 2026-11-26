"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;
    try {
      const res = await fetch(`/api/news/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setNews(news.filter((n) => n.slug !== slug));
      } else {
        alert("Failed to delete news");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-10 text-center text-zinc-500">Loading news...</div>;

  return (
    <div className="mx-auto max-w-5xl">
      {/* হেডার */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">News Management</h1>
          <p className="mt-1 text-sm text-zinc-500">
            View, edit, and manage all your news articles.
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          + Add News
        </Link>
      </div>

      {/* লিস্ট */}
      {news.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
          <p className="text-zinc-500">No news articles found.</p>
          <Link href="/admin/news/new" className="mt-2 inline-block text-sm font-medium text-emerald-700 hover:underline">
            Create your first article →
          </Link>
        </div>
      ) : (
        <div className="space-y-4"> {/* ⭐ এখানে গ্যাপ দেওয়া হলো */}
          {news.map((item) => (
            <div
              key={item.slug}
              className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              {/* বাম দিক: ছোট ইমেজ + টেক্সট */}
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
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-1">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* ডান দিক: বাটন */}
              <div className="flex shrink-0 gap-2 sm:self-center">
                <Link
                  href={`/admin/news/${item.slug}`}
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.slug)}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}