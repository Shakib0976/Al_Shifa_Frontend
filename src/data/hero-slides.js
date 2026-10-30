// // src/data/hero-slides.js
// export const heroSlides = [
//   {
//     id: "cattle",
//     image: {
//       src: "https://i.ibb.co.com/LX0sQSnx/1600w-Wqvpxg-k-WBM.jpg",
//       alt: "Cattle feed banner",
//     },
//   },
//   {
//     id: "poultry",
//     image: {
//       src: "https://i.ibb.co.com/20g7mW67/1600w-r0-Brq6-HYPsc.webp",
//       alt: "Poultry feed banner",
//     },
//   },
//   {
//     id: "fish",
//     image: {
//       src: "https://i.ibb.co.com/wrR3bSZp/1600w-HQt-P73-Sne0-I.jpg",
//       alt: "Fish feed banner",
//     },
//   },
// ];

// export const AUTOPLAY_INTERVAL = 5000;

// src/data/hero-slides.js
// src/data/hero-slides.js
export const heroSlides = [
  {
    id: "cattle",
    brandMessage: "Al-Shifa Animal Science",
    badge: "PREMIUM LIVESTOCK NUTRITION",
    heading: "Better Nutrition for Healthier Livestock",
    description:
      "Quality cattle feed designed to support healthy growth and everyday livestock nutrition.",
    primaryCta: {
      label: "Explore Cattle Feed",
      href: "/categories/cattle-feed",
    },
    secondaryCta: { label: "Learn More", href: "/shop" },
    image: {
      src: "https://i.ibb.co.com/0yVLhjnR/e6d72cfd6073387b12e2c7c640330993.jpg",
      alt: "Cattle feed banner",
    },
    fallbackTint: "22, 101, 52", // green-ish (used before auto-extraction runs)
  },
  {
    id: "poultry",
    brandMessage: "Al-Shifa Animal Science",
    badge: "COMPLETE POULTRY NUTRITION",
    heading: "Supporting Healthy Poultry Growth",
    description:
      "Poultry feed products designed to support poultry nutrition and farm productivity.",
    primaryCta: {
      label: "Explore Poultry Feed",
      href: "/categories/poultry-feed",
    },
    secondaryCta: { label: "View Products", href: "/shop" },
    image: {
      src: "https://i.ibb.co.com/fdmb0y0c/1600w-G7-SBk-GP9g-A8.jpg",
      alt: "Poultry feed banner",
    },
    fallbackTint: "36, 59, 83",
  },
  {
    id: "fish",
    brandMessage: "Al-Shifa Animal Science",
    badge: "AQUACULTURE NUTRITION",
    heading: "Smarter Nutrition for Better Fish Farming",
    description: "Fish feed products for your aquaculture nutrition needs.",
    primaryCta: { label: "Explore Fish Feed", href: "/categories/fish-feed" },
    secondaryCta: { label: "Learn More", href: "/shop" },
    image: {
      src: "https://i.ibb.co.com/5WzrLmtD/Screenshot-2026-10-30-180259.png",
      alt: "Fish feed banner",
    },
    fallbackTint: "249, 115, 22",
  },
];

export const AUTOPLAY_INTERVAL = 3000; // ← changed to 3 seconds
