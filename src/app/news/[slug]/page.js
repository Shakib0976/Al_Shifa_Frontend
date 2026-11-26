import Link from "next/link";
import { notFound } from "next/navigation";
import { getApiUrl } from "@/lib/api-url";

export const instant = false;

async function getNewsItem(slug) {
  const res = await fetch(getApiUrl(`/api/news/${slug}`), {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  return item
    ? { title: item.title, description: item.excerpt }
    : { title: "News not found" };
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);

  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-14 md:px-10">
      <Link href="/news" className="text-sm font-semibold text-emerald-800 hover:text-emerald-600">
        ← Back to news
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase text-emerald-700">
        {item.category}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{item.title}</h1>
      <p className="mt-3 text-sm text-zinc-500">
        {item.date} · {item.author}
      </p>
      <div className="mt-8 aspect-video overflow-hidden rounded-2xl bg-zinc-100">
        <img
          src={item.image.src}
          alt={item.image.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-8 text-lg leading-8 text-zinc-700">{item.excerpt}</p>
    </article>
  );
}