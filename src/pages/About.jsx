import React from "react";
import HeroSection from "../pieces/HeroSection";
import AboutSection from "../pieces/AboutSection";
import ProductsSection from "../pieces/ProductsSection";
import NavBar from "../components/nav"
import WhyChooseUs from "../pieces/WhyUs";
import BrandStory from "../pieces/Brand";
import Footer from "../components/footer";
export default function JewelryShop() {
  return (
     <>
      <NavBar></NavBar>
    <main className="w-full min-h-screen bg-[#F6F4F0] flex flex-col items-center">
      
      <HeroSection />
      <AboutSection />
      <BrandStory></BrandStory>
      <ProductsSection />
      <WhyChooseUs></WhyChooseUs>
    
    </main>
      <Footer></Footer>
      </>
  );
}