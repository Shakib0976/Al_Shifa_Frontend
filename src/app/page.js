import Link from "next/link";
import { LearningCard } from "@/components/home/learning-card";
import { NewsCard } from "@/components/news/news-card";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";
import { news } from "@/data/news";
import { videos } from "@/data/videos";
import HeroSlider from "@/components/home/hero-slider";

export default function Home() {
  return (
    <div>
        <HeroSlider />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Shop
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Featured products
            </h2>
          </div>
          <Link
            className="font-semibold text-emerald-800 hover:text-emerald-600"
            href="/shop"
          >
            View all products <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                From our team
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                News and advice
              </h2>
            </div>
            <Link
              className="font-semibold text-emerald-800 hover:text-emerald-600"
              href="/news"
            >
              Read all articles <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {news.slice(0, 2).map((article) => (
              <NewsCard article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Learning center
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          Helpful videos, coming soon
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-zinc-600">
          We&apos;re preparing short, practical guides for animal owners and
          producers.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {videos.map((video) => (
            <LearningCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}
