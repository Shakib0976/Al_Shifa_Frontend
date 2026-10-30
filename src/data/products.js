export const categories = [
  {
    slug: "dairy-nutrition",
    name: "Dairy nutrition",
    description: "Everyday nutrition support for healthy, productive cattle.",
    icon: "🐄",
  },
  {
    slug: "poultry-nutrition",
    name: "Poultry nutrition",
    description: "Balanced nutrition essentials for poultry farms.",
    icon: "🐔",
  },
  {
    slug: "animal-care",
    name: "Animal care",
    description: "Practical care products for a range of farm animals.",
    icon: "🌿",
  },
];

export const products = [
  {
    slug: "dairy-mineral-mix",
    name: "Dairy Mineral Mix",
    category: "Dairy nutrition",
    categorySlug: "dairy-nutrition",
    description:
      "A daily mineral supplement formulated to support balanced cattle nutrition.",
    price: 1250,
    unit: "5 kg bag",
    icon: "🐄",
    highlights: [
      "Designed for daily feeding routines",
      "Supports a balanced mineral intake",
      "Simple to add to a regular ration",
    ],
  },
  {
    slug: "poultry-vitamin-blend",
    name: "Poultry Vitamin Blend",
    category: "Poultry nutrition",
    categorySlug: "poultry-nutrition",
    description:
      "A convenient vitamin blend to complement a balanced poultry feeding program.",
    price: 780,
    unit: "1 kg pack",
    icon: "🐔",
    highlights: [
      "Easy-to-use powder format",
      "Suitable for routine nutrition plans",
      "Clear feeding guidance on pack",
    ],
  },
  {
    slug: "herbal-care-solution",
    name: "Herbal Care Solution",
    category: "Animal care",
    categorySlug: "animal-care",
    description:
      "A general-purpose herbal care product for responsible animal husbandry.",
    price: 950,
    unit: "500 ml bottle",
    icon: "🌿",
    highlights: [
      "Convenient liquid format",
      "For use as directed on the product label",
      "Ask our team about suitability for your animals",
    ],
  },
];
