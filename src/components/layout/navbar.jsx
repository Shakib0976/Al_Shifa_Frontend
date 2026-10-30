"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import TopContactBar from "./top-contact-bar";
import CategoryDropdown from "./category-dropdown";
import SearchForm from "./search-form";
import MobileNavigation from "./mobile-navigation";
import { navLinks, siteConfig } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const headerRef = useRef(null);
  const topBarRef = useRef(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    const topBar = topBarRef.current;
    if (!header || !topBar) return;

    const topBarHeight = topBar.offsetHeight;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Browser may restore scroll position — sync initial state
    if (window.scrollY > 60) {
      header.style.transform = `translateY(-${topBarHeight}px)`;
      isHidden.current = true;
    }
    lastScrollY.current = window.scrollY;

    const showHeader = () => {
      if (!isHidden.current) return;
      isHidden.current = false;
      if (prefersReduced) {
        header.style.transform = "translateY(0)";
      } else {
        gsap.to(header, { y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const hideHeader = () => {
      if (isHidden.current) return;
      isHidden.current = true;
      if (prefersReduced) {
        header.style.transform = `translateY(-${topBarHeight}px)`;
      } else {
        gsap.to(header, {
          y: -topBarHeight,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (Math.abs(delta) < 8) return; // hysteresis

      if (delta > 0 && y > 60) {
        hideHeader();
      } else if (delta < 0 || y <= 60) {
        showHeader();
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(header);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full will-change-transform"
    >
      <div ref={topBarRef}>
        <TopContactBar />
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-11/12 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/Al_Shifa_Logo.png"
              alt="Al-Shifa Animal Science logo"
              width={44}
              height={44}
              className="h-20 w-20 shrink-0 rounded-full object-contain"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-base font-semibold text-primary">
                {siteConfig.name}
              </span>
              <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
                {siteConfig.subtitle}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {navLinks.slice(0, 2).map(({ label, href }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink
                    href={href}
                    render={<Link href={href} />}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <CategoryDropdown />
              {navLinks.slice(2).map(({ label, href }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink
                    href={href}
                    render={<Link href={href} />}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: search + mobile trigger */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <SearchForm className="w-48 lg:w-64" />
            </div>
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}