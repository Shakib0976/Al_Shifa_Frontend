import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export function ProductCard({ product }) {
  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm">
      <div
        aria-hidden="true"
        className="flex h-36 items-center justify-center rounded-xl bg-emerald-50 text-5xl"
      >
        {product.icon}
      </div>
      <p className="mt-5 text-sm font-medium text-emerald-700">
        {product.category}
      </p>
      <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
      <p className="mt-2 flex-1 leading-6 text-zinc-600">
        {product.description}
      </p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="font-semibold text-zinc-900">
          {formatCurrency(product.price)}
          <span className="ml-1 text-sm font-normal text-zinc-500">
            / {product.unit}
          </span>
        </p>
        <Link
          className="font-semibold text-emerald-800 hover:text-emerald-600"
          href={`/products/${product.slug}`}
        >
          Details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
