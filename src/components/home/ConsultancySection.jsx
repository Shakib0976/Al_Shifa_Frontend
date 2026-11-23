"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";

const consultancy = {
  label: "Support & Guidance",
  title: "Consultancy & Support",
  description:
    "NutriSun believes that customer’s support should be the first priority. You will get free consultancy form Nutrisun Animal health. Our skilled doctors provide all kinds of support consultancy. We believe our products provide security for small to large entrepreneurs to multi-crore firms. We import all animal medicines which are 100% effective and tested.",
  features: [
    "Free initial consultation for new farmers",
    "Custom nutrition and feeding plans",
  ],
  cta: { label: "Contact Us", href: "/contact" },
  badge: { title: "100% Authentic", text: "Tested Medicines" },
  image: {
    src: "https://i.ibb.co.com/6JVB6VSQ/images-13.jpg",
    alt: "Veterinarian consulting with a farmer",
  },
};

export default function ConsultancySection() {
  return (
    <section
      id="consultancy"
      aria-labelledby="consultancy-heading"
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
        {/* Image (left) */}
        <div className="order-1">
          <div className="relative mx-auto w-full lg:h-[clamp(320px,26vw,440px)]">
            {/* offset gold frame */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-full w-full rounded-3xl border-2 border-[#E3B04B] sm:-bottom-4 sm:-left-4"
            />
            {/* navy block behind */}
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-1/2 w-1/2 rounded-3xl bg-[#0B0B4A]/10 sm:-right-4 sm:-top-4"
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#E5E7EB] shadow-2xl shadow-[#0B0B4A]/15 sm:aspect-[2/1] lg:aspect-auto lg:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={consultancy.image.src}
                alt={consultancy.image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B0B4A]/20 via-transparent to-transparent"
              />
            </div>

            {/* Trust badge */}
            <div className="absolute -bottom-5 right-3 z-10 flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg shadow-[#0B0B4A]/15 sm:-right-4 sm:p-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E3B04B]/20 text-[#0B0B4A]">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0B0B4A]">
                  {consultancy.badge.title}
                </p>
                <p className="text-xs text-[#1F2937]/70">
                  {consultancy.badge.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Text (right) */}
        <div className="order-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E3B04B] sm:text-sm">
            {consultancy.label}
          </p>

          <h2
            id="consultancy-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-[#0B0B4A] sm:text-4xl lg:text-5xl"
          >
            {consultancy.title}
          </h2>

          {/* thin gold gradient line */}
          <div
            aria-hidden="true"
            className="mt-4 h-[3px] w-full rounded-full bg-gradient-to-r from-[#E3B04B] via-[#E3B04B]/40 to-transparent"
          />

          <p className="mt-8 w-full max-w-none text-justify text-[15px] leading-8 text-[#1F2937] sm:text-base">
            {consultancy.description}
          </p>

          <ul className="mt-6 space-y-3">
            {consultancy.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-[15px] font-medium text-[#1F2937] sm:text-base"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E3B04B] text-[#0B0B4A]">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={consultancy.cta.href}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#0B0B4A] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0B0B4A]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14146B] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0B4A] focus-visible:ring-offset-2"
            >
              {consultancy.cta.label}
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E3B04B] text-[#0B0B4A] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}