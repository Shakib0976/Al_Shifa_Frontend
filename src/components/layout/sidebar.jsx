"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Products", href: "/admin/products" },
  { label: "News", href: "/admin/news" },
  { label: "Messages", href: "/admin/messages" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-zinc-200 bg-white md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-zinc-200 px-4 py-4 sm:px-6 md:py-5">
        <h2 className="text-lg font-semibold text-emerald-700">Admin Panel</h2>
      </div>

      <nav className="flex min-w-0 flex-row flex-wrap gap-1 px-3 py-2 md:flex-1 md:flex-nowrap md:flex-col md:py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-lg px-2 py-2 text-xs font-medium transition-colors md:block md:w-full md:px-3 md:text-sm",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-2 md:p-3">
        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}