"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductSection({ products }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const visibleProducts = products.slice(0, 6);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Header fade-up
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Cards staggered reveal
      const cards = gridRef.current.querySelectorAll("[data-card]");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // CTA fade-up
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="products-heading"
      className="relative w-full overflow-hidden bg-background px-2 py-8 sm:px-3 sm:py-10 md:px-4 md:py-14 lg:py-16"
    >
      <div className="relative mx-auto w-full max-w-full sm:max-w-[95%] md:max-w-11/12">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-8 flex flex-col items-center text-center sm:mb-10 md:mb-12"
        >
          <h2
            id="products-heading"
            className="text-2xl font-bold tracking-tight text-[#0B0B4A] sm:text-3xl lg:text-4xl"
          >
            Products of Al-Shifa
          </h2>

          {/* Decorative divider under title */}
          <div
            aria-hidden="true"
            className="mt-4 flex w-full max-w-3xl items-center gap-3"
          >
            <span className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-transparent via-[#E3B04B]/60 to-[#E3B04B]" />
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-[#E3B04B]" />
            <span className="h-[2px] flex-1 rounded-full bg-gradient-to-l from-transparent via-[#E3B04B]/60 to-[#E3B04B]" />
          </div>
        </div>

        {/* Product grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {visibleProducts.map((product) => (
            <article
              key={product._id || product.slug}
              data-card
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-sm border border-border",
                "bg-card shadow-sm transition-shadow duration-300 hover:shadow-md",
              )}
            >
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-primary/10 sm:aspect-[4/3]">
                <span aria-hidden="true" className="text-6xl text-primary">
                  {product.icon || "🐾"}
                </span>

                {product.category && (
                  <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold tracking-wide text-primary-foreground sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Card content */}
              <div className="relative flex flex-1 flex-col p-3 sm:p-4 md:p-4 lg:p-5">
                <h3 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-foreground sm:text-base md:text-base lg:text-lg">
                  {product.name}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-xs md:text-sm">
                  {product.description}
                </p>

                <div className="mt-auto pt-3 sm:pt-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-1.5 rounded-sm",
                      "border border-primary/30 bg-primary/10 px-3 py-2 text-[11px] font-semibold text-primary",
                      "backdrop-blur-sm transition-colors",
                      "hover:bg-primary hover:text-primary-foreground",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      "sm:text-xs md:text-sm",
                    )}
                    aria-label={`Read more about ${product.name}`}
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show all products button — bottom-center (mobile/tablet) */}
        <div
          ref={ctaRef}
          className="mt-6 flex justify-center sm:mt-8 md:mt-10 lg:hidden"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-sm border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Show All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Show all products button — bottom-center (large screens) */}
        <div className="mt-8 hidden justify-center lg:mt-10 lg:flex">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Show All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
