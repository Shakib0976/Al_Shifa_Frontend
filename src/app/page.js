import HeroSlider from "@/components/home/hero-slider";
import AboutSection from "@/components/home/about";
import MissionSection from "@/components/home/ourMission";
import ProductSection from "@/components/home/product-section";
import ConsultancySection from "@/components/home/ConsultancySection";
import VideoSection from "@/components/home/VideoSection";
import NewsSection from "@/components/home/NewsSection";
import GlobalSourcing from "@/components/home/GlobalSourcing";
import { getApiUrl } from "@/lib/api-url";

export default async function Home() {
  const [productsResponse, newsResponse] = await Promise.all([
    fetch(getApiUrl("/api/products"), { cache: "no-store" }),
    fetch(getApiUrl("/api/news"), { cache: "no-store" }),
  ]);

  if (!productsResponse.ok) {
    throw new Error(`Unable to load home products (${productsResponse.status}).`);
  }
  if (!newsResponse.ok) {
    throw new Error(`Unable to load home news (${newsResponse.status}).`);
  }

  const [products, news] = await Promise.all([
    productsResponse.json(),
    newsResponse.json(),
  ]);

  return (
    <div>
      <HeroSlider />
      <AboutSection />

      <MissionSection />
  
      <ProductSection products={products} />
      <ConsultancySection />
      <VideoSection/>
      <NewsSection news={news} />
      <GlobalSourcing/>
    </div>
  );
}
