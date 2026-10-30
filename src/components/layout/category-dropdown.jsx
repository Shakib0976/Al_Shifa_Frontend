"use client";

import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function CategoryDropdown() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground hover:text-primary data-[state=open]:text-primary">
        Categories
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[280px] gap-1 p-2">
          {categories.map(({ label, slug, icon: Icon }) => (
            <li key={slug}>
              <NavigationMenuLink
                href={`/categories/${slug}`}
                render={<Link href={`/categories/${slug}`} />}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground",
                  "transition-colors hover:bg-secondary hover:text-primary",
                  "focus-visible:bg-secondary focus-visible:text-primary focus-visible:outline-none"
                )}
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{label}</span>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}