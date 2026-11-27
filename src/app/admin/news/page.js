import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import NewsList from "@/components/admin/news-list";
import { getApiUrl } from "@/lib/api-url";

async function NewsContent() {
  const response = await fetch(getApiUrl("/api/news"), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load news (${response.status}).`);
  }

  const news = await response.json();

  if (!Array.isArray(news)) {
    throw new Error("The news API returned an invalid response.");
  }

  return <NewsList initialNews={news} />;
}

export default function AdminNewsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">News Management</h1>
          <p className="mt-1 text-sm text-zinc-500">
            View, edit, and manage all your news articles.
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add News
        </Link>
      </div>

      <Suspense
        fallback={
          <p className="rounded-xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
            Loading news...
          </p>
        }
      >
        <NewsContent />
      </Suspense>
    </div>
  );
}
