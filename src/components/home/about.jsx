"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const about = {
  title: "About AL-Shifa",
  description:
    "Al-Shifa Animal Health is a jointly owned veterinary medicine company based on import, trade & distribution. The main function of the company is to source good quality animal health products which will be effective for our local market, from overseas markets. We supply our best quality products throughout Bangladesh which are imported from Europe & Southest Asia. The management of NutriSun Animal Health has 10+ years of experience in various division of Animal health sector.",
  cta: { label: "Contact Us", href: "/contact" },
  image: {
    src: "https://i.ibb.co.com/r2wBjykn/Veterinary-Care-for-Healthier-Tomorrow.png",
    alt: "Veterinarian vaccinating a hen",
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full overflow-hidden bg-[#F6F7F9] py-14 sm:py-16 lg:py-20"
    >
      {/* soft background shapes (screenshot-er diagonal shape-er modern version) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#0B0B4A]/[0.04] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#E3B04B]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 skew-x-[-12deg] bg-white/70 lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-[1760px] items-center gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-[4%]">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-[#0B0B4A] sm:text-4xl lg:text-5xl"
          >
            {about.title}
          </h2>

          {/* thin gold gradient line, like the screenshot */}
          <div
            aria-hidden="true"
            className="mt-4 h-[3px] w-full rounded-full bg-gradient-to-r from-[#E3B04B] via-[#E3B04B]/40 to-transparent"
          />

          <p className="mt-8 w-full max-w-none text-justify text-[15px] leading-8 text-[#1F2937] sm:text-base">
            {about.description}
          </p>

          <Link
            href={about.cta.href}
            className="group mt-10 inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#0B0B4A] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0B0B4A]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14146B] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0B4A] focus-visible:ring-offset-2"
          >
            {about.cta.label}
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E3B04B] text-[#0B0B4A] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto w-full lg:h-[clamp(300px,24vw,400px)]">
            {/* offset gold frame */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl border-2 border-[#E3B04B] sm:-bottom-4 sm:-right-4"
            />
            {/* navy block behind */}
            <div
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-1/2 w-1/2 rounded-3xl bg-[#0B0B4A]/10 sm:-left-4 sm:-top-4"
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[2/1] lg:aspect-auto lg:h-full bg-[#E5E7EB] shadow-2xl shadow-[#0B0B4A]/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.image.src}
                alt={about.image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B0B4A]/20 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
