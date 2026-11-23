"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Beef,
  Bird,
  PawPrint,
  Fish,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Content: edit freely. All wording below is PLACEHOLDER copy.        */
/* ------------------------------------------------------------------ */
const mission = {
  brand: "Al-Shifa Food Science",
  title: { top: "Our", accent: "Mission" },
  statement: {
    before: "Our mission is to improve the ",
    highlight: "health and performance of animals",
    after:
      " (Dairy, Poultry, Pet & Aqua) by providing best quality products and technical support to our valuable customers for future well-being.",
  },
  cta: { label: "Learn About Our Standards", href: "/about" },
  steps: [
    {
      icon: Beef,
      title: "Dairy",
      text: "Better health and milk performance for dairy animals.",
    },
    {
      icon: Bird,
      title: "Poultry",
      text: "Quality products for healthy, high-performing flocks.",
    },
    {
      icon: PawPrint,
      title: "Pet",
      text: "Trusted care and nutrition for companion animals.",
    },
    {
      icon: Fish,
      title: "Aqua",
      text: "Support for healthy, productive aquaculture.",
    },
  ],
};

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function MissionSection() {
  const rootRef = useRef(null);
  const { statement, steps } = mission;

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 70%", once: true },
      });

      // Header
      tl.from("[data-reveal]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      })
        // Steps build one after another: icon -> connector -> text
        .from(
          "[data-step-icon]",
          { scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.35 },
          0.5,
        )
        .from(
          "[data-seg-x]",
          { scaleX: 0, duration: 0.35, ease: "none", stagger: 0.35 },
          0.75,
        )
        .from(
          "[data-seg-y]",
          { scaleY: 0, duration: 0.35, ease: "none", stagger: 0.35 },
          0.75,
        )
        .from(
          "[data-step-text]",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.35 },
          0.6,
        )
        .from("[data-cta]", { y: 20, opacity: 0, duration: 0.6 }, ">-0.3");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mission"
      ref={rootRef}
      aria-labelledby="mission-heading"
      className="w-full overflow-x-clip bg-[#E8F5E9]/50 py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="text-sm font-semibold text-primary sm:text-base">
            {mission.brand}
          </p>

          <h2
            id="mission-heading"
            data-reveal
            className="mt-3 text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-[#243B53] sm:text-5xl lg:text-6xl"
          >
            {mission.title.top}{" "}
            <span className="font-light text-primary">{mission.title.accent}</span>
          </h2>

          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#243B53]/80 sm:text-xl"
          >
            {statement.before}
            <span className="font-semibold text-[#243B53]">{statement.highlight}</span>
            {statement.after}
          </p>
        </div>

        {/* Steps: one line on desktop, vertical timeline on mobile/tablet */}
        <ol className="mx-auto mt-12 max-w-xl sm:mt-14 lg:mt-20 lg:grid lg:max-w-none lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={title}
                className={cn(
                  "relative flex gap-5",
                  "lg:flex-col lg:items-center lg:gap-6 lg:px-4 lg:text-center",
                )}
              >
                {/* Connector to the next step */}
                {!last && (
                  <>
                    {/* vertical (mobile/tablet) */}
                    <span
                      aria-hidden="true"
                      className="absolute left-8 top-8 h-full w-0.5 -translate-x-1/2 bg-primary/20 lg:hidden"
                    >
                      <span
                        data-seg-y
                        className="block h-full w-full origin-top bg-primary"
                      />
                    </span>
                    {/* horizontal (desktop) */}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-primary/20 lg:block"
                    >
                      <span
                        data-seg-x
                        className="block h-full w-full origin-left bg-primary"
                      />
                    </span>
                  </>
                )}

                {/* Icon */}
                <div
                  data-step-icon
                  className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-primary shadow-sm"
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#F97316] text-xs font-bold text-white ring-2 ring-white"
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Text */}
                <div
                  data-step-text
                  className={cn("min-w-0 pt-1", !last && "pb-10", "lg:pb-0 lg:pt-0")}
                >
                  <h3 className="text-lg font-semibold text-[#243B53] sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}