import Link from "next/link";
import { getApiUrl } from "@/lib/api-url";

export const metadata = {
  title: "News",
  description: "Latest news and articles from Al-Shifa.",
};

export const instant = false;

async function getNews() {
  const res = await fetch(getApiUrl("/api/news"), {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-10">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest News</h1>
      <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Link
            key={item.slug}
            href={`/news/${item.slug}`}
            className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden transition hover:shadow-lg"
          >
            <div className="aspect-video overflow-hidden bg-zinc-100">
              <img
                src={item.image.src}
                alt={item.image.alt}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase text-emerald-700">
                {item.category}
              </p>
              <h2 className="mt-2 text-lg font-semibold group-hover:text-emerald-800">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 line-clamp-3">
                {item.excerpt}
              </p>
              <p className="mt-4 text-xs text-zinc-500">
                {item.date} · {item.author}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}