import React from "react";

export default function HeroSection() {
  return (
   <section className="w-full h-[90vh] flex items-center justify-center relative bg-[#E9E4DC] overflow-hidden">

  
  <img
    src="src\assets\3354b7a3-a93c-4605-ba61-ddb9dc646085.png"
    className="absolute inset-0 w-full h-full object-cover z-0"
    alt="Hero"
  />

  <div className="absolute left-16 top-1/3 flex flex-col gap-6 max-w-[420px] z-10">
    <h1 className="text-[40px] leading-none font-serif tracking-wide text-[#1A080B]">
      CELESTE-GOLD
    </h1>

    <p className="text-[13px] text-[#1A080B]/60  font-bold">
      A celestial touch for timeless moments. Discover jewelry crafted with precision and elegance.
    </p>

    <button className="w-fit px-6 py-2 text-[11px] tracking-widest uppercase border border-[#1A080B]/30 hover:bg-[#1A080B] hover:text-white transition">
      Discover
    </button>
  </div>

 
  <div className="font-extrabold absolute right-16 top-1/3 flex flex-col gap-6 text-[13px] tracking-[0.3em] uppercase text-[#1A080B]/60 z-10">
    <span>Rings</span>
    <span>Earrings</span>
    <span>Necklaces</span>
    <span>Bracelets</span>
  </div>

</section>
  );
}