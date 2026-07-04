import React from "react";

export default function BrandStory() {
  return (
    <section className="w-full bg-[#FAF8F5] px-6 md:px-20 py-28 flex flex-col md:flex-row gap-16 justify-between items-start max-w-[1400px] mx-auto">
      
      {/* Left Side: Large Editorial Heading */}
      <div className="flex flex-col gap-6">
        <h2 className="font-serif text-[60px] md:text-[85px] uppercase text-[#D1C7BD] tracking-wider leading-[0.85] font-normal select-none">
          Our <br /> Story
        </h2>
      </div>

      {/* Right Side: Clean Typography & Description */}
      <div className="flex flex-col max-w-[460px] gap-6 md:pt-4">
        <div className="flex flex-col gap-5 text-[13px] text-[#4A4540] leading-relaxed tracking-wide font-light">
          <p>
            Celestique was created from a belief that jewelry should not decorate,
            but define presence. Each piece is an exercise in restraint — shaped 
            by clarity, proportion, and the discipline of less.
          </p>
          <p>
            We carefully select the finest materials—precious metals and sparkling 
            gemstones—to ensure that every design is meticulously crafted by skilled 
            artisans. Nothing is rushed. Nothing is loud. Everything is considered.
          </p>
          <p>
            Whether you are celebrating love, marking a special occasion, or simply 
            treating yourself, we invite you to explore our collection and experience 
            the celestial elegance that defines us.
          </p>
        </div>

        {/* CTA Button matching the layout */}
        <div className="mt-4">
          <button className="bg-[#1A080B] text-white hover:bg-[#D1C7BD] hover:text-[#1A080B] text-[10px] tracking-[0.3em] uppercase py-3.5 px-8 rounded-full transition duration-300 flex items-center gap-3">
            More About Us <span className="text-xs">→</span>
          </button>
        </div>
      </div>

    </section>
  );
}