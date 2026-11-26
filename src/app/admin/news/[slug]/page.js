import { Suspense } from "react";
import Link from "next/link";
import EditNewsForm from "@/components/admin/edit-news-form";
import { getApiUrl } from "@/lib/api-url";

async function EditNewsContent({ params, searchParams }) {
  const { slug } = await params;
  const { error } = await searchParams;
  const response = await fetch(
    getApiUrl(`/api/news/${encodeURIComponent(slug)}`),
    { cache: "no-store" }
  );

  if (response.status === 404) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-red-600">News article not found.</p>
        <Link
          href="/admin/news"
          className="mt-3 inline-block text-sm text-emerald-700 hover:underline"
        >
          Back to News
        </Link>
      </div>
    );
  }

  if (!response.ok) {
    throw new Error(`Unable to load news (${response.status}).`);
  }

  const news = await response.json();

  if (!news || typeof news !== "object" || !news.slug) {
    throw new Error("The news API returned an invalid response.");
  }

  return (
    <EditNewsForm
      initialNews={news}
      error={typeof error === "string" ? error : ""}
    />
  );
}

export default function EditNewsPage(props) {
  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading news...</p>}>
      <EditNewsContent {...props} />
    </Suspense>
  );
}
