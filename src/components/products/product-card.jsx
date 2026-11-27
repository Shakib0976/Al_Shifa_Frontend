import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export function ProductCard({ product }) {
  return (
    <article className="flex min-w-0 flex-col rounded-sm border border-zinc-200 bg-white p-2.5 shadow-sm transition hover:border-emerald-300 hover:shadow-sm sm:p-5 lg:p-6">
      <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl bg-emerald-50 text-4xl sm:h-36 sm:text-5xl">
        {product.image?.src ? (
          <img
            src={product.image.src}
            alt={product.image.alt || product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden="true">{product.icon || "🐾"}</span>
        )}
      </div>
      <p className="mt-2 break-words text-xs font-medium text-emerald-700 sm:mt-5 sm:text-sm">
        {product.category}
      </p>
      <h2 className="mt-1 break-words text-base font-semibold sm:text-xl">{product.name}</h2>
      <p className="mt-1 line-clamp-2 flex-1 break-words text-sm leading-5 text-zinc-600 sm:mt-2 sm:line-clamp-3 sm:leading-6 sm:text-base">
        {product.description}
      </p>
      <div className="mt-3 flex flex-col items-start gap-1 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="min-w-0 break-words text-sm font-semibold text-zinc-900 sm:text-base">
          {formatCurrency(product.price)}
          <span className="ml-1 text-xs font-normal text-zinc-500 sm:text-sm">
            / {product.unit}
          </span>
        </p>
        <Link
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-600"
          href={`/products/${product.slug}`}
        >
          Details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
