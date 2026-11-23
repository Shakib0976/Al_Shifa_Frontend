import { useId } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import { news } from "@/data/news";

const sectionTitle = "Animal Health News";

// Kotogulo news dekhabe (8 = 2 col e 4 row, 4 col e 2 row)
const LIMIT = 8;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export default function NewsSection() {
  const headingId = useId();
  const items = news.slice(0, LIMIT);

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1760px] px-3 sm:px-8 lg:px-[4%]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2
            id={headingId}
            className="text-2xl font-bold tracking-tight text-[#0B0B4A] sm:text-3xl lg:text-4xl"
          >
            {sectionTitle}
          </h2>

          {/* Decorative divider: gold line + diamond */}
          <div
            aria-hidden="true"
            className="mt-4 flex w-full max-w-3xl items-center gap-3"
          >
            <span className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-transparent via-[#E3B04B]/60 to-[#E3B04B]" />
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-[#E3B04B]" />
            <span className="h-[2px] flex-1 rounded-full bg-gradient-to-l from-transparent via-[#E3B04B]/60 to-[#E3B04B]" />
          </div>
        </div>

        {/* Cards: 2 (small) / 3 (medium) / 4 (large) */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3  lg:gap-6">
          {items.map((item) => (
            <article
              key={item.slug}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-[#0B0B4A]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#E3B04B]/60 hover:shadow-xl hover:shadow-[#0B0B4A]/10"
            >
              {/* Image */}
              <Link
                href={`/news/${item.slug}`}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-[#E5E7EB]"
                tabIndex={-1}
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B4A]/40 via-transparent to-transparent"
                />
              </Link>

              {item.category && (
                <span className="absolute left-2 top-2 z-10 rounded-full bg-[#E3B04B] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0B0B4A] shadow-sm sm:left-3 sm:top-3 sm:text-[11px]">
                  {item.category}
                </span>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-3 sm:p-4 lg:p-5">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium text-[#1F2937]/60 sm:text-xs">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays
                      className="h-3 w-3 text-[#E3B04B] sm:h-3.5 sm:w-3.5"
                      aria-hidden="true"
                    />
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                  </span>
                  {item.author && (
                    <span className="inline-flex items-center gap-1">
                      <User
                        className="h-3 w-3 text-[#E3B04B] sm:h-3.5 sm:w-3.5"
                        aria-hidden="true"
                      />
                      {item.author}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-[#0B0B4A] sm:text-base lg:text-lg">
                  <Link
                    href={`/news/${item.slug}`}
                    className="transition-colors hover:text-[#14146B] focus-visible:outline-none focus-visible:underline"
                  >
                    {item.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#1F2937]/80 sm:text-sm">
                  {item.excerpt}
                </p>

                {/* Read more */}
                <div className="mt-auto pt-3 sm:pt-4">
                  <Link
                    href={`/news/${item.slug}`}
                    aria-label={`Read more about ${item.title}`}
                    className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B0B4A] transition-colors hover:text-[#E3B04B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0B4A] focus-visible:ring-offset-2 sm:text-sm"
                  >
                    Read More
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              {/* Gold bottom accent (hover e grow kore) */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#E3B04B] transition-all duration-500 group-hover:w-full"
              />
            </article>
          ))}
        </div>

        {/* View all */}
        {/* <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/news"
            className="group inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#0B0B4A] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0B0B4A]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14146B] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0B4A] focus-visible:ring-offset-2"
          >
            View All News
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E3B04B] text-[#0B0B4A] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div> */}
      </div>
    </section>
  );
}