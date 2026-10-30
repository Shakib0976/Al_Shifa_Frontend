import Link from "next/link";

export function NewsCard({ article }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6">
      <p className="text-sm font-semibold text-emerald-700">
        {article.category} · {article.date}
      </p>
      <h2 className="mt-3 text-xl font-semibold">{article.title}</h2>
      <p className="mt-2 leading-6 text-zinc-600">{article.excerpt}</p>
      <Link
        className="mt-5 inline-flex font-semibold text-emerald-800 hover:text-emerald-600"
        href={`/news/${article.slug}`}
      >
        Read article <span aria-hidden="true" className="ml-1">→</span>
      </Link>
    </article>
  );
}
