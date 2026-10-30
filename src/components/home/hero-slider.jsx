"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, PawPrint } from "lucide-react";
import { heroSlides, AUTOPLAY_INTERVAL } from "@/data/hero-slides";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function NavButton({ direction, onClick }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-border bg-black/20 text-white shadow-md backdrop-blur-md transition-colors duration-200 hover:border-primary hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 md:h-11 md:w-11"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

function Indicators({ index, onSelect, className }) {
  return (
    <div
      role="group"
      aria-label="Choose slide"
      className={cn("items-center gap-1", className)}
    >
      {heroSlides.map((s, i) => {
        const active = i === index;
        return (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(i)}
            className="group flex h-6 touch-manipulation items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span
              className={cn(
                "relative block h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-out",
                active
                  ? "w-10 bg-white/30 sm:w-14"
                  : "w-4 bg-white/50 group-hover:bg-white/80 sm:w-5",
              )}
            >
              {active && (
                <span
                  data-progress
                  className="absolute inset-0 origin-left rounded-full bg-white"
                  style={{ transform: "scaleX(0)" }}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [tints, setTints] = useState({});
  const [failedImages, setFailedImages] = useState({});

  const rootRef = useRef(null);
  const railRef = useRef(null);
  const pointerStartRef = useRef(null);
  const tweenRef = useRef(null);
  const prevIndexRef = useRef(0);
  const attemptedTintRef = useRef(new Set());
  const pauseReasons = useRef({ hover: false, focus: false, hidden: false });
  const lastInputRef = useRef("pointer");

  const total = heroSlides.length;
  const slide = heroSlides[index];
  const tint = tints[slide.id] ?? slide.fallbackTint;

  // ---- Pause control (drives the progress tween directly, no re-renders)
  const syncPause = useCallback(() => {
    const r = pauseReasons.current;
    tweenRef.current?.paused(r.hover || r.focus || r.hidden);
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      pauseReasons.current.hidden = document.hidden;
      syncPause();
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [syncPause]);

  // ---- Autoplay: the progress tween is the timer, so bar and slide never drift
  useEffect(() => {
    if (total < 2) return;
    const bars = gsap.utils.toArray("[data-progress]", rootRef.current);
    if (!bars.length) return;

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTOPLAY_INTERVAL / 1000,
          ease: "none",
          onComplete: () => setIndex((i) => (i + 1) % total),
        },
      );
    });
    syncPause();

    return () => {
      ctx.revert();
      tweenRef.current = null;
    };
  }, [index, total, syncPause]);

  // ---- Slide transition: image crossfade + text fade-up
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const images = gsap.utils.toArray("[data-slide-image]", root);
    const items = gsap.utils.toArray("[data-active='true'] [data-anim]", root);
    const prevIndex = prevIndexRef.current;
    prevIndexRef.current = index;
    const isInitial = prevIndex === index;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      images.forEach((el, i) => {
        gsap.set(el, {
          opacity: i === index ? 1 : 0,
          scale: 1,
          zIndex: i === index ? 2 : i === prevIndex ? 1 : 0,
        });
      });

      if (isInitial || reduce) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        images[index],
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1 },
        0,
      )
        .to(images[prevIndex], { opacity: 0, duration: 1 }, 0)
        .fromTo(
          items,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          },
          0.15,
        );
    }, root);

    return () => ctx.revert();
  }, [index]);

  // ---- Dynamic tint extraction (cached; silent fallback on CORS/load errors)
  useEffect(() => {
    const s = heroSlides[index];
    if (attemptedTintRef.current.has(s.id)) return;
    attemptedTintRef.current.add(s.id);

    let cancelled = false;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      try {
        const size = 24;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        let r = 0,
          g = 0,
          b = 0,
          count = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 128) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (!count) return;

        const darken = 0.55;
        const value = `${Math.round((r / count) * darken)}, ${Math.round(
          (g / count) * darken,
        )}, ${Math.round((b / count) * darken)}`;
        setTints((prev) => ({ ...prev, [s.id]: value }));
      } catch {
        /* keep fallback tint */
      }
    };
    img.onerror = () => {};
    img.src = s.image.src;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [index]);

  // ---- Small screens: keep the active thumbnail centered in the rail (scrolls the rail only, never the page)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || rail.clientWidth === 0 || rail.scrollWidth <= rail.clientWidth) return;
    const el = rail.querySelectorAll("[data-rail-item]")[index];
    if (!el) return;
    rail.scrollTo({
      left: el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [index]);

  // ---- Navigation
  const goTo = useCallback((i) => setIndex(i), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  // ---- Interaction handlers
  const handlePointerEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    pauseReasons.current.hover = true;
    syncPause();
  };
  const handlePointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    pauseReasons.current.hover = false;
    syncPause();
  };
  const handlePointerDown = () => {
    lastInputRef.current = "pointer";
    // A tap/click means the user is using a pointer: release any keyboard-focus pause.
    if (pauseReasons.current.focus) {
      pauseReasons.current.focus = false;
      syncPause();
    }
  };
  const handleFocus = () => {
    // Only keyboard navigation pauses on focus. Taps on touch devices must never freeze autoplay.
    if (lastInputRef.current !== "keyboard") return;
    pauseReasons.current.focus = true;
    syncPause();
  };
  const handleBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    pauseReasons.current.focus = false;
    syncPause();
  };
  const handleKeyDown = (e) => {
    lastInputRef.current = "keyboard";
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
  };
  const handleSlidePointerDown = (e) => {
    if (!e.isPrimary || e.pointerType === "mouse") return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };
  const handleSlidePointerUp = (e) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;

    const deltaX = e.clientX - start.x;
    const deltaY = e.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX < 0) next();
    else prev();
  };

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Featured banner"
      className="w-full bg-background px-2 py-3  sm:py-4 md:px-6 md:py-6"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto w-full max-w-11/12">
        {/* Hero frame: banner only on small screens; banner + glass card on lg+ */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-black shadow-lg lg:rounded-3xl">
          <div
            className="relative aspect-[16/9] w-full touch-pan-y xl:aspect-[21/9]"
            onPointerDown={handleSlidePointerDown}
            onPointerUp={handleSlidePointerUp}
            onPointerCancel={() => {
              pointerStartRef.current = null;
            }}
          >
            {heroSlides.map((s, i) => (
              <div
                key={s.id}
                data-slide-image
                aria-hidden={i !== index}
                className={cn("absolute inset-0", i !== index && "opacity-0")}
              >
                {failedImages[s.id] ? (
                  <div className="flex h-full w-full items-center justify-center bg-primary">
                    <PawPrint
                      className="h-16 w-16 text-white/30"
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <Image
                    src={s.image.src}
                    alt={i === index ? s.image.alt : ""}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1400px) 1400px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: s.image.position ?? "center" }}
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [s.id]: true }))
                    }
                  />
                )}
              </div>
            ))}

            {/* Everything below is desktop-only: small screens show the clean banner image */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 hidden bg-gradient-to-r from-black/50 via-black/10 to-transparent lg:block"
            />

            <div className="absolute left-6 top-6 z-20 hidden max-w-[calc(100%-3rem)] items-center gap-2 rounded-full border border-white/20 bg-black/25 py-1.5 pl-2.5 pr-3.5 text-white backdrop-blur-md lg:flex">
              <PawPrint className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate text-sm font-semibold">
                {slide.brandMessage}
              </span>
            </div>

            <Indicators
              index={index}
              onSelect={goTo}
              className="absolute right-6 top-6 z-20 hidden lg:flex"
            />

            <div className="absolute bottom-6 right-6 z-30 hidden flex-col gap-2 lg:flex">
              <NavButton direction="prev" onClick={prev} />
              <NavButton direction="next" onClick={next} />
            </div>

            <div className="absolute left-2 top-1/2 z-30 -translate-y-1/2 lg:hidden">
              <NavButton direction="prev" onClick={prev} />
            </div>
            <div className="absolute right-2 top-1/2 z-30 -translate-y-1/2 lg:hidden">
              <NavButton direction="next" onClick={next} />
            </div>
          </div>

          {/* Desktop glass card (hidden on small screens). All slides share one grid cell so height never jumps. */}
          <div
            className="absolute bottom-6 left-6 z-10 hidden w-[calc(100%-7rem)] max-w-[600px] rounded-2xl border border-white/25 bg-black/20 p-8 shadow-2xl backdrop-blur-md lg:grid xl:max-w-[640px]"
            style={{ "--tint": tint }}
          >
            {heroSlides.map((s, i) => (
              <div
                key={s.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${total}`}
                aria-hidden={i !== index}
                data-active={i === index}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col items-start",
                  i !== index && "invisible",
                )}
              >
                <span
                  data-anim
                  className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white"
                >
                  {s.badge}
                </span>

                <h2
                  data-anim
                  className="mt-3 text-4xl font-bold leading-tight text-white xl:text-5xl"
                >
                  {s.heading}
                </h2>

                <p
                  data-anim
                  className="mt-3 max-w-lg text-base leading-relaxed text-white/85"
                >
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Small screens: every slide as a named thumbnail under the banner. Auto-slides with the banner. */}
        <div
          ref={railRef}
          role="group"
          aria-label="Choose slide"
          className="relative  mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-3 pb-1 [scrollbar-width:none] sm:-mx-4 sm:px-4 lg:hidden [&::-webkit-scrollbar]:hidden"
        >
          {heroSlides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                type="button"
                data-rail-item
                aria-label={`Show ${s.label ?? s.badge}`}
                aria-current={active ? "true" : undefined}
                onClick={() => goTo(i)}
                className="w-[38%] shrink-0 touch-manipulation snap-start rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-[24%]"
              >
                <span
                  className={cn(
                    "relative block aspect-[4/3] overflow-hidden rounded-lg border-2 bg-[#E8F5E9] transition-colors duration-300",
                    active ? "border-primary" : "border-[#E8F5E9]",
                  )}
                >
                  {failedImages[s.id] ? (
                    <span className="flex h-full w-full items-center justify-center">
                      <PawPrint
                        className="h-8 w-8 text-primary/40"
                        aria-hidden="true"
                      />
                    </span>
                  ) : (
                    <Image
                      src={s.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 24vw, 38vw"
                      className="object-cover"
                      style={{ objectPosition: s.image.position ?? "center" }}
                    />
                  )}
                  {active && (
                    <span
                      data-progress
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 origin-left bg-white/90"
                      style={{ transform: "scaleX(0)" }}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "mt-2 block truncate rounded-md px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide transition-colors duration-300",
                    active
                      ? "bg-primary text-white"
                      : "bg-[#E8F5E9] text-primary",
                  )}
                >
                  {s.label ?? s.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}