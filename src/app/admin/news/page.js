import { Suspense } from "react";
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-800">News Management</h1>
        <p className="mt-1 text-sm text-zinc-500">
          View, edit, and manage all your news articles.
        </p>
      </div>

      <Suspense fallback={<p className="text-sm text-zinc-500">Loading news...</p>}>
        <NewsContent />
      </Suspense>
    </div>
  );
}
