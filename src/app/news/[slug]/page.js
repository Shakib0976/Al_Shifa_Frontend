import Link from "next/link";
import { notFound } from "next/navigation";
import { news } from "@/data/news";

export function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = news.find((item) => item.slug === slug);

  return article
    ? {
        title: article.title,
        description: article.excerpt,
      }
    : { title: "Article not found" };
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = news.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <Link
        className="font-semibold text-emerald-800 hover:text-emerald-600"
        href="/news"
      >
        <span aria-hidden="true">←</span> All news
      </Link>
      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-emerald-700">
        {article.category} · {article.date}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        {article.title}
      </h1>
      <p className="mt-5 text-lg leading-8 text-zinc-600">{article.excerpt}</p>
      <div className="mt-8 space-y-5 leading-8 text-zinc-700">
        {article.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
