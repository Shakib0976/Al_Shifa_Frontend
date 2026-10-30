"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ConsultancySection() {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // 1. Image slides in from left and scales up slightly
      gsap.from(imageWrapperRef.current, {
        opacity: 0,
        x: -50,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // 2. Text content staggers in from the right
      gsap.from(contentRef.current.children, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // 3. Decorative shapes gentle float
      gsap.to("[data-decor]", {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
    >
      {/* 
        Full-width container. 
        Removed the grid background. 
        Using max-w-[90rem] (1440px) to allow the content to stretch out nicely on large monitors.
      */}
      <div className="relative mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* =========================================
              LEFT SIDE: Image Layout
          ========================================= */}
          <div ref={imageWrapperRef} className="relative">
            {/* Decorative solid background block behind the image */}
            <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-primary/10 sm:-left-6 sm:-top-6 dark:bg-primary/5" />
            
            {/* Decorative floating shape */}
            <div 
              data-decor 
              className="absolute -right-6 -top-8 z-0 h-24 w-24 rounded-full border-4 border-primary/20 sm:h-32 sm:w-32" 
            />

            {/* Main Image Container */}
            <div className="relative z-10 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]">
                <Image
                  src="https://i.ibb.co.com/vCT72W03/f1710779881a3963116c0c771986e96a.jpg"
                  alt="Veterinarian consulting with a farmer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -right-2 z-20 flex items-center gap-3 rounded-xl border border-border bg-background p-3 shadow-xl sm:bottom-8 sm:-right-6 sm:p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">100% Authentic</p>
                <p className="text-xs text-muted-foreground">Tested Medicines</p>
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT SIDE: Content Data
          ========================================= */}
          <div ref={contentRef} className="flex flex-col justify-center">
            {/* Label */}
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="h-px w-8 bg-primary"></span>
              Support & Guidance
            </span>

            {/* Title */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Expert Consultancy <br className="hidden sm:block" />
              for Your Farm
            </h2>

            {/* Paragraph */}
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Our veterinary specialists provide free initial consultations to help you 
              improve animal health, optimize nutrition, and maximize your farm&apos;s yield. 
              We are committed to providing authentic, tested medicines and practical advice 
              you can trust.
            </p>

            {/* Micro-features list */}
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2 text-sm font-medium text-foreground/80 sm:text-base">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                Free initial consultation for new farmers
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-foreground/80 sm:text-base">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                Custom nutrition and feeding plans
              </li>
            </ul>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <a 
                href="tel:+8801XXXXXXXXX" 
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-bold text-foreground shadow-sm transition-colors hover:bg-muted sm:text-base"
              >
                <PhoneCall className="h-5 w-5 text-primary shrink-0" />
                +880 1XXX-XXXXXX
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}