"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "@/data/productsData";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductSection() {
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

  // 3D tilt + glow follow on card hover (desktop only)
  const handleMouseMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip touch devices

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    const glow = card.querySelector("[data-glow]");
    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        left: `${x}px`,
        top: `${y}px`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    const glow = card.querySelector("[data-glow]");
    if (glow) gsap.to(glow, { opacity: 0, duration: 0.3 });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="products-heading"
      className="relative w-full overflow-hidden bg-background px-2 py-8 sm:px-3 sm:py-10 md:px-4 md:py-14 lg:py-16"
    >

     
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl sm:h-80 sm:w-80"
      />

      <div className="relative mx-auto w-full max-w-full sm:max-w-[95%] md:max-w-11/12">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between md:mb-10"
        >
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-primary sm:text-[11px]">
              <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              OUR PRODUCTS
            </span>
            <h2
              id="products-heading"
              className="mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Premium Animal Care Products
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
              Scientifically formulated nutrition and healthcare solutions for
              your livestock and pets — trusted by farmers across the region.
            </p>
          </div>

  
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              data-card
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-sm border border-white/20 sm:rounded-sm",
                "bg-white/10 shadow-lg backdrop-blur-md",
                "transition-shadow duration-300 hover:shadow-2xl",
                "dark:border-white/10 dark:bg-white/5",
                "will-change-transform",
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
         

              {/* Mouse-follow glow */}
              <div
                data-glow
                aria-hidden="true"
                className="pointer-events-none absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 opacity-0 blur-2xl"
              />

              {/* Product image (top) */}
              <div className="relative aspect-square w-full overflow-hidden sm:aspect-[4/3]">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {product.category && (
                  <span className="absolute left-2 top-2 z-10 rounded-full border border-white/30 bg-white/20 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-white backdrop-blur-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Card content */}
              <div className="relative flex flex-1 flex-col p-3 sm:p-4 md:p-4 lg:p-5">
                <h3 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight text-foreground sm:text-base md:text-base lg:text-lg">
                  {product.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-xs md:text-sm">
                  {product.description}
                </p>

                <div className="mt-auto pt-3 sm:pt-4">
                  <Link
                    href={product.href ?? `/products/${product.slug}`}
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-1.5 rounded-sm",
                      "border border-primary/30 bg-primary/10 px-3 py-2 text-[11px] font-semibold text-primary",
                      "backdrop-blur-sm transition-colors",
                      "hover:bg-primary hover:text-primary-foreground",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      "sm:text-xs md:text-sm",
                    )}
                    aria-label={`Read more about ${product.title}`}
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
