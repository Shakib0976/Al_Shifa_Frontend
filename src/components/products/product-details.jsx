import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export function ProductDetails({ product }) {
  return (
    <article className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-2 md:px-10">
      <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-3xl bg-emerald-50 text-8xl">
        {product.image?.src ? (
          <img
            src={product.image.src}
            alt={product.image.alt || product.name}
            className="max-h-[32rem] w-full object-contain p-4"
          />
        ) : (
          <span aria-hidden="true">{product.icon || "🐾"}</span>
        )}
      </div>
      <div className="self-center">
        <Link
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-600"
          href="/shop"
        >
          <span aria-hidden="true">←</span> Back to shop
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-emerald-700">
          {product.category}
        </p>
        <h1 className="mt-2 break-words text-3xl font-bold tracking-tight sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-4 leading-7 text-zinc-600">{product.description}</p>
        <p className="mt-6 text-2xl font-bold">
          {formatCurrency(product.price)}
          <span className="ml-2 text-base font-normal text-zinc-500">
            per {product.unit}
          </span>
        </p>
        <h2 className="mt-8 text-lg font-semibold">Product highlights</h2>
        <ul className="mt-3 space-y-2 text-zinc-700">
          {product.highlights.map((highlight) => (
            <li className="flex gap-2" key={highlight}>
              <span aria-hidden="true" className="text-emerald-700">
                ✓
              </span>
              {highlight}
            </li>
          ))}
        </ul>
        <Link
          className="mt-8 inline-flex rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          href="/contact"
        >
          Ask about this product
        </Link>
      </div>
    </article>
  );
}
