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

function NavItem({ label, href, pathname }) {
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={href}
        render={<Link href={href} />}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export default function Navbar({ authButton }) {
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

    if (window.scrollY > 60) {
      header.style.transform = `translateY(-${topBarHeight}px)`;
      isHidden.current = true;
    }
    lastScrollY.current = window.scrollY;

    const showHeader = () => {
      if (!isHidden.current) return;
      isHidden.current = false;
      if (prefersReduced) header.style.transform = "translateY(0)";
      else gsap.to(header, { y: 0, duration: 0.3, ease: "power2.out" });
    };

    const hideHeader = () => {
      if (isHidden.current) return;
      isHidden.current = true;
      if (prefersReduced)
        header.style.transform = `translateY(-${topBarHeight}px)`;
      else
        gsap.to(header, {
          y: -topBarHeight,
          duration: 0.3,
          ease: "power2.out",
        });
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (Math.abs(delta) < 8) return;

      if (delta > 0 && y > 60) hideHeader();
      else if (delta < 0 || y <= 60) showHeader();
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
            className="flex shrink-0 items-center gap-3"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/Al_Shifa_Logo.png"
              alt="Al-Shifa Animal Science logo"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-contain"
              priority
            />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-primary">
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
              {navLinks.slice(0, 2).map((link) => (
                <NavItem key={link.href} {...link} pathname={pathname} />
              ))}
              <CategoryDropdown />
              {navLinks.slice(2).map((link) => (
                <NavItem key={link.href} {...link} pathname={pathname} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: search + auth + mobile trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <SearchForm className="w-40 lg:w-48" />
            </div>
            {authButton}
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}