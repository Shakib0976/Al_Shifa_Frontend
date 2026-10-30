import Link from "next/link";
import { LearningCard } from "@/components/home/learning-card";
import { NewsCard } from "@/components/news/news-card";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";
import { news } from "@/data/news";
import { videos } from "@/data/videos";
import HeroSlider from "@/components/home/hero-slider";
import AboutSection from "@/components/home/about";
import MissionSection from "@/components/home/ourMission";
import ProductSection from "@/components/home/product-section";
import ConsultancySection from "@/components/home/ConsultancySection";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <AboutSection />

      <MissionSection />

      <ProductSection />
      <ConsultancySection />
    </div>
  );
}
