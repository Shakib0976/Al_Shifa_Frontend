// src/data/navigation.js
import {
  Home,
  ShoppingBag,
  Mail,
  Beef,
  Bird,
  Rabbit,
  Fish,
  Dog,
} from "lucide-react";

export const siteConfig = {
  name: "Al-Shifa",
  subtitle: "ANIMAL SCIENCE",
  contact: {
    facebook: "https://facebook.com/your-page",   // ← update
    whatsapp: "https://wa.me/10000000000",        // ← update
    email: "info@alshifa.example.com",            // ← update
    phone: "+10000000000",                        // ← update
  },
};

export const categories = [
  { label: "Cattle Feed", slug: "cattle-feed", icon: Beef },
  { label: "Poultry Feed", slug: "poultry-feed", icon: Bird },
  { label: "Goat Feed", slug: "goat-feed", icon: Rabbit },
  { label: "Fish Feed", slug: "fish-feed", icon: Fish },
  { label: "Pet Food", slug: "pet-food", icon: Dog },
];

export const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  // Categories handled separately as a dropdown
  { label: "Contact Us", href: "/contact", icon: Mail },
];