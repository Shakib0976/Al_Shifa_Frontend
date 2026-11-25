"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Truck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#E3B04B";

/* ------------------------------------------------------------------ */
/* Content: country names are PLACEHOLDERS, tomar real country diye     */
/* replace koro. x / y = position on the 600 x 360 map.                 */
/* ------------------------------------------------------------------ */
const DEST = { name: "Bangladesh", x: 400, y: 170 };

const regions = [
  { name: "Europe", desc: "International sourcing market" },
  { name: "Southeast Asia", desc: "Regional sourcing market" },
];

// bend: negative = curve upward, positive = curve the other way
const raw = [
  { name: "Germany", region: 0, x: 125, y: 60, bend: -0.25 },
  { name: "Spain", region: 0, x: 50, y: 150, bend: -0.25 },
  { name: "Italy", region: 0, x: 165, y: 150, bend: -0.25 },
  { name: "Vietnam", region: 1, x: 535, y: 140, bend: 0.25 },
  { name: "Thailand", region: 1, x: 470, y: 225, bend: 0.25 },
  { name: "Malaysia", region: 1, x: 540, y: 285, bend: 0.25 },
  { name: "Indonesia", region: 1, x: 400, y: 300, bend: 0.25 },
];

// builds a curved path from each country to Bangladesh
const countries = raw.map((c) => {
  const dx = DEST.x - c.x;
  const dy = DEST.y - c.y;
  const len = Math.hypot(dx, dy);
  const cx = (c.x + DEST.x) / 2 + (-dy / len) * c.bend * len;
  const cy = (c.y + DEST.y) / 2 + (dx / len) * c.bend * len;
  return {
    ...c,
    path: `M${c.x} ${c.y} Q${Math.round(cx)} ${Math.round(cy)} ${DEST.x} ${DEST.y}`,
  };
});

const AUTO_SECONDS = 3.5;
const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pct = (v, total) => `${(v / total) * 100}%`;

export default function GlobalSourcing() {
  const sectionRef = useRef(null);
  const routeRefs = useRef([]);
  const barRefs = useRef([]);
  const dotRef = useRef(null);
  const startedRef = useRef(false);
  const autoRef = useRef(null);
  const [active, setActive] = useState(0);

  /* ---------------- Scroll reveal (runs once) ---------------- */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    if (reduced()) {
      startedRef.current = true;
      return;
    }

    const ctx = gsap.context(() => {
      routeRefs.current.forEach((r) => {
        if (!r) return;
        const len = r.getTotalLength();
        gsap.set(r, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 72%", once: true },
      });

      tl.from("[data-line]", { yPercent: 110, duration: 0.9, stagger: 0.12 })
        .from("[data-rise]", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.25)
        .from(
          "[data-chip]",
          { y: 14, opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.05, ease: "back.out(1.8)" },
          0.7,
        )
        .from(
          "[data-map]",
          { y: 50, opacity: 0, scale: 0.97, duration: 1.1, ease: "power3.out" },
          0.2,
        )
        .from("[data-node]", { scale: 0, duration: 0.6, stagger: 0.08, ease: "back.out(2.4)" }, 0.9)
        .to(
          routeRefs.current,
          { strokeDashoffset: 0, duration: 1.4, stagger: 0.12, ease: "power2.inOut" },
          1.1,
        )
        .call(() => {
          startedRef.current = true;
        }, null, 2.6);

      // pulsing rings on the destination
      gsap.fromTo(
        "[data-ring]",
        { scale: 1, opacity: 0.55 },
        {
          scale: 3,
          opacity: 0,
          duration: 2.2,
          repeat: -1,
          stagger: 0.9,
          ease: "power1.out",
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  /* ---------------- Active route: highlight + travelling dot ---------------- */
  useEffect(() => {
    const route = routeRefs.current[active];
    const dot = dotRef.current;
    if (!route || !dot) return;

    routeRefs.current.forEach((r, i) => {
      if (!r) return;
      gsap.to(r, {
        opacity: i === active ? 1 : 0.28,
        strokeWidth: i === active ? 3 : 1.5,
        duration: 0.5,
        overwrite: "auto",
      });
    });

    if (reduced()) {
      gsap.set(dot, { opacity: 0 });
      return;
    }

    const len = route.getTotalLength();
    const proxy = { p: 0 };
    const tween = gsap.to(proxy, {
      p: 1,
      duration: 2.2,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 0.4,
      onUpdate: () => {
        if (!startedRef.current) {
          gsap.set(dot, { opacity: 0 });
          return;
        }
        const pt = route.getPointAtLength(proxy.p * len);
        gsap.set(dot, {
          x: pt.x,
          y: pt.y,
          opacity: Math.min(1, proxy.p * 8, (1 - proxy.p) * 8),
        });
      },
    });

    return () => tween.kill();
  }, [active]);

  /* ---------------- Auto-rotate with progress bar ---------------- */
  useEffect(() => {
    barRefs.current.forEach((b) => {
      if (b) gsap.set(b, { scaleX: 0, transformOrigin: "left" });
    });
    if (reduced()) return;

    const bar = barRefs.current[active];
    if (!bar) return;
    const tw = gsap.to(bar, {
      scaleX: 1,
      duration: AUTO_SECONDS,
      ease: "none",
      onComplete: () => setActive((a) => (a + 1) % countries.length),
    });
    autoRef.current = tw;
    return () => tw.kill();
  }, [active]);

  const pause = () => autoRef.current?.pause();
  const resume = () => autoRef.current?.resume();

  const current = countries[active];

  return (
    <section
      id="global-sourcing"
      ref={sectionRef}
      aria-labelledby="sourcing-heading"
      className="relative w-full overflow-hidden bg-[#fbfbfc] py-16 sm:py-20 lg:py-24"
    >
      {/* soft background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1F2937]/[0.04] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-10 h-96 w-96 rounded-full bg-[#E3B04B]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1760px] px-4 sm:px-8 lg:px-[4%]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* ---------------- LEFT ---------------- */}
          <div>
            <p data-rise className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8862B]">
              Global Sourcing Network
            </p>

            <h2
              id="sourcing-heading"
              className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-[#1F2937] sm:text-4xl lg:text-5xl"
            >
              <span className="block overflow-hidden pb-1">
                <span data-line className="block">Connecting Global</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-line className="block">Animal Health</span>
              </span>
            </h2>

            <div
              data-rise
              aria-hidden="true"
              className="mt-5 h-[3px] w-full max-w-md rounded-full bg-gradient-to-r from-[#E3B04B] via-[#E3B04B]/40 to-transparent"
            />

            <p data-rise className="mt-7 w-full max-w-2xl text-[15px] leading-8 text-[#1F2937] sm:text-base">
              Al_Shifa Animal Science is committed to sourcing high-quality
              veterinary medicines and animal health products from trusted
              international markets. Through our global sourcing network, we
              bring quality products from Europe and Southeast Asia to support
              the growing needs of Bangladesh&apos;s animal health sector.
            </p>

            {/* Compact country chips, grouped by region */}
            <div
              data-rise
              onMouseEnter={pause}
              onMouseLeave={resume}
              className="mt-8 max-w-2xl space-y-5"
            >
              {regions.map((region, ri) => (
                <div key={region.name}>
                  <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8862B]">
                    {region.name}
                    <span aria-hidden="true" className="h-px flex-1 bg-[#1F2937]/10" />
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {countries.map((c, i) => {
                      if (c.region !== ri) return null;
                      const on = active === i;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          data-chip
                          onClick={() => setActive(i)}
                          onFocus={() => setActive(i)}
                          aria-pressed={on}
                          className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3B04B] ${
                            on
                              ? "border-[#E3B04B] bg-[#E3B04B]/15 text-[#1F2937]"
                              : "border-[#1F2937]/15 bg-white text-slate-600 hover:border-[#E3B04B]"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                              on ? "bg-[#E3B04B]" : "bg-slate-300"
                            }`}
                          />
                          {c.name}
                          <span
                            aria-hidden="true"
                            ref={(el) => (barRefs.current[i] = el)}
                            className="absolute bottom-0 left-0 h-[2px] w-full bg-[#E3B04B]"
                            style={{ transform: "scaleX(0)" }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <p aria-live="polite" className="text-xs text-slate-500">
                <span className="font-semibold text-[#1F2937]">{current.name}</span>
                {" · "}
                {regions[current.region].desc}
              </p>
            </div>

            {/* Destination */}
            <div
              data-rise
              className="group mt-6 flex max-w-2xl items-center gap-4 rounded-2xl border border-[#E3B04B]/50 bg-white p-5 shadow-sm"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E3B04B] text-[#1F2937]">
                <Truck className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B8862B]">
                  Our Destination
                </span>
                <span className="block text-lg font-bold text-[#1F2937]">Bangladesh</span>
                <span className="block text-sm text-slate-600">Nationwide product distribution</span>
              </span>
              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-[#B8862B] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>

            {/* CTA */}
            <div data-rise className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#0B0B4A] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0B0B4A]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14146B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0B4A] focus-visible:ring-offset-2"
              >
                Explore Products
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E3B04B] text-[#0B0B4A] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center rounded-xl border border-[#1F2937]/20 bg-white px-7 py-3 text-sm font-semibold text-[#1F2937] transition-colors duration-300 hover:border-[#E3B04B] hover:bg-[#E3B04B]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2937] focus-visible:ring-offset-2"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* ---------------- RIGHT: route map (transparent) ---------------- */}
          <div className="relative">
            <div
              data-map
              onMouseEnter={pause}
              onMouseLeave={resume}
              className="relative overflow-hidden rounded-3xl border border-[#1F2937]/10 p-4 sm:p-6"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(31,41,55,0.16) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            >
              <div className="relative flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8862B]">
                  Sourcing Routes
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {current.name} <span className="text-[#B8862B]">→</span> Bangladesh
                </p>
              </div>

              {/* Map area. aspect ratio = viewBox ratio, so % labels line up */}
              <div className="relative mt-4 w-full" style={{ aspectRatio: "600 / 360" }}>
                <svg
                  viewBox="0 0 600 360"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  role="img"
                  aria-label={`Sourcing route from ${current.name} to Bangladesh`}
                >
                  <g stroke="#1F2937" strokeOpacity=".1" strokeDasharray="3 7">
                    <ellipse cx="300" cy="180" rx="270" ry="150" />
                    <ellipse cx="300" cy="180" rx="190" ry="105" />
                    <path d="M30 180 H570 M300 25 V335" />
                  </g>

                  {countries.map((c, i) => (
                    <path
                      key={c.name}
                      ref={(el) => (routeRefs.current[i] = el)}
                      d={c.path}
                      stroke={active === i ? GOLD : "#94A3B8"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{ opacity: i === 0 ? 1 : 0.28 }}
                    />
                  ))}

                  {/* travelling shipment dot */}
                  <g ref={dotRef} style={{ opacity: 0 }}>
                    <circle r="12" fill={GOLD} fillOpacity=".3" />
                    <circle r="5" fill={GOLD} />
                  </g>
                </svg>

                {/* Country nodes */}
                {countries.map((c, i) => {
                  const on = active === i;
                  return (
                    <div
                      key={c.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: pct(c.x, 600),
                        top: pct(c.y, 360),
                        zIndex: on ? 20 : 10,
                      }}
                    >
                      <div data-node>
                        <button
                          type="button"
                          onClick={() => setActive(i)}
                          onMouseEnter={() => setActive(i)}
                          aria-label={`Show route from ${c.name}`}
                          className="group relative flex flex-col items-center focus-visible:outline-none"
                        >
                          <span
                            className={`absolute bottom-full mb-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 sm:px-2.5 sm:text-[11px] ${
                              on
                                ? "bg-[#E3B04B] text-[#1F2937]"
                                : "bg-white/80 text-[#1F2937] ring-1 ring-[#1F2937]/10 group-hover:bg-white"
                            }`}
                          >
                            {c.name}
                          </span>
                          <span
                            className={`block h-3 w-3 rounded-full border-2 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#E3B04B] ${
                              on
                                ? "scale-125 border-[#E3B04B] bg-[#E3B04B]"
                                : "border-slate-400 bg-[#F6F7F9]"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Destination node */}
                <div
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: pct(DEST.x, 600), top: pct(DEST.y, 360) }}
                >
                  <div data-node className="relative flex flex-col items-center">
                    <span
                      data-ring
                      aria-hidden="true"
                      className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-[#E3B04B]"
                    />
                    <span
                      data-ring
                      aria-hidden="true"
                      className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-[#E3B04B]"
                    />
                    <span className="absolute bottom-full mb-2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1F2937] shadow-sm sm:text-xs">
                      Bangladesh
                    </span>
                    <span className="relative block h-5 w-5 rounded-full border-4 border-white bg-[#E3B04B] shadow" />
                  </div>
                </div>
              </div>

              <p className="relative mt-3 text-center text-xs text-slate-500">
                Tap a country to see its route
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}