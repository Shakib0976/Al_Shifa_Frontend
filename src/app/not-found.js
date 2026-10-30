import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
        Error 404
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-lg leading-7 text-zinc-600">
        The page may have moved, or the address may be incorrect.
      </p>
      <Link
        className="mt-8 rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        href="/"
      >
        Return to home
      </Link>
    </section>
  );
}
