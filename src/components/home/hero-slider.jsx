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

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Featured banner"
      className="w-full bg-background px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className="relative mx-auto w-full lg:max-w-11/12 overflow-hidden rounded-lg border border-border bg-black shadow-lg lg:rounded-lg">
        {/* Small screens: blurred copy of the current photo behind everything, so the card is true glass */}
        {!failedImages[slide.id] && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden"
          >
            <Image
              key={slide.id}
              src={slide.image.src}
              alt=""
              fill
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="scale-125 object-cover opacity-70 blur-2xl"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}

        {/* Photo stage */}
        <div className="relative aspect-[5/4] w-full sm:aspect-[16/10] lg:aspect-[16/9] xl:aspect-[21/9]">
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

          {/* Overlay: soft top + bottom fade on small screens, left fade on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/35 lg:bg-gradient-to-r lg:from-black/50 lg:via-black/10 lg:to-transparent"
          />

          {/* Brand pill, top-left */}
          <div className="absolute left-3 top-3 z-20 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full border border-white/20 bg-black/25 py-1.5 pl-2.5 pr-3.5 text-white backdrop-blur-md sm:left-5 sm:top-5 lg:left-6 lg:top-6">
            <PawPrint className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate text-xs font-semibold sm:text-sm">
              {slide.brandMessage}
            </span>
          </div>

          {/* Desktop indicators, top-right (on small screens they live in the card) */}
          <Indicators
            index={index}
            onSelect={goTo}
            className="absolute right-6 top-6 z-20 hidden lg:flex"
          />

          {/* Desktop arrows, bottom-right of the photo */}
          <div className="absolute bottom-6 right-6 z-30 hidden flex-col gap-2 lg:flex">
            <NavButton direction="prev" onClick={prev} />
            <NavButton direction="next" onClick={next} />
          </div>
        </div>

        {/* Glass card: overlaps the photo's bottom edge on small screens, overlaid bottom-left on desktop.
            All slides share one grid cell so its height never jumps between slides. */}
        <div
          className="relative z-10 -mt-12 mb-3 ml-3 mr-3 grid rounded-2xl border border-white/25 bg-black/25 p-4 shadow-2xl backdrop-blur-xl sm:-mt-16 sm:mb-5 sm:ml-5 sm:mr-5 sm:p-6 lg:absolute lg:bottom-6 lg:left-6 lg:m-0 lg:w-[calc(100%-7rem)] lg:max-w-[600px] lg:bg-black/20 lg:p-8 lg:backdrop-blur-md xl:max-w-[640px]"
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
                className="mt-3 text-2xl font-bold leading-[1.15] text-white sm:text-3xl lg:text-4xl xl:text-5xl"
              >
                {s.heading}
              </h2>

              <p
                data-anim
                className="mt-2.5 line-clamp-3 max-w-lg text-sm leading-relaxed text-white/85 sm:line-clamp-none sm:text-base"
              >
                {s.description}
              </p>
            </div>
          ))}

          {/* Small screens: arrows bottom-left, indicators bottom-right */}
          <div className="col-start-1 row-start-2 mt-5 flex items-center justify-between gap-3 border-t border-white/15 pt-4 lg:hidden">
            <div className="flex items-center gap-2">
              <NavButton direction="prev" onClick={prev} />
              <NavButton direction="next" onClick={next} />
            </div>
            <Indicators index={index} onSelect={goTo} className="flex" />
          </div>
        </div>
      </div>
    </section>
  );
}