"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchForm({ className = "", autoFocus = false }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`relative ${className}`}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        autoFocus={autoFocus}
        className="w-full rounded-lg border border-border bg-gray-100 py-2 pl-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        aria-label="Search products"
        className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-background hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}