"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Content: edit freely. Stats and image paths below are PLACEHOLDERS. */
/* ------------------------------------------------------------------ */
const about = {
  titleTop: "About Our",
  titleAccent: "Animal Science",
  description:
    "Al-Shifa Animal Science is committed to healthier livestock and more productive farms. We combine science-backed nutrition, quality-tested products and practical field support to help farmers raise stronger, healthier animals with confidence.",
  cta: { label: "Read More", href: "/about" },
  stats: [
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: 5000, suffix: "+", label: "Farmers Served" },
  ],
  images: {
    top: {
      src: "https://i.ibb.co.com/xtDQNx9v/54109ea0dcf2b5e09547e18c25454346.jpg",
      alt: "Healthy cattle at an Al-Shifa partner farm",
    },
    bottom: {
      src: "https://i.ibb.co.com/zH72b7z3/Screenshot-2026-10-30-182832.png",
      alt: "Cattle grazing in an open pasture",
    },
  },
};

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ShapedImage({ image, sizes, className, dataAttr, onFail, failed }) {
  return (
    <div
      {...{ [dataAttr]: true }}
      className={cn(
        "absolute overflow-hidden bg-[#E8F5E9] shadow-lg shadow-[#243B53]/10",
        className,
      )}
    >
      <div data-img-inner className="absolute inset-0">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center">
            <PawPrint className="h-12 w-12 text-primary/30" aria-hidden="true" />
          </div>
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-cover"
            onError={onFail}
          />
        )}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const rootRef = useRef(null);
  const [failed, setFailed] = useState({ top: false, bottom: false });

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const counters = gsap.utils.toArray("[data-count]", root);
    const finalText = counters.map((el) => el.textContent);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });

      tl.from("[data-heading-line]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      })
        .from(
          "[data-img-top]",
          {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 1.1,
            ease: "power2.inOut",
            clearProps: "clipPath",
          },
          0.1,
        )
        .from(
          "[data-img-top] [data-img-inner]",
          { scale: 1.2, duration: 1.4, ease: "power2.out" },
          0.1,
        )
        .from(
          "[data-img-bottom]",
          {
            clipPath: "inset(0% 0% 0% 100%)",
            duration: 1.1,
            ease: "power2.inOut",
            clearProps: "clipPath",
          },
          0.35,
        )
        .from(
          "[data-img-bottom] [data-img-inner]",
          { scale: 1.2, duration: 1.4, ease: "power2.out" },
          0.35,
        )
        .from(
          "[data-fade]",
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 },
          0.5,
        );

      counters.forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const state = { v: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(state.v).toLocaleString("en-US")}${suffix}`;
          },
        });
      });
    }, root);

    return () => {
      ctx.revert();
      counters.forEach((el, i) => {
        el.textContent = finalText[i];
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      aria-labelledby="about-heading"
      className="w-full overflow-x-clip bg-background py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-8">
          {/* Heading (right column on desktop, first on mobile) */}
          <div className="lg:col-start-2 lg:row-start-1 lg:self-end">
            <h2
              id="about-heading"
              className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-[#243B53] sm:text-5xl lg:text-6xl"
            >
              <span data-heading-line className="block">
                {about.titleTop}
              </span>
              <span
                data-heading-line
                className="mt-1 block text-[0.8em] font-light text-primary"
              >
                {about.titleAccent}
              </span>
            </h2>
          </div>

          {/* Image collage */}
          <div className="relative lg:col-start-1 lg:row-span-2 lg:row-start-1">
            {/* quiet dot-grid accent */}
            <div
              aria-hidden="true"
              className="absolute -top-4 left-6 h-20 w-28 bg-[radial-gradient(circle,currentColor_1.5px,transparent_1.5px)] bg-[length:12px_12px] text-primary/30"
            />
            <div className="relative aspect-square w-full">
              <ShapedImage
                dataAttr="data-img-top"
                image={about.images.top}
                sizes="(min-width: 1024px) 40vw, 75vw"
                failed={failed.top}
                onFail={() => setFailed((f) => ({ ...f, top: true }))}
                className="left-0 top-0 h-[49%] w-[74%] rounded-r-full"
              />
              <ShapedImage
                dataAttr="data-img-bottom"
                image={about.images.bottom}
                sizes="(min-width: 1024px) 48vw, 95vw"
                failed={failed.bottom}
                onFail={() => setFailed((f) => ({ ...f, bottom: true }))}
                className="right-0 object-cover p-20 top-[51%] h-[49%] w-[95%] rounded-full"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-start-2 lg:row-start-2 lg:self-start">
            <dl className="flex flex-wrap gap-x-12 gap-y-6">
              {about.stats.map((stat) => (
                <div key={stat.label} data-fade>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span
                      data-count={stat.value}
                      data-suffix={stat.suffix}
                      className="block text-4xl font-bold tabular-nums text-primary sm:text-5xl"
                    >
                      {stat.value.toLocaleString("en-US")}
                      {stat.suffix}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 block text-sm font-medium text-[#243B53]"
                    >
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p
              data-fade
              className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              {about.description}
            </p>

            <div data-fade className="mt-8">
              <Link
                href={about.cta.href}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {about.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}