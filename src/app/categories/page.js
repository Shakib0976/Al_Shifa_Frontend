import Link from "next/link";

export const metadata = {
  title: "Categories",
  description: "Browse animal products by category.",
};

 
export const instant = false;

async function getCategories() {
  const res = await fetch("http://localhost:3000/api/categories", {
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
    <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
        Find what you need
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Product categories
      </h1>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            className="group rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-300 hover:bg-emerald-50"
            href={`/shop?category=${category.slug}`}
            key={category.slug}
          >
            <span className="text-3xl" aria-hidden="true">
              {category.icon}
            </span>
            <h2 className="mt-4 text-xl font-semibold group-hover:text-emerald-800">
              {category.name}
            </h2>
            <p className="mt-2 leading-6 text-zinc-600">
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