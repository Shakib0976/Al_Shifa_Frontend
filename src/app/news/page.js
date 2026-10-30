import { NewsCard } from "@/components/news/news-card";
import { news } from "@/data/news";

export const metadata = {
  title: "News and advice",
  description: "Animal care news and practical advice from our team.",
};

export default function NewsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
        News and advice
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Ideas for healthier animals
      </h1>
      <p className="mt-3 max-w-2xl leading-7 text-zinc-600">
        Explore practical notes from the Al-Shifa Animal Science team.
      </p>
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {news.map((article) => (
          <NewsCard article={article} key={article.slug} />
        ))}
      </div>
    </section>
  );
}
