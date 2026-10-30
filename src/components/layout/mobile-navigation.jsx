"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { categories, navLinks, siteConfig } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        }
      />
      <SheetContent side="right" className="w-[300px] sm:w-[340px]">
        <SheetHeader>
          <SheetTitle className="text-left text-base font-semibold text-foreground">
            {siteConfig.name}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              {siteConfig.subtitle}
            </span>
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.slice(0, 2).map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                pathname === href
                  ? "bg-secondary text-primary"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {/* Categories accordion */}
          <button
            type="button"
            onClick={() => setCatsOpen((v) => !v)}
            aria-expanded={catsOpen}
            aria-controls="mobile-categories"
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            <span>Categories</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                catsOpen && "rotate-180"
              )}
            />
          </button>
          {catsOpen && (
            <ul id="mobile-categories" className="ml-3 flex flex-col gap-1 border-l border-border pl-3">
              {categories.map(({ label, slug, icon: Icon }) => (
                <li key={slug}>
                  <Link
                    href={`/categories/${slug}`}
                    onClick={close}
                    className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {navLinks.slice(2).map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                pathname === href
                  ? "bg-secondary text-primary"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}