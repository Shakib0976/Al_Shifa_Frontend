import Link from "next/link";
import { mainNavigation } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link
          className="text-lg font-bold tracking-tight text-emerald-950"
          href="/"
        >
          Al-Shifa <span className="text-emerald-700">Animal Science</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-zinc-700">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="transition hover:text-emerald-700"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
