import Link from "next/link";
import { getApiUrl } from "@/lib/api-url";

export const metadata = {
  title: "Categories",
  description: "Browse animal products by category.",
};

 
export const instant = false;

async function getCategories() {
  const res = await fetch(getApiUrl("/api/categories"), {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-11/12 px-4 py-10 sm:px-6 sm:py-14 md:px-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
        Find what you need
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Product categories
      </h1>
      <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            className="group min-w-0 rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-emerald-300 hover:bg-emerald-50 sm:p-6"
            href={`/shop?category=${category.slug}`}
            key={category.slug}
          >
            <span className="text-3xl" aria-hidden="true">
              {category.icon}
            </span>
            <h2 className="mt-4 break-words text-base font-semibold group-hover:text-emerald-800 sm:text-xl">
              {category.name}
            </h2>
            <p className="mt-2 break-words text-sm leading-6 text-zinc-600 sm:text-base">
              {category.description}
            </p>
            <span className="mt-5 inline-block font-semibold text-emerald-800">
              Browse category <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}