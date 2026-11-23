import { useId } from "react";

/* ------------------------------------------------------------------ */
/* Content: shudhu ekhane YouTube er full link boshan                  */
/* ------------------------------------------------------------------ */
const videoSection = {
  title: "Product Explanation Video",
  videos: [
    {
      url: "https://youtu.be/0JvZGoXP_G4?si=wpYlWM9akdgv_96t",
      title: "Lumpy Skin Disease Vaccination",
    },
    {
      url: "https://youtu.be/4pvh5o5_a9Y?si=wqx_0N8pTQVeHZQG",
      title: "Mineral Injection for Cattle",
    },
    {
      url: "https://youtu.be/vWX6FhW3Qj4?si=HjpZU2JXubTJ54oz",
      title: "Product Usage Guide",
    },
  ],
};

/* YouTube link theke video ID ber kore */
function getYouTubeId(input) {
  const value = (input ?? "").trim();
  if (!value) return null;

  // Jodi keu shudhu ID dei (11 character)
  if (/^[\w-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = url.hostname.replace(/^www\.|^m\./, "");

    // https://youtu.be/ID
    if (host === "youtu.be") {
      const id = url.pathname.split("/")[1];
      return /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      // https://www.youtube.com/watch?v=ID
      const v = url.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;

      // /embed/ID, /shorts/ID, /live/ID, /v/ID
      const match = url.pathname.match(
        /^\/(?:embed|shorts|live|v)\/([\w-]{11})/,
      );
      if (match) return match[1];
    }
  } catch {
    return null;
  }

  return null;
}

export default function VideoSection() {
  const headingId = useId();

  // Valid link na hole oi video skip hobe
  const videos = videoSection.videos
    .map((video) => ({ ...video, id: getYouTubeId(video.url) }))
    .filter((video) => video.id);

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full overflow-hidden bg-transparent py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-8 lg:px-[4%]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2
            id={headingId}
            className="text-2xl font-bold tracking-tight text-[#0B0B4A] sm:text-3xl lg:text-4xl"
          >
            {videoSection.title}
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

        {/* Videos */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-10">
          {videos.map((video, i) => (
            <figure key={`${video.id}-${i}`} className="w-full">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#E5E7EB] shadow-lg shadow-[#0B0B4A]/15 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}