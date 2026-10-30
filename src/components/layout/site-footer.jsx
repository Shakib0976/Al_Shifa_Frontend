import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p>
          <span className="font-semibold text-zinc-900">
            Al-Shifa Animal Science
          </span>{" "}
          · Supporting healthier animals.
        </p>
        <Link
          className="font-medium text-emerald-800 hover:text-emerald-600"
          href="/contact"
        >
          Contact our team
        </Link>
      </div>
    </footer>
  );
}
