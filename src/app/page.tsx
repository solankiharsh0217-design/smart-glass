import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Sectors } from "@/components/Sectors";
import { Gallery } from "@/components/Gallery";
import { CTABand } from "@/components/CTABand";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <WhyUs />
      <Sectors />
      <Gallery />
      <CTABand />
    </>
  );
}
