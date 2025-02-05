import Featured from "@/components/Featured";
import HeroMidSection from "@/components/HeroMidSection";
import HeroSlider from "@/components/HeroSlider";
import NavBar from "@/components/NavBar";
import ProductFeatures from "@/components/ProductFeatures";
import ProductsSlider from "@/components/ProductsSlider";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Featured />
      <HeroMidSection />
      <ProductFeatures />
      <ProductsSlider />
    </>
  );
}
